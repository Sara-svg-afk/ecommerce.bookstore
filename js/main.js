document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const loader = document.getElementById('loadingOverlay');
  const scrollTop = document.getElementById('scrollTop');
  const navToggle = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', currentTheme);
      themeToggle.querySelector('i').className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
      showToast(currentTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
    });
  }

  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.style.opacity = '0', 300);
      setTimeout(() => loader.remove(), 700);
    });
  }

  window.addEventListener('scroll', () => {
    if (scrollTop) {
      scrollTop.classList.toggle('show', window.scrollY > 500);
    }
  });

  if (scrollTop) {
    scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  if (navToggle && navbarCollapse) {
    navToggle.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });
  }

  initTestimonials();
  initHeroSlider();
  initQuickView();
  initWishlistButtons();
  initAddToCartButtons();
  initCounters();
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

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  let activeIndex = 0;
  setInterval(() => {
    slides[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add('active');
  }, 5000);
}

function initTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  if (!testimonials.length) return;
  let index = 0;
  setInterval(() => {
    testimonials.forEach((item) => item.classList.add('d-none'));
    index = (index + 1) % testimonials.length;
    testimonials[index].classList.remove('d-none');
  }, 5000);
}

function initQuickView() {
  document.querySelectorAll('.quick-view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById('quickViewModal');
      if (modal) {
        modal.classList.add('show');
        showToast('Quick view opened');
      }
    });
  });
  const closeBtn = document.querySelector('.quick-view-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.getElementById('quickViewModal')?.classList.remove('show');
    });
  }
}

function initWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.querySelector('i').classList.toggle('fas');
      btn.querySelector('i').classList.toggle('far');
      showToast(btn.classList.contains('active') ? 'Added to wishlist' : 'Removed from wishlist');
    });
  });
}

function initAddToCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.add('btn-success');
      btn.innerHTML = '<i class="fas fa-check"></i> Added';
      showToast('Book added to cart');
      setTimeout(() => {
        btn.classList.remove('btn-success');
        btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
      }, 1500);
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach((counter) => {
    const target = +counter.dataset.count;
    const duration = 1200;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        counter.textContent = target + (counter.dataset.suffix || '');
        clearInterval(timer);
      } else {
        counter.textContent = start + (counter.dataset.suffix || '');
      }
    }, 16);
  });
}
