const yearNode = document.querySelector('#year');
const contactForm = document.querySelector('#contactForm');
const formMessage = document.querySelector('#formMessage');

yearNode.textContent = new Date().getFullYear();

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formMessage.textContent = 'Please complete all fields before submitting.';
    formMessage.style.color = '#ff9d9d';
    return;
  }

  const data = new FormData(contactForm);
  const name = data.get('name');
  formMessage.textContent = `Thanks, ${name}. Hermiora AI will contact you shortly.`;
  formMessage.style.color = '#9de1ad';
  contactForm.reset();
});
