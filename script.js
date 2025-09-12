document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('active');
  });

  // Auth modal
  const authButton = document.getElementById('auth-button');
  const authModal = document.getElementById('auth-modal');
  const closeModalEls = document.querySelectorAll('.close-modal');
  if(authButton) authButton.onclick = () => { authModal.style.display = 'block'; }
  closeModalEls.forEach(el => el.onclick = () => { el.closest('.modal').style.display = 'none'; });
  window.onclick = (e) => { if(e.target.classList.contains('modal')) e.target.style.display = 'none'; };

  // Auth tab switching
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
      document.getElementById(this.dataset.tab + '-form').classList.add('active');
    });
  });

  // Simulate login/signup (frontend only)
  document.getElementById('login-form').onsubmit = e => {
    e.preventDefault();
    document.getElementById('auth-modal').style.display = 'none';
    document.getElementById('user-menu').style.display = 'flex';
    document.getElementById('user-initials').innerText = 'JD';
    document.getElementById('user-name').innerText = 'John Doe';
  };
  document.getElementById('signup-form').onsubmit = e => {
    e.preventDefault();
    document.getElementById('auth-modal').style.display = 'none';
    document.getElementById('user-menu').style.display = 'flex';
    document.getElementById('user-initials').innerText = 'AN';
    document.getElementById('user-name').innerText = 'Alex New';
  };

  // User dropdown toggle and logout
  const userAvatar = document.getElementById('user-avatar');
  if(userAvatar) userAvatar.onclick = () => { document.getElementById('user-dropdown').classList.toggle('active'); };
  const logoutButton = document.getElementById('logout-button');
  if(logoutButton) logoutButton.onclick = () => { document.getElementById('user-menu').style.display = 'none'; };

  // Smooth scroll for nav links
  document.querySelectorAll('a.nav-link, .hero-cta a, .banner-cta a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if(href && href.startsWith('#') && document.querySelector(href)){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // Starfield animation
  const starField = document.querySelector('.star-field');
  if(starField){
    for(let i=0;i<40;i++){
      const star = document.createElement('div');
      star.className = 'star star-' + (i+1);
      starField.appendChild(star);
    }
  }
});
