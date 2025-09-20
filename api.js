// PhanomDash-NextGen API Client
class PhanomAPI {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  // Authentication methods
  async login(email, password) {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        this.token = data.token;
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user, redirectUrl: data.redirectUrl };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        this.token = data.token;
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  // Dashboard methods
  async getDashboardData() {
    try {
      const response = await this.authenticatedFetch(`${this.baseURL}/dashboard`);
      return await response.json();
    } catch (error) {
      console.error('Dashboard data error:', error);
      throw error;
    }
  }

  // Pterodactyl integration methods
  async getServers() {
    try {
      const response = await this.authenticatedFetch(`${this.baseURL}/pterodactyl/servers`);
      return await response.json();
    } catch (error) {
      console.error('Get servers error:', error);
      throw error;
    }
  }

  async createServer(serverData) {
    try {
      const response = await this.authenticatedFetch(`${this.baseURL}/pterodactyl/create-server`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverData),
      });

      const data = await response.json();

      if (data.success) {
        return { success: true, server: data.server };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Create server error:', error);
      return { success: false, error: 'Failed to create server' };
    }
  }

  // Payment methods
  async createPaymentSession(planId, billingCycle = 'monthly') {
    try {
      const response = await this.authenticatedFetch(`${this.baseURL}/payment/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId, billingCycle }),
      });

      const data = await response.json();

      if (data.success) {
        return { success: true, session: data.session };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Payment session error:', error);
      return { success: false, error: 'Failed to create payment session' };
    }
  }

  // Admin methods
  async getAdminStats() {
    try {
      const response = await this.authenticatedFetch(`${this.baseURL}/admin/stats`);
      return await response.json();
    } catch (error) {
      console.error('Admin stats error:', error);
      throw error;
    }
  }

  // Utility methods
  async authenticatedFetch(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    const response = await fetch(url, mergedOptions);

    if (response.status === 401) {
      this.logout();
      throw new Error('Authentication required');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response;
  }

  isAuthenticated() {
    return !!this.token;
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Real-time updates (WebSocket)
  connectWebSocket() {
    if (this.socket) return;

    this.socket = new WebSocket(`ws://localhost:3001`);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      // Authenticate WebSocket connection
      this.socket.send(JSON.stringify({
        type: 'auth',
        token: this.token
      }));
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleWebSocketMessage(data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connectWebSocket(), 5000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  handleWebSocketMessage(data) {
    switch (data.type) {
      case 'server_status':
        this.updateServerStatus(data.serverId, data.status);
        break;
      case 'notification':
        this.showNotification(data.message, data.type);
        break;
      case 'user_activity':
        this.updateUserActivity(data.activity);
        break;
      default:
        console.log('Unknown WebSocket message:', data);
    }
  }

  updateServerStatus(serverId, status) {
    // Update UI with new server status
    const serverElement = document.querySelector(`[data-server-id="${serverId}"]`);
    if (serverElement) {
      const statusElement = serverElement.querySelector('.server-status');
      if (statusElement) {
        statusElement.textContent = status;
        statusElement.className = `server-status status-${status}`;
      }
    }
  }

  showNotification(message, type = 'info') {
    // Create and show notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  updateUserActivity(activity) {
    // Update recent activity feed
    const activityFeed = document.querySelector('.activity-feed');
    if (activityFeed) {
      const activityItem = document.createElement('div');
      activityItem.className = 'activity-item';
      activityItem.innerHTML = `
        <span class="activity-type">${activity.type}</span>
        <span class="activity-message">${activity.message}</span>
        <span class="activity-time">${new Date(activity.timestamp).toLocaleTimeString()}</span>
      `;

      activityFeed.insertBefore(activityItem, activityFeed.firstChild);

      // Keep only last 10 activities
      while (activityFeed.children.length > 10) {
        activityFeed.removeChild(activityFeed.lastChild);
      }
    }
  }

  disconnectWebSocket() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

// Create global API instance
const api = new PhanomAPI();

// Export for use in other modules
window.PhanomAPI = PhanomAPI;
window.api = api;
