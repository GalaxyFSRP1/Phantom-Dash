document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('active');
  });

  // Auth modal logic (simplified, expand as needed)
  const authButton = document.getElementById('auth-button');
  const authModal = document.getElementById('auth-modal');
  const closeModalEls = document.querySelectorAll('.close-modal');
  if(authButton){
    authButton.onclick = () => { authModal.style.display = 'block'; }
  }
  closeModalEls.forEach(el => el.onclick = () => {
    el.closest('.modal').style.display = 'none';
  });
  window.onclick = (e) => {
    if(e.target.classList.contains('modal')) e.target.style.display = 'none';
  };

  // Auth tab switching
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
      document.getElementById(this.dataset.tab + '-form').classList.add('active');
    });
  });

  // Simulate login/signup (expand with your backend logic)
  document.getElementById('login-form-element').onsubmit = e => {
    e.preventDefault();
    // Add your logic here!
    authModal.style.display = 'none';
    // Simulate user login
    document.getElementById('user-menu').style.display = 'flex';
  };
  document.getElementById('signup-form-element').onsubmit = e => {
    e.preventDefault();
    // Add your logic here!
    authModal.style.display = 'none';
    // Simulate user signup
    document.getElementById('user-menu').style.display = 'flex';
  };

  // User dropdown toggle
  const userAvatar = document.getElementById('user-avatar');
  if(userAvatar){
    userAvatar.onclick = () => {
      document.getElementById('user-dropdown').classList.toggle('active');
    };
  }

  // Simulate logout
  const logoutButton = document.getElementById('logout-button');
  if(logoutButton){
    logoutButton.onclick = () => {
      document.getElementById('user-menu').style.display = 'none';
    };
  }

  // Payment Success Modal (simulate navigation)
  const goToDash = document.getElementById('go-to-dashboard');
  if(goToDash) {
    goToDash.onclick = () => {
      window.location.href = "dashboard.html";
    }
  }

  // Starfield background (make it dynamic & pretty!)
  const starField = document.querySelector('.star-field');
  if(starField){
    for(let i=0;i<40;i++){
      const star = document.createElement('div');
      star.className = 'star star-' + (i+1);
      starField.appendChild(star);
    }
  }
});
