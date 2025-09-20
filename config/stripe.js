const stripe = require('stripe');
require('dotenv').config();

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  console.warn('⚠️  Stripe secret key not found. Payment processing will be disabled.');
}

const stripeClient = stripeSecretKey ? stripe(stripeSecretKey) : null;

// Pricing plans
const PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 0,
    interval: 'forever',
    features: ['5 Dashboards', '100 Data Sources', 'Basic Charts', 'Email Support', '1GB Storage'],
    stripePriceId: null // Free plan
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: 29,
    interval: 'month',
    features: ['Unlimited Dashboards', 'Unlimited Data Sources', 'Advanced Charts', 'Priority Support', '10GB Storage', 'Custom Branding'],
    stripePriceId: 'price_professional_monthly' // Replace with actual Stripe price ID
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'month',
    features: ['Everything in Pro', 'SSO Integration', 'Advanced Security', 'Dedicated Support', 'Unlimited Storage', 'Custom Integrations'],
    stripePriceId: 'price_enterprise_monthly' // Replace with actual Stripe price ID
  }
};

// Stripe operations
const stripeService = {
  // Create payment session
  async createPaymentSession(userId, planId, billingCycle = 'month') {
    if (!stripeClient) {
      return { error: 'Stripe not configured' };
    }

    try {
      const plan = PLANS[planId];
      if (!plan) {
        throw new Error('Invalid plan selected');
      }

      // Create Stripe checkout session
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: plan.name,
                description: `PhanomDash ${plan.name} Plan`
              },
              unit_amount: plan.price * 100, // Convert to cents
              recurring: plan.interval !== 'forever' ? {
                interval: billingCycle === 'year' ? 'year' : 'month'
              } : undefined
            },
            quantity: 1
          }
        ],
        mode: plan.price === 0 ? 'payment' : 'subscription',
        success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/pricing`,
        metadata: {
          userId: userId,
          planId: planId,
          billingCycle: billingCycle
        }
      });

      return { success: true, sessionId: session.id, url: session.url };
    } catch (error) {
      console.error('Create payment session error:', error);
      return { success: false, error: error.message };
    }
  },

  // Handle webhook
  async handleWebhook(signature, body) {
    if (!stripeClient || !stripeWebhookSecret) {
      return { error: 'Webhook not configured' };
    }

    try {
      const event = stripeClient.webhooks.constructEvent(body, signature, stripeWebhookSecret);

      switch (event.type) {
        case 'checkout.session.completed':
          await handleSuccessfulPayment(event.data.object);
          break;

        case 'invoice.payment_succeeded':
          await handleSubscriptionRenewal(event.data.object);
          break;

        case 'invoice.payment_failed':
          await handleFailedPayment(event.data.object);
          break;

        case 'customer.subscription.deleted':
          await handleSubscriptionCancellation(event.data.object);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Webhook error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get customer portal URL
  async createCustomerPortal(customerId) {
    if (!stripeClient) {
      return { error: 'Stripe not configured' };
    }

    try {
      const session = await stripeClient.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.FRONTEND_URL}/dashboard`
      });

      return { success: true, url: session.url };
    } catch (error) {
      console.error('Create customer portal error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get subscription details
  async getSubscription(subscriptionId) {
    if (!stripeClient) {
      return { error: 'Stripe not configured' };
    }

    try {
      const subscription = await stripeClient.subscriptions.retrieve(subscriptionId);
      return { success: true, subscription };
    } catch (error) {
      console.error('Get subscription error:', error);
      return { success: false, error: error.message };
    }
  }
};

// Webhook handlers
async function handleSuccessfulPayment(session) {
  const { userId, planId } = session.metadata;

  try {
    // Update user plan in database
    const { db } = require('./supabase');
    await db.updateUser(userId, {
      plan: planId,
      stripeCustomerId: session.customer,
      subscriptionId: session.subscription,
      paymentStatus: 'completed',
      updatedAt: new Date().toISOString()
    });

    // Create payment record
    await db.createPayment({
      user_id: userId,
      stripe_session_id: session.id,
      amount: session.amount_total / 100,
      currency: session.currency,
      status: 'completed',
      plan_id: planId,
      created_at: new Date().toISOString()
    });

    console.log(`✅ Payment successful for user ${userId}, plan: ${planId}`);
  } catch (error) {
    console.error('Handle successful payment error:', error);
  }
}

async function handleSubscriptionRenewal(invoice) {
  const subscriptionId = invoice.subscription;

  try {
    // Update payment record
    const { db } = require('./supabase');
    await db.createPayment({
      user_id: invoice.customer, // This would need to be mapped from customer ID
      stripe_invoice_id: invoice.id,
      amount: invoice.amount_due / 100,
      currency: invoice.currency,
      status: 'completed',
      type: 'renewal',
      created_at: new Date().toISOString()
    });

    console.log(`✅ Subscription renewed: ${subscriptionId}`);
  } catch (error) {
    console.error('Handle subscription renewal error:', error);
  }
}

async function handleFailedPayment(invoice) {
  const subscriptionId = invoice.subscription;

  try {
    // Update user status
    const { db } = require('./supabase');
    // Find user by customer ID and update payment status
    // This would need proper customer ID to user ID mapping

    console.log(`❌ Payment failed for subscription: ${subscriptionId}`);
  } catch (error) {
    console.error('Handle failed payment error:', error);
  }
}

async function handleSubscriptionCancellation(subscription) {
  const subscriptionId = subscription.id;

  try {
    // Update user plan to starter
    const { db } = require('./supabase');
    // Find user by subscription ID and downgrade to starter plan

    console.log(`❌ Subscription cancelled: ${subscriptionId}`);
  } catch (error) {
    console.error('Handle subscription cancellation error:', error);
  }
}

module.exports = {
  stripeClient,
  stripeService,
  PLANS
};
