function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  const services = db.getAll();
  grid.innerHTML = services.map(s => `
  <div class="service-card">
    <div class="service-name">${s.name}</div>
    <p class="service-description">${s.description}</p>
  </div>
  `).join('');
  animateReveal(grid.querySelectorAll('.service-card'));
}

function animateReveal(elements) {
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => obs.observe(el));
}

function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(() => { el.style.width = el.dataset.width + '%'; }, 100);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => obs.observe(bar));
}

function initNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

function initExpReveal() {
  animateReveal(document.querySelectorAll('.exp-item'));
}

document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  initSkillBars();
  initNav();
  initExpReveal();
});
