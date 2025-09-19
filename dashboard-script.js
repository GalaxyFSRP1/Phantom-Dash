// Supabase configuration
const SUPABASE_URL = 'https://etjoerlsuspwwxbwycpc.supabase.co/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0am9lcmxzdXNwd3d4Ynd5Y3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMTE3NTksImV4cCI6MjA3MjY4Nzc1OX0.5BATyXU30jfZWi-k9ZaDQa2bWeOvjtp9_U_4e-xGF1c';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Check authentication status
    checkAuthStatus();
    
    // Initialize charts
    initializeCharts();
    
    // Set up event listeners
    setupEventListeners();
    
    // Simulate loading progress
    simulateLoading();
});

// Initialize dashboard
async function initializeDashboard() {
    try {
        // Get user data
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            // Update UI with user data
            document.getElementById('user-name').textContent = user.email;
            document.getElementById('user-email').textContent = user.email;
            document.getElementById('header-user-avatar').src = 'images/user-avatar.svg';
            document.getElementById('user-avatar').src = 'images/user-avatar.svg';
        }
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
}

// Check authentication status
async function checkAuthStatus() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            // Redirect to login page if not authenticated
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
        window.location.href = 'index.html';
    }
}

// Initialize charts
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue ($)',
                data: [8500, 12500, 9800, 15200, 18300, 21500, 24600, 19800, 22700, 25300, 28400, 31500],
                borderColor: '#00e6cc',
                backgroundColor: 'rgba(0, 230, 204, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });

    // Traffic Sources Chart
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    new Chart(trafficCtx, {
        type: 'doughnut',
        data: {
            labels: ['Direct', 'Social', 'Referral', 'Organic', 'Email'],
            datasets: [{
                data: [35, 25, 15, 20, 5],
                backgroundColor: [
                    '#00e6cc',
                    '#3a7bd5',
                    '#f05a28',
                    '#8e44ad',
                    '#f39c12'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });

    // Users Chart
    const usersCtx = document.getElementById('usersChart').getContext('2d');
    new Chart(usersCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'New Users',
                data: [65, 89, 80, 81, 96, 105],
                backgroundColor: '#00e6cc',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });
}

// Set up event listeners
function setupEventListeners() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
    
    // Logout buttons
    const logoutBtn = document.getElementById('logout-btn');
    const dropdownLogout = document.getElementById('dropdown-logout');
    
    const handleLogout = async function() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error logging out:', error);
            showNotification('Error logging out. Please try again.', 'error');
        }
    };
    
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (dropdownLogout) dropdownLogout.addEventListener('click', handleLogout);
    
    // Show notification toast
    setTimeout(() => {
        showNotification('Welcome to your Phantom Dashboard!');
    }, 2000);
}

// Simulate loading progress
function simulateLoading() {
    const progressFill = document.querySelector('.progress-fill');
    const loadingScreen = document.getElementById('loading-screen');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        progressFill.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        }
    }, 200);
}

// Show notification
function showNotification(message, type = 'success') {
    const toast = document.getElementById('notification-toast');
    const toastMessage = toast.querySelector('.toast-message p');
    
    toastMessage.textContent = message;
    
    // Set icon based on type
    const icon = toast.querySelector('.toast-content i');
    if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
        icon.style.color = '#ef4444';
    } else if (type === 'warning') {
        icon.className = 'fas fa-exclamation-triangle';
        icon.style.color = '#f59e0b';
    } else {
        icon.className = 'fas fa-check-circle';
        icon.style.color = '#00e6cc';
    }
    
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function() {
        toast.classList.remove('show');
    });
}

// Real-time data simulation
function simulateRealTimeData() {
    setInterval(() => {
        // Update current visitors
        const currentVisitors = document.querySelector('.metric-value:first-child');
        const randomChange = Math.floor(Math.random() * 10) - 3; // -3 to +6
        let visitors = parseInt(currentVisitors.textContent);
        visitors = Math.max(100, visitors + randomChange);
        currentVisitors.textContent = visitors;
        
        // Update trend indicator
        const trend = document.querySelector('.metric-change:first-child');
        if (randomChange >= 0) {
            trend.className = 'metric-change positive';
            trend.innerHTML = '<i class="fas fa-arrow-up"></i><span>' + Math.abs(randomChange) + ' from 5 mins ago</span>';
        } else {
            trend.className = 'metric-change negative';
            trend.innerHTML = '<i class="fas fa-arrow-down"></i><span>' + Math.abs(randomChange) + ' from 5 mins ago</span>';
        }
    }, 10000); // Update every 10 seconds
}

// Start real-time data simulation
setTimeout(simulateRealTimeData, 5000);

// Export data function (for future use)
function exportData(format = 'csv') {
    // This would be implemented based on your data structure
    showNotification(`Exporting data as ${format.toUpperCase()}...`);
}

// Filter data function (for future use)
function filterData(filters) {
    // This would be implemented based on your data structure
    console.log('Applying filters:', filters);
}
