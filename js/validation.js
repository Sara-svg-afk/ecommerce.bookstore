document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });
      if (valid) {
        showToast('Form submitted successfully');
        form.reset();
      }
    });
  });

  const passwordField = document.getElementById('password');
  const strengthBar = document.querySelector('.password-strength > div');
  if (passwordField && strengthBar) {
    passwordField.addEventListener('input', () => {
      const value = passwordField.value;
      let strength = 0;
      if (value.length >= 8) strength += 35;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/\d/.test(value)) strength += 20;
      if (/[^A-Za-z0-9]/.test(value)) strength += 20;
      strengthBar.style.width = `${Math.min(strength, 100)}%`;
    });
  }
});

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<strong>${message}</strong>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
