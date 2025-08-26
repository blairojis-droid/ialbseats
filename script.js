/* Mobile nav toggle */
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

/* Prefill “Event/Artist” when clicking Request buttons in cards */
const links = document.querySelectorAll('[data-prefill]');
const eventField = document.getElementById('eventField');
links.forEach(a => {
  a.addEventListener('click', () => {
    const value = a.getAttribute('data-prefill');
    if (eventField && value) {
      eventField.value = value;
    }
  });
});

/* Quick Request widget → prefill form and scroll to #contact */
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

/* Mailto fallback button – build an email from form values */
const mailtoBtn = document.getElementById('mailtoBtn');
if (mailtoBtn) {
  mailtoBtn.addEventListener('click', () => {
    const qs = n => (document.querySelector(`[name="${n}"]`) || {});
    const val = n => (qs(n).value || '').toString().trim();

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
    const body =
`Name: ${fields.name}
Email: ${fields.email}
Phone: ${fields.phone}
Event/Artist: ${fields.event}
Date/City: ${fields.details}
Quantity: ${fields.quantity}
Budget: ${fields.budget}

Notes:
${fields.notes}`;

    const url = `mailto:info@ialbseats.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (url.length < 1800) {
      window.location.href = url;
    } else {
      alert('Message is too long for your email app. We’ll submit via the form instead.');
      const form = document.querySelector('form[name="request"]');
      if (form) form.requestSubmit();
    }
  });
}

/* Current year in footer */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
