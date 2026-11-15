document.addEventListener('DOMContentLoaded', () => {
  const qtyButtons = document.querySelectorAll('.qty-control button');
  qtyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.parentElement.querySelector('input');
      let value = parseInt(input.value, 10) || 1;
      if (button.dataset.action === 'decrease' && value > 1) value -= 1;
      if (button.dataset.action === 'increase') value += 1;
      input.value = value;
    });
  });

  document.querySelectorAll('.remove-item').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      btn.closest('tr, .wishlist-item')?.remove();
      showToast('Item removed');
    });
  });
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
