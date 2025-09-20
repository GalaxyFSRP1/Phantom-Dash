const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import configurations
const { db, supabase } = require('./config/supabase');
const { stripeService, PLANS } = require('./config/stripe');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// Clean URL routing - remove .html extensions
app.get('/:page', (req, res, next) => {
  const page = req.params.page;

  // Skip API routes
  if (page.startsWith('api/')) {
    return next();
  }

  // List of valid pages
  const validPages = [
    'index', 'about', 'contact', 'features', 'blog', 'terms', 'privacy',
    'pricing', 'login', 'register', 'dashboard', 'admin', 'profile',
    'servers', 'notifications', 'support', 'api-docs'
  ];

  if (validPages.includes(page)) {
    res.sendFile(path.join(__dirname, `${page}.html`));
  } else {
    next();
  }
});

// Redirect root to index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Pterodactyl API Configuration
const PTERODACTYL_CONFIG = {
  baseURL: process.env.PTERODACTYL_URL || 'https://panel.yourdomain.com',
  apiKey: process.env.PTERODACTYL_API_KEY,
  clientApiKey: process.env.PTERODACTYL_CLIENT_API_KEY
};

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Verify the JWT token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.userId = data.user.id;
    req.user = data.user;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ error: 'Token verification failed' });
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// User authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get user profile from database
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    }

    res.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: userProfile?.name || data.user.user_metadata?.name,
        plan: userProfile?.plan || 'Starter',
        pterodactylUserId: userProfile?.pterodactyl_user_id
      },
      token: data.session.access_token,
      redirectUrl: '/dashboard'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name required' });
    }

    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Register user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Create user profile in database
    const { error: profileError } = await supabase
      .from('users')
      .insert([{
        id: data.user.id,
        email: email,
        name: name,
        plan: 'Starter',
        pterodactyl_user_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Don't fail registration if profile creation fails
    }

    res.json({
      success: true,
      user: {
        id: data.user.id,
        email: email,
        name: name,
        plan: 'Starter',
        pterodactylUserId: null
      },
      token: data.session?.access_token,
      message: 'Registration successful. Please check your email to verify your account.'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Pterodactyl integration routes
app.get('/api/pterodactyl/servers', authenticateToken, async (req, res) => {
  try {
    if (!PTERODACTYL_CONFIG.apiKey) {
      return res.status(500).json({ error: 'Pterodactyl API not configured' });
    }

    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Get user profile to find Pterodactyl user ID
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('pterodactyl_user_id')
      .eq('id', req.userId)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    }

    // If user doesn't have a Pterodactyl user ID, return empty array
    if (!userProfile?.pterodactyl_user_id) {
      return res.json({ data: [] });
    }

    // Fetch servers from Pterodactyl using client API
    const response = await axios.get(`${PTERODACTYL_CONFIG.baseURL}/api/client/servers`, {
      headers: {
        'Authorization': `Bearer ${PTERODACTYL_CONFIG.clientApiKey}`,
        'Accept': 'application/json'
      }
    });

    // Get server details from application API for more information
    const serversWithDetails = await Promise.all(
      response.data.data.map(async (server) => {
        try {
          const serverDetails = await axios.get(
            `${PTERODACTYL_CONFIG.baseURL}/api/application/servers/${server.attributes.id}`,
            {
              headers: {
                'Authorization': `Bearer ${PTERODACTYL_CONFIG.apiKey}`,
                'Accept': 'application/json'
              }
            }
          );

          // Get server usage stats
          const usageResponse = await axios.get(
            `${PTERODACTYL_CONFIG.baseURL}/api/application/servers/${server.attributes.id}/resources`,
            {
              headers: {
                'Authorization': `Bearer ${PTERODACTYL_CONFIG.apiKey}`,
                'Accept': 'application/json'
              }
            }
          );

          const usage = usageResponse.data.attributes;

          return {
            id: server.attributes.id.toString(),
            name: server.attributes.name,
            status: server.attributes.is_suspended ? 'suspended' : 'online',
            players: 0, // Would need to implement game-specific logic
            maxPlayers: 50, // Default value
            cpu: Math.round(usage.resources.cpu_absolute || 0),
            memory: Math.round((usage.resources.memory_bytes / (1024 * 1024)) || 0), // Convert to MB
            disk: Math.round((usage.resources.disk_bytes / (1024 * 1024 * 1024)) || 0), // Convert to GB
            node: serverDetails.data.attributes.node,
            created_at: server.attributes.created_at,
            updated_at: server.attributes.updated_at
          };
        } catch (error) {
          console.error(`Error fetching details for server ${server.attributes.id}:`, error.message);
          // Return basic server info if detailed fetch fails
          return {
            id: server.attributes.id.toString(),
            name: server.attributes.name,
            status: server.attributes.is_suspended ? 'suspended' : 'online',
            players: 0,
            maxPlayers: 50,
            cpu: 0,
            memory: 0,
            disk: 0,
            created_at: server.attributes.created_at,
            updated_at: server.attributes.updated_at
          };
        }
      })
    );

    res.json({ data: serversWithDetails });
  } catch (error) {
    console.error('Pterodactyl API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch servers from Pterodactyl' });
  }
});

app.post('/api/pterodactyl/create-server', authenticateToken, async (req, res) => {
  try {
    const { name, plan } = req.body;

    if (!PTERODACTYL_CONFIG.apiKey) {
      return res.status(500).json({ error: 'Pterodactyl API not configured' });
    }

    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Get user profile to check plan
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('plan, pterodactyl_user_id')
      .eq('id', req.userId)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    }

    // Define server specifications based on plan
    const planSpecs = {
      'Starter': { cpu: 50, memory: 1024, disk: 5120 },
      'Professional': { cpu: 100, memory: 2048, disk: 10240 },
      'Enterprise': { cpu: 200, memory: 4096, disk: 20480 }
    };

    const specs = planSpecs[userProfile.plan] || planSpecs['Starter'];

    // Create server in Pterodactyl
    const serverData = {
      name: name || 'My Server',
      user: userProfile.pterodactyl_user_id || 1, // Default to admin user if not set
      egg: 1, // Default egg (usually for Minecraft or similar)
      docker_image: 'quay.io/pterodactyl/core:java-glibc',
      startup: 'java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}',
      environment: {
        'SERVER_JARFILE': 'server.jar',
        'VANILLA_VERSION': 'latest'
      },
      limits: {
        memory: specs.memory,
        swap: 0,
        disk: specs.disk,
        io: 500,
        cpu: specs.cpu
      },
      feature_limits: {
        databases: userProfile.plan === 'Starter' ? 1 : (userProfile.plan === 'Professional' ? 2 : 5),
        allocations: 1,
        backups: userProfile.plan === 'Starter' ? 1 : (userProfile.plan === 'Professional' ? 5 : 10)
      },
      allocation: {
        default: 1
      }
    };

    const response = await axios.post(`${PTERODACTYL_CONFIG.baseURL}/api/application/servers`, serverData, {
      headers: {
        'Authorization': `Bearer ${PTERODACTYL_CONFIG.apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // Save server record to database
    const { error: dbError } = await supabase
      .from('servers')
      .insert([{
        id: response.data.attributes.id.toString(),
        user_id: req.userId,
        name: serverData.name,
        plan: userProfile.plan,
        status: 'installing',
        pterodactyl_server_id: response.data.attributes.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);

    if (dbError) {
      console.error('Database insert error:', dbError);
      // Don't fail the request if DB insert fails
    }

    res.json({
      success: true,
      server: {
        id: response.data.attributes.id.toString(),
        name: serverData.name,
        status: 'installing',
        message: 'Server creation initiated. You will receive an email when ready.',
        specs: specs
      }
    });
  } catch (error) {
    console.error('Server creation error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create server' });
  }
});

// Payment processing routes (Stripe integration)
app.post('/api/payment/create-session', authenticateToken, async (req, res) => {
  try {
    const { planId, billingCycle = 'month' } = req.body;

    if (!stripeService.stripeClient) {
      return res.status(500).json({ error: 'Payment processing not configured' });
    }

    // Create Stripe payment session
    const result = await stripeService.createPaymentSession(req.userId, planId, billingCycle);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.json({
      success: true,
      session: {
        id: result.sessionId,
        url: result.url
      }
    });
  } catch (error) {
    console.error('Payment session error:', error);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
});

app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];

    if (!sig) {
      return res.status(400).json({ error: 'Missing Stripe signature' });
    }

    // Handle Stripe webhook
    const result = await stripeService.handleWebhook(sig, req.body);

    if (!result.success) {
      console.error('Webhook processing failed:', result.error);
      return res.status(500).json({ error: result.error });
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Customer portal route
app.post('/api/payment/create-portal', authenticateToken, async (req, res) => {
  try {
    if (!stripeService.stripeClient) {
      return res.status(500).json({ error: 'Payment processing not configured' });
    }

    // Get user profile to find Stripe customer ID
    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    const { data: userProfile, error } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', req.userId)
      .single();

    if (error || !userProfile?.stripe_customer_id) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Create customer portal session
    const result = await stripeService.createCustomerPortal(userProfile.stripe_customer_id);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.json({
      success: true,
      url: result.url
    });
  } catch (error) {
    console.error('Customer portal error:', error);
    res.status(500).json({ error: 'Failed to create customer portal' });
  }
});

// User dashboard data
app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Get user profile
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.userId)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    }

    // Get user servers
    const { data: servers, error: serversError } = await supabase
      .from('servers')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false });

    if (serversError) {
      console.error('Servers fetch error:', serversError);
    }

    // Get user payments
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', req.userId)
      .eq('status', 'completed')
      .order('created_at', { ascending: false });

    if (paymentsError) {
      console.error('Payments fetch error:', paymentsError);
    }

    // Calculate total spent
    const totalSpent = payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;

    // Get recent activity (combine servers and payments)
    const recentActivity = [];

    // Add recent server creations
    if (servers) {
      servers.slice(0, 3).forEach(server => {
        recentActivity.push({
          type: 'server_created',
          message: `Created server: ${server.name}`,
          timestamp: server.created_at,
          serverId: server.id
        });
      });
    }

    // Add recent payments
    if (payments) {
      payments.slice(0, 3).forEach(payment => {
        recentActivity.push({
          type: 'payment',
          message: `Payment of $${payment.amount} processed`,
          timestamp: payment.created_at,
          paymentId: payment.id
        });
      });
    }

    // Sort by timestamp (most recent first)
    recentActivity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    recentActivity.splice(5); // Keep only 5 most recent

    // Get real server stats from Pterodactyl
    const serversWithStats = await Promise.all(
      (servers || []).map(async (server) => {
        try {
          // Get server usage stats from Pterodactyl
          const usageResponse = await axios.get(
            `${PTERODACTYL_CONFIG.baseURL}/api/application/servers/${server.pterodactyl_server_id}/resources`,
            {
              headers: {
                'Authorization': `Bearer ${PTERODACTYL_CONFIG.apiKey}`,
                'Accept': 'application/json'
              }
            }
          );

          const usage = usageResponse.data.attributes;

          return {
            id: server.id,
            name: server.name,
            status: server.status || 'offline',
            players: 0, // Would need game-specific logic to get actual player count
            maxPlayers: 50, // Default value, could be stored in database
            cpu: Math.round(usage.resources.cpu_absolute || 0),
            memory: Math.round((usage.resources.memory_bytes / (1024 * 1024)) || 0), // Convert to MB
            disk: Math.round((usage.resources.disk_bytes / (1024 * 1024 * 1024)) || 0), // Convert to GB
            created_at: server.created_at,
            updated_at: server.updated_at
          };
        } catch (error) {
          console.error(`Error fetching stats for server ${server.id}:`, error.message);
          // Return server with zero stats if API call fails
          return {
            id: server.id,
            name: server.name,
            status: server.status || 'offline',
            players: 0,
            maxPlayers: 50,
            cpu: 0,
            memory: 0,
            disk: 0,
            created_at: server.created_at,
            updated_at: server.updated_at
          };
        }
      })
    );

    const dashboardData = {
      user: {
        name: userProfile?.name || 'User',
        email: userProfile?.email || 'user@example.com',
        plan: userProfile?.plan || 'Starter',
        serversCount: servers?.length || 0,
        totalSpent: totalSpent
      },
      servers: serversWithStats,
      recentActivity: recentActivity
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Admin routes (protected)
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Get total users
    const { count: totalUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (usersError) {
      console.error('Users count error:', usersError);
    }

    // Get total servers
    const { count: totalServers, error: serversError } = await supabase
      .from('servers')
      .select('*', { count: 'exact', head: true });

    if (serversError) {
      console.error('Servers count error:', serversError);
    }

    // Get monthly revenue (current month)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: monthlyPayments, error: paymentsError } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'completed')
      .gte('created_at', startOfMonth.toISOString());

    if (paymentsError) {
      console.error('Monthly payments error:', paymentsError);
    }

    const monthlyRevenue = monthlyPayments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;

    // Get active servers (servers created in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count: activeServers, error: activeServersError } = await supabase
      .from('servers')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (activeServersError) {
      console.error('Active servers error:', activeServersError);
    }

    // Calculate server uptime (mock for now - would need real monitoring data)
    const serverUptime = 99.8;

    const stats = {
      totalUsers: totalUsers || 0,
      totalServers: totalServers || 0,
      monthlyRevenue: monthlyRevenue,
      activeServers: activeServers || 0,
      serverUptime: serverUptime
    };

    res.json(stats);
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch admin statistics' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PhanomDash-NextGen server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend URL: http://localhost:${PORT}`);
});

module.exports = app;
