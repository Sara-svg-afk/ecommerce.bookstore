document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.move-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.wishlist-item')?.remove();
      showToast('Moved to cart');
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
