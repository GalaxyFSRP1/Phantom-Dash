// Core landing page interactions and small app logic (client-side only).
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const authModal = document.getElementById('auth-modal');
  const openAuth = document.getElementById('open-auth');
  const closeAuth = authModal && authModal.querySelector('.modal-close');
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  const goDash = document.getElementById('go-dashboard');
  const contactForm = document.getElementById('contactForm');
  const starfield = document.querySelector('.starfield');
  const userMenu = document.getElementById('userMenu');
  const userAvatar = document.getElementById('userAvatar');
  const userDropdown = document.getElementById('userDropdown');
  const logoutBtn = document.getElementById('logoutBtn');

  // Starfield small particles
  if(starfield){
    for(let i=0;i<36;i++){
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random()*2 + 1;
      s.style.width = s.style.height = size + 'px';
      s.style.position = 'absolute';
      s.style.left = Math.random()*100 + '%';
      s.style.top = Math.random()*100 + '%';
      s.style.opacity = 0.2 + Math.random()*0.8;
      s.style.background = 'radial-gradient(circle,#fff,#a9f7ef)';
      s.style.filter = 'blur(' + (Math.random()*2)+'px)';
      starfield.appendChild(s);
    }
  }

  // Open auth modal
  if(openAuth) openAuth.addEventListener('click', () => {
    authModal.setAttribute('aria-hidden', 'false');
  });
  if(closeAuth) closeAuth.addEventListener('click', () => {
    authModal.setAttribute('aria-hidden','true');
  });
  window.addEventListener('click', (e) => {
    if(e.target === authModal) authModal.setAttribute('aria-hidden','true');
  });

  // Tab switching
  tabs.forEach(t => t.addEventListener('click', (e) => {
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const target = t.dataset.for;
    forms.forEach(f => f.classList.remove('active'));
    const f = document.getElementById(target+'-form') || document.querySelector('#'+target+'-form') || document.querySelector(`#${target}`);
    if(f) f.classList.add('active');
  }));

  // Simulate auth behavior (client-only)
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const userFullName = document.getElementById('userFullName');

  function setUser(name){
    if(userMenu){
      userMenu.classList.remove('hidden');
      userFullName && (userFullName.textContent = name);
      const initials = name.split(' ').map(s=>s[0]||'').slice(0,2).join('').toUpperCase();
      if(userAvatar) userAvatar.textContent = initials;
    }
    authModal.setAttribute('aria-hidden','true');
  }

  if(loginForm){
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value || 'user@phantom';
      setUser(email.split('@')[0]);
    });
  }
  if(signupForm){
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value || 'New User';
      setUser(name);
    });
  }

  // Menu toggle for mobile
  if(menuToggle){
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Dashboard navigation (demo)
  if(goDash){
    goDash.addEventListener('click', () => {
      window.location.href = 'dashboard.html';
    });
  }

  // Contact form (simulate submit)
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();
      if(!name || !email || !message){
        alert('Please complete all fields.');
        return;
      }
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        contactForm.reset();
        alert('Message sent — we will reply shortly.');
      }, 1000);
    });
  }

  // Testimonials simple slider
  const slider = document.getElementById('testiSlider');
  const controls = document.getElementById('testiControls');
  if(slider && controls){
    const items = [...slider.children];
    items.forEach((it, idx) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (idx===0 ? ' active' : '');
      dot.addEventListener('click', ()=> {
        slider.scrollTo({ left: it.offsetLeft - 8, behavior:'smooth' });
        controls.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
        dot.classList.add('active');
      });
      controls.appendChild(dot);
    });
    slider.addEventListener('scroll', () => {
      const sc = slider.scrollLeft;
      let current = 0;
      items.forEach((it, idx) => {
        if(sc >= it.offsetLeft - 20) current = idx;
      });
      controls.querySelectorAll('button').forEach((b,i)=> b.classList.toggle('active', i===current));
    });
  }

  // User avatar dropdown
  if(userAvatar){
    userAvatar.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('open');
    });
    window.addEventListener('click', ()=> userDropdown.classList.remove('open'));
  }
  if(logoutBtn){
    logoutBtn.addEventListener('click', ()=> {
      userMenu.classList.add('hidden');
      userDropdown.classList.remove('open');
      alert('Logged out (demo)');
    });
  }

  // Smooth scroll for header nav links
  document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  }));
});
