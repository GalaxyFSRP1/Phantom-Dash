const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase credentials not found. Using mock data mode.');
}

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

// Database operations
const db = {
  // Users
  async createUser(userData) {
    if (!supabase) return { error: 'Database not configured' };

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Create user error:', error);
      return { success: false, error: error.message };
    }
  },

  async getUser(userId) {
    if (!supabase) return { error: 'Database not configured' };

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Get user error:', error);
      return { success: false, error: error.message };
    }
  },

  async updateUser(userId, updates) {
    if (!supabase) return { error: 'Database not configured' };

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: error.message };
    }
  },

  // Payments
  async createPayment(paymentData) {
    if (!supabase) return { error: 'Database not configured' };

    try {
      const { data, error } = await supabase
        .from('payments')
        .insert([paymentData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Create payment error:', error);
      return { success: false, error: error.message };
    }
  },

  async getUserPayments(userId) {
    if (!supabase) return { error: 'Database not configured' };

    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Get user payments error:', error);
      return { success: false, error: error.message };
    }
  },

  // Servers
  async createServer(serverData) {
    if (!supabase) return { error: 'Database not configured' };

    try {
      const { data, error } = await supabase
        .from('servers')
        .insert([serverData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Create server error:', error);
      return { success: false, error: error.message };
    }
  },

  async getUserServers(userId) {
    if (!supabase) return { error: 'Database not configured' };

    try {
      const { data, error } = await supabase
        .from('servers')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Get user servers error:', error);
      return { success: false, error: error.message };
    }
  },

  async updateServer(serverId, updates) {
    if (!supabase) return { error: 'Database not configured' };

    try {
      const { data, error } = await supabase
        .from('servers')
        .update(updates)
        .eq('id', serverId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Update server error:', error);
      return { success: false, error: error.message };
    }
  },

  // Analytics
  async getDashboardStats() {
    if (!supabase) return { error: 'Database not configured' };

    try {
      // Get total users
      const { count: userCount, error: userError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (userError) throw userError;

      // Get total servers
      const { count: serverCount, error: serverError } = await supabase
        .from('servers')
        .select('*', { count: 'exact', head: true });

      if (serverError) throw serverError;

      // Get total revenue
      const { data: payments, error: paymentError } = await supabase
        .from('payments')
        .select('amount')
        .eq('status', 'completed');

      if (paymentError) throw paymentError;

      const totalRevenue = payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;

      return {
        success: true,
        data: {
          totalUsers: userCount || 0,
          totalServers: serverCount || 0,
          totalRevenue: totalRevenue,
          activeUsers: userCount || 0 // Simplified for now
        }
      };
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      return { success: false, error: error.message };
    }
  }
};

module.exports = {
  supabase,
  supabaseAdmin,
  db
};
