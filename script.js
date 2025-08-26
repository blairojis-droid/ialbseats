/* Secondary action: open the user's email client prefilled with the form data */
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
Date/City/Venue: ${fields.details}
Quantity: ${fields.quantity}
Budget: ${fields.budget}

Notes:
${fields.notes}`;

    const url = `mailto:info@ialbseats.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Mailto URLs can break if too long; warn and fall back to the main submit
    if (url.length < 1800) {
      window.location.href = url;
    } else {
      alert('Message is too long for your email app. We’ll submit via the form instead.');
      // optionally trigger the form submit:
      const form = document.querySelector('form[name="request"]');
      if (form) form.requestSubmit();
    }
  });
}
