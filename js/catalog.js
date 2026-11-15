document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('bookCatalog');
  if (!container || !window.bookstoreBooks) return;

  const renderBooks = (books) => {
    container.innerHTML = books.map((book) => `
      <article class="book-card">
        <div class="book-cover">
          ${book.badge ? `<span class="badge-discount">${book.badge}</span>` : ''}
          <button class="wishlist-btn"><i class="far fa-heart"></i></button>
          <img src="${book.image}" alt="${book.title}" />
        </div>
        <div class="book-info">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">${book.author}</p>
          <div class="book-meta"><span>${book.category}</span><span>★ ${book.rating}</span></div>
          <div class="price-row">
            <div><span class="price">Rs ${book.price.toFixed(2)}</span>${book.oldPrice ? `<span class="old-price">Rs ${book.oldPrice.toFixed(2)}</span>` : ''}</div>
            <button class="btn btn-primary add-to-cart"><i class="fas fa-shopping-cart"></i> Add</button>
          </div>
        </div>
      </article>
    `).join('');

    container.querySelectorAll('.book-card').forEach((card) => {
      card.querySelector('.add-to-cart')?.addEventListener('click', () => showToast('Added to cart'));
    });
  };

  renderBooks(window.bookstoreBooks.slice(0, 12));
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
