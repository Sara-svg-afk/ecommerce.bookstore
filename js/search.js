document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('[data-search-input]');
  const searchButton = document.querySelector('[data-search-button]');
  const cards = document.querySelectorAll('.book-card');

  const filterBooks = () => {
    const term = (searchInput?.value || '').toLowerCase();
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(term) ? '' : 'none';
    });
  };

  searchInput?.addEventListener('input', filterBooks);
  searchButton?.addEventListener('click', filterBooks);
});
