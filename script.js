// ============================================================
// SCRIPT.JS — Portfolio Interactivity
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── RENDER CONTENT FROM DATA ──────────────────────────────
  populateContent();

  // ── NAV SCROLL ────────────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── HAMBURGER ─────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // ── THEME TOGGLE ──────────────────────────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const savedTheme  = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    themeIcon.className = t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  // ── REVEAL ON SCROLL ──────────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add('visible');
          // Animate skill bars
          e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width') + '%';
          });
        }, i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── COUNTER ANIMATION ─────────────────────────────────────
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    let current = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 30);
  }

  // ── CONTACT FORM ──────────────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      btn.style.background = '#25D366';
      setTimeout(() => {
        btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        btn.style.background = '';
        form.reset();
      }, 2500);
    });
  }
});

// ── POPULATE CONTENT FROM DATA ────────────────────────────
function populateContent() {
  const d = PORTFOLIO_DATA;

  // About
  const aboutName = document.getElementById('aboutName');
  const aboutBio  = document.getElementById('aboutBio');
  if (aboutName) aboutName.textContent = d.personal.name;
  if (aboutBio)  aboutBio.textContent  = d.personal.bio;

  // Experience Timeline
  const timeline = document.getElementById('experienceTimeline');
  if (timeline) {
    timeline.innerHTML = d.experience.map(exp => `
      <div class="timeline-item reveal">
        <div class="timeline-card">
          <div class="timeline-period">${exp.period}</div>
          <div class="timeline-title">${exp.title}</div>
          <div class="timeline-company">
            <i class="fa-solid fa-building"></i> ${exp.company} — ${exp.location}
          </div>
          <ul class="timeline-achievements">
            ${exp.achievements.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
    // Re-observe new elements
    reObserve(timeline.querySelectorAll('.reveal'));
  }

  // Skills Grid
  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    skillsGrid.innerHTML = d.skills.map(sk => `
      <div class="skill-card reveal">
        <div class="skill-top">
          <div class="skill-icon-wrap"><i class="fa-solid ${sk.icon}"></i></div>
          <span class="skill-name">${sk.name}</span>
          <span class="skill-pct">${sk.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-bar-fill" data-width="${sk.level}"></div>
        </div>
      </div>
    `).join('');
    reObserve(skillsGrid.querySelectorAll('.reveal'));
  }

  // Certificates
  const certGrid = document.getElementById('certGrid');
  if (certGrid) {
    certGrid.innerHTML = d.certificates.map(cert => `
      <div class="cert-card reveal">
        <div class="cert-ribbon">Verified</div>
        <div class="cert-icon"><i class="fa-solid ${cert.icon}"></i></div>
        <div class="cert-title">${cert.title}</div>
        <div class="cert-subtitle">${cert.subtitle}</div>
        <div class="cert-date">${cert.date}</div>
      </div>
    `).join('');
    reObserve(certGrid.querySelectorAll('.reveal'));
  }
}

function reObserve(elements) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add('visible');
          e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width') + '%';
          });
        }, i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => obs.observe(el));
}

// ── LIGHTBOX ─────────────────────────────────────────────
function openLightbox(src, caption) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  lightboxImg.src = src;
  lightboxImg.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
