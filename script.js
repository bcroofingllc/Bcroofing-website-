// BC Roofing — script.js v2

// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    const [s1, s2, s3] = hamburger.querySelectorAll('span');
    if (open) {
      s1.style.transform = 'rotate(45deg) translate(5px, 5px)';
      s2.style.opacity = '0';
      s3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      s1.style.transform = s2.style.opacity = s3.style.transform = '';
    }
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });
}

// ===========================
// HERO FORM
// ===========================
function submitHeroForm() {
  const name = document.getElementById('hf-name');
  const phone = document.getElementById('hf-phone');
  if (!name || !name.value.trim()) { alert('Please enter your name.'); return; }
  if (!phone || !phone.value.trim()) { alert('Please enter your phone number.'); return; }
  document.getElementById('hf-success').style.display = 'block';
  name.value = phone.value = '';
  if (document.getElementById('hf-service')) document.getElementById('hf-service').selectedIndex = 0;
}

// ===========================
// CONTACT FORM
// ===========================
function submitContactForm() {
  const fname = document.getElementById('cf-fname');
  const phone = document.getElementById('cf-phone');
  const type = document.getElementById('cf-type');
  if (!fname || !fname.value.trim()) { alert('Please enter your first name.'); return; }
  if (!phone || !phone.value.trim()) { alert('Please enter your phone number.'); return; }
  if (!type || !type.value) { alert('Please tell us who you are.'); return; }
  const form = document.getElementById('the-form');
  const success = document.getElementById('form-success');
  if (form && success) {
    form.style.display = 'none';
    success.style.display = 'block';
    window.scrollTo({ top: success.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  }
}

// ===========================
// PORTFOLIO FILTER
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.pm-item').forEach(item => {
        const cats = item.dataset.category || '';
        item.style.display = (filter === 'all' || cats.includes(filter)) ? 'block' : 'none';
      });
    });
  });
}

// ===========================
// STATS COUNTER ANIMATION
// ===========================
function animateCounter(el, target) {
  const suffix = el.nextElementSibling?.classList.contains('sn-suffix')
    ? el.nextElementSibling.textContent : '';
  let val = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    val = Math.min(val + step, target);
    el.textContent = val;
    if (val >= target) clearInterval(timer);
  }, 20);
}

const statEls = document.querySelectorAll('.sn[data-target]');
if (statEls.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target, parseInt(e.target.dataset.target));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => obs.observe(el));
}

// ===========================
// SCROLL REVEAL
// ===========================
const revealTargets = document.querySelectorAll(
  '.svc-card, .trust-card, .tcard, .vp-card, .who-card, .val-item, .bf-item, .cs-item, .team-card-v2, .pm-item, .g-item'
);

if ('IntersectionObserver' in window) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.07}s, transform 0.5s ease ${(i % 6) * 0.07}s`;
    revealObs.observe(el);
  });
}

document.addEventListener('animationend', () => {});

// Add reveal class handler
const style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(style);

// ===========================
// JUMP NAV ACTIVE STATE
// ===========================
const jumpLinks = document.querySelectorAll('.jump-nav a');
if (jumpLinks.length) {
  const sectionIds = Array.from(jumpLinks).map(a => a.getAttribute('href').replace('#', ''));
  window.addEventListener('scroll', () => {
    let current = '';
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 140) current = id;
    });
    jumpLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--white)' : '';
      a.style.borderBottomColor = a.getAttribute('href') === '#' + current
        ? 'var(--red)' : '';
    });
  });
}
