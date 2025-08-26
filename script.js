/* ------------------------
   Mobile Navigation Toggle
------------------------- */
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close nav on link click (mobile)
  nav.addEventListener('click', e => {
    if (e.target.matches('a') && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ------------------------
   Prefill Event Field
------------------------- */
const eventField = document.getElementById('eventField');
document.querySelectorAll('[data-prefill]').forEach(a => {
  a.addEventListener('click', () => {
    const value = a.getAttribute('data-prefill');
    if (eventField && value) eventField.value = value;
  });
});

/* ------------------------
   Quick Request Widget
------------------------- */
const quickBtn = document.getElementById('quickRequestBtn');
const quickInput = document.getElementById('quickEvent');

if (quickBtn && quickInput && eventField) {
  quickBtn.addEventListener('click', () => {
    const value = quickInput.value.trim();
    if (!value) {
      quickInput.focus();
      return;
    }
    eventField.value = value;
    location.hash = '#contact';
    eventField.focus();
  });
}

/* ------------------------
   Mailto Fallback Button
------------------------- */
const mailtoBtn = document.getElementById('mailtoBtn');

if (mailtoBtn) {
  mailtoBtn.addEventListener('click', () => {
    const qs = n => document.querySelector(`[name="${n}"]`);
    const val = n => (qs(n)?.value || '').trim();

    const fields = {
      name: val('name'),
      email: val('email'),
      phone: val('phone'),
      event: val('event'),
      details: val('details'),
      quantity: val('quantity'),
      budget: val('budget'),
      notes: val('notes')
    };

    const subject = `Ticket request — ${fields.event || 'New inquiry'}`;
    const body = `
Name: ${fields.name}
Email: ${fields.email}
Phone: ${fields.phone}
Event/Artist: ${fields.event}
Date/City: ${fields.details}
Quantity: ${fields.quantity}
Budget: ${fields.budget}

Notes:
${fields.notes}`.trim();

    const url = `mailto:info@ialbseats.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Mailto links break if too long (~2kb limit). Fallback to normal submit.
    if (url.length < 1800) {
      window.location.href = url;
    } else {
      alert('Message too long for your email app. Submitting via form instead.');
      const form = document.querySelector('form[name="request"]');
      if (form) form.requestSubmit();
    }
  });
}

/* ------------------------
   Current Year in Footer
------------------------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
