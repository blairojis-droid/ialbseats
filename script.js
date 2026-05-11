/* ============================================================
   ialbseats — Global Script
   ============================================================ */

/* Mobile nav toggle */
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.getElementById('primary-nav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Prefill event field from card "Request" buttons */
document.querySelectorAll('[data-prefill]').forEach(btn => {
  btn.addEventListener('click', () => {
    const field = document.getElementById('eventField');
    if (field) field.value = btn.getAttribute('data-prefill');
  });
});

/* Quick event search box */
const quickBtn   = document.getElementById('quickRequestBtn');
const quickInput = document.getElementById('quickEvent');

if (quickBtn && quickInput) {
  quickBtn.addEventListener('click', () => {
    const val   = quickInput.value.trim();
    const field = document.getElementById('eventField');
    if (!val) { quickInput.focus(); return; }
    if (field) field.value = val;
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ behavior: 'smooth' });
  });

  quickInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') quickBtn.click();
  });
}

/* "Email This Request" mailto fallback */
const mailtoBtn = document.getElementById('mailtoBtn');

if (mailtoBtn) {
  mailtoBtn.addEventListener('click', () => {
    const get = name => (document.querySelector('[name="' + name + '"]') || {}).value || '';
    const event = get('event');

    const lines = [
      'Name: '           + get('name'),
      'Email: '          + get('email'),
      get('phone') ? 'Phone/WhatsApp: ' + get('phone') : '',
      'Event/Artist: '   + event,
      'Date/City: '      + get('details'),
      'Quantity: '       + get('quantity'),
      get('budget') ? 'Budget: ' + get('budget') : '',
      get('notes')  ? 'Notes:\n'  + get('notes')  : '',
    ].filter(Boolean);

    const subject = encodeURIComponent('Ticket Request: ' + (event || 'New Inquiry'));
    const body    = encodeURIComponent(lines.join('\n'));
    const url     = 'mailto:info@ialbseats.com?subject=' + subject + '&body=' + body;

    if (url.length < 2000) {
      window.location.href = url;
    } else {
      alert('Message too long for email link — please use the Send Request button instead.');
      const form = document.querySelector('form[name="request"]');
      if (form) form.requestSubmit();
    }
  });
}

/* Current year in footer */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Scroll-triggered fade-in for cards / steps / FAQs */
if ('IntersectionObserver' in window) {
  const targets = document.querySelectorAll('.card, .step, details.faq');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    io.observe(el);
  });
}
