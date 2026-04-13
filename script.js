const yearNode = document.querySelector('#year');
const contactForm = document.querySelector('#contactForm');
const formMessage = document.querySelector('#formMessage');
const submitButton = contactForm?.querySelector('button[type="submit"]');

yearNode.textContent = new Date().getFullYear();

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formMessage.textContent = 'Please complete all fields before submitting.';
    formMessage.style.color = '#ff9d9d';
    return;
  }

  if (contactForm.action.includes('/your-form-id')) {
    formMessage.textContent = 'Formspree is not connected yet. Add your Formspree form ID to start receiving messages.';
    formMessage.style.color = '#ffcf70';
    return;
  }

  const data = new FormData(contactForm);
  const name = data.get('name');

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  formMessage.textContent = '';

  try {
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      body: data,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      formMessage.textContent = `Thanks, ${name}. Hermiora AI will contact you shortly.`;
      formMessage.style.color = '#9de1ad';
      contactForm.reset();
      return;
    }

    const result = await response.json().catch(() => null);
    const errorText = result?.errors?.map((error) => error.message).join(', ');
    formMessage.textContent = errorText || 'There was a problem sending your message. Please try again.';
    formMessage.style.color = '#ff9d9d';
  } catch (error) {
    formMessage.textContent = 'There was a problem sending your message. Please try again.';
    formMessage.style.color = '#ff9d9d';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Request Plan';
  }
});
