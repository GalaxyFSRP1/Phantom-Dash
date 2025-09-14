// Supabase configuration
const SUPABASE_URL = 'https://etjoerlsuspwwxbwycpc.supabase.co/'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0am9lcmxzdXNwd3d4Ynd5Y3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMTE3NTksImV4cCI6MjA3MjY4Nzc1OX0.5BATyXU30jfZWi-k9ZaDQa2bWeOvjtp9_U_4e-xGF1c'; // Replace with your Supabase anon key
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Stripe configuration
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51Rolv4GrRXIugSobD7Hy5zJgBtdicGS7zk72uWRlLTk6DmoWe9RPfX3rrcyj9lSozn6knOrIxTu9uiI5TzCW6DXl00SjllbTyq'; // Replace with your Stripe publishable key
const stripe = window.Stripe(STRIPE_PUBLISHABLE_KEY);

document.addEventListener('DOMContentLoaded', function() {

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Authentication modal management
    const authModal = document.getElementById('auth-modal');
    const dashboardModal = document.getElementById('dashboard-modal');
    const modalClose = document.getElementById('modal-close');
    const authToggleLink = document.getElementById('auth-toggle-link');
    const authToggleText = document.getElementById('auth-toggle-text');
    const modalTitle = document.getElementById('modal-title');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Dashboard elements
    const profileBtn = document.getElementById('profile-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const manageSubscriptionBtn = document.getElementById('manage-subscription-btn');

    // Modal event listeners
    modalClose.addEventListener('click', closeAuthModal);
    authModal.addEventListener('click', function(e) {
        if (e.target === authModal) closeAuthModal();
    });
    dashboardModal.addEventListener('click', function(e) {
        if (e.target === dashboardModal) closeDashboardModal();
    });

    // Auth toggle
    authToggleLink.addEventListener('click', toggleAuthMode);

    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);

    // Dashboard buttons
    profileBtn.addEventListener('click', showProfile);
    settingsBtn.addEventListener('click', showSettings);
    logoutBtn.addEventListener('click', handleLogout);
    manageSubscriptionBtn.addEventListener('click', manageSubscription);

    // Check for existing session on page load
    checkUserSession();

    // Add click handlers to "Sign Up" buttons
    const signUpButtons = document.querySelectorAll('a[href="#signup"], a[href="#signin"]');
    signUpButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal();
        });
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill out all required fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const formContainer = document.querySelector('.contact-form-container');
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = `
                    <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you shortly.</p>
                    <button class="btn btn-outline send-another"><span class="text-gradient">Send Another</span></button>
                `;
                
                formContainer.innerHTML = '';
                formContainer.appendChild(successMessage);
                
                // Add event listener to "Send Another" button
                const sendAnotherBtn = document.querySelector('.send-another');
                if (sendAnotherBtn) {
                    sendAnotherBtn.addEventListener('click', function() {
                        formContainer.innerHTML = '';
                        formContainer.appendChild(contactForm);
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    });
                }
            }, 2000);
        });
    }

    // Authentication Functions
    async function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            closeAuthModal();
            openDashboardModal();
            initializeDashboard();
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            if (error) throw error;

            alert('Registration successful! Please check your email to verify your account.');
            toggleAuthMode(); // Switch to login form
        } catch (error) {
            alert('Registration failed: ' + error.message);
        }
    }

    async function handleLogout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            closeDashboardModal();
            updateUIForLoggedOutUser();
        } catch (error) {
            alert('Logout failed: ' + error.message);
        }
    }

    async function checkUserSession() {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            openDashboardModal();
            initializeDashboard();
        } else {
            updateUIForLoggedOutUser();
        }
    }

    // Modal Management Functions
    function openAuthModal() {
        authModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeAuthModal() {
        authModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        loginForm.reset();
        registerForm.reset();
    }

    function openDashboardModal() {
        dashboardModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeDashboardModal() {
        dashboardModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    function toggleAuthMode() {
        const isLoginVisible = !loginForm.classList.contains('hidden');

        if (isLoginVisible) {
            // Switch to register
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            modalTitle.textContent = 'Create Account';
            authToggleText.innerHTML = 'Already have an account? <a href="#" id="auth-toggle-link">Sign in</a>';
        } else {
            // Switch to login
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            modalTitle.textContent = 'Sign In';
            authToggleText.innerHTML = 'Don\'t have an account? <a href="#" id="auth-toggle-link">Sign up</a>';
        }

        // Re-attach event listener to the new link
        const newToggleLink = document.getElementById('auth-toggle-link');
        newToggleLink.addEventListener('click', toggleAuthMode);
    }

    // Dashboard Functions
    function initializeDashboard() {
        initializeCharts();
        loadUserData();
    }

    function initializeCharts() {
        // Revenue Chart
        const revenueCtx = document.getElementById('revenue-chart').getContext('2d');
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Users Chart
        const usersCtx = document.getElementById('users-chart').getContext('2d');
        new Chart(usersCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Users',
                    data: [65, 89, 80, 81, 96, 105],
                    backgroundColor: '#10b981',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Performance Chart
        const performanceCtx = document.getElementById('performance-chart').getContext('2d');
        new Chart(performanceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Page Views', 'Conversions', 'Bounce Rate'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        '#6366f1',
                        '#10b981',
                        '#f59e0b'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    async function loadUserData() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Load user profile data
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    document.getElementById('current-plan-name').textContent = profile.subscription_plan || 'Free';
                    // Update other user data as needed
                }
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    function showProfile() {
        alert('Profile management coming soon!');
    }

    function showSettings() {
        alert('Settings panel coming soon!');
    }

    function manageSubscription() {
        alert('Subscription management coming soon!');
    }

    function updateUIForLoggedOutUser() {
        // Update navigation or UI elements for logged out state
        // This could include changing "Sign Up" buttons to "Dashboard" if logged in
    }

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            openDashboardModal();
            initializeDashboard();
        } else if (event === 'SIGNED_OUT') {
            closeDashboardModal();
            updateUIForLoggedOutUser();
        }
    });
});
