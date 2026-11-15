(function () {
  const ADMIN_KEY = 'pageturner_admin_session';
  const CATS_KEY = 'pageturner_categories';
  const CUST_KEY = 'pageturner_customers';
  const INV_KEY = 'pageturner_inventory';

  const sampleCustomers = [
    { name: 'Amelia R.', email: 'amelia@example.com', active: true },
    { name: 'Daniel K.', email: 'daniel@example.com', active: true },
  ];

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `<strong>${message}</strong>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
  function load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

  // Auth
  function login(email, password, remember) {
    // Mock credentials
    const ADMIN_EMAIL = 'admin@example.com';
    const ADMIN_PASS = 'AdminPass123';
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      const token = { email, loginAt: Date.now() };
      if (remember) localStorage.setItem(ADMIN_KEY, JSON.stringify(token)); else sessionStorage.setItem(ADMIN_KEY, JSON.stringify(token));
      showToast('Admin signed in');
      setTimeout(() => { window.location.href = 'admin-dashboard.html'; }, 500);
    } else {
      showToast('Invalid credentials');
    }
  }

  function logout() {
    localStorage.removeItem(ADMIN_KEY);
    sessionStorage.removeItem(ADMIN_KEY);
    showToast('Signed out');
    setTimeout(() => { window.location.href = 'admin-login.html'; }, 400);
  }

  function isAuthenticated() {
    return !!(localStorage.getItem(ADMIN_KEY) || sessionStorage.getItem(ADMIN_KEY));
  }

  // Categories
  function getCategories() { return load(CATS_KEY, ['Fiction','Non-Fiction','Children']); }
  function saveCategories(cats) { save(CATS_KEY, cats); }
  function addCategory(name) { const cats = getCategories(); cats.push(name); saveCategories(cats); renderCategories(); showToast('Category added'); updateStats(); }
  function deleteCategory(index) { const cats = getCategories(); cats.splice(index,1); saveCategories(cats); renderCategories(); showToast('Category removed'); updateStats(); }
  function renderCategories() {
    const list = document.getElementById('categoryList'); if (!list) return;
    const cats = getCategories(); list.innerHTML = '';
    cats.forEach((c, i) => {
      const li = document.createElement('li'); li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `<span>${c}</span><div><button class="btn btn-sm btn-outline-danger ms-2" data-i="${i}">Delete</button></div>`;
      list.appendChild(li);
    });
    list.querySelectorAll('button').forEach(b => b.addEventListener('click', (e) => deleteCategory(+e.target.dataset.i)));
  }

  // Customers
  function getCustomers() { return load(CUST_KEY, sampleCustomers); }
  function saveCustomers(c) { save(CUST_KEY, c); }
  function renderCustomers() {
    const tbody = document.getElementById('customerTable'); if (!tbody) return;
    const customers = getCustomers(); tbody.innerHTML = '';
    customers.forEach((c, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${c.name}</td><td>${c.email}</td><td><button class="btn btn-sm btn-outline-danger" data-i="${i}">Disable</button></td>`;
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll('button').forEach(b => b.addEventListener('click', (e) => { disableCustomer(+e.target.dataset.i); }));
  }
  function disableCustomer(index) { const customers = getCustomers(); customers[index].active = false; saveCustomers(customers); renderCustomers(); showToast('Customer disabled'); updateStats(); }

  // Inventory
  function getInventory() { return load(INV_KEY, window.bookstoreBooks || []); }
  function saveInventory(inv) { save(INV_KEY, inv); }
  function renderInventory() {
    const tbody = document.getElementById('inventoryTable'); if (!tbody) return;
    const inv = getInventory(); tbody.innerHTML = '';
    inv.forEach((b, i) => {
      const stock = b.stock ?? Math.floor(Math.random()*20)+1;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${b.title}</td><td>${stock}</td><td><button class="btn btn-sm btn-outline-primary" data-i="${i}">Adjust</button></td>`;
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll('button').forEach(b => b.addEventListener('click', (e) => { adjustStock(+e.target.dataset.i); }));
  }
  function adjustStock(index) {
    const inv = getInventory();
    const amount = prompt('Enter new stock quantity:', '10');
    if (amount !== null) {
      inv[index].stock = parseInt(amount,10) || 0; saveInventory(inv); renderInventory(); showToast('Stock updated');
    }
    updateStats();
  }

  function updateStats() {
    const books = getInventory().length; const cats = getCategories().length; const customers = getCustomers().length;
    document.getElementById('statBooks')?.textContent = books;
    document.getElementById('statCategories')?.textContent = cats;
    document.getElementById('statCustomers')?.textContent = customers;
  }

  // Protect dashboard
  document.addEventListener('DOMContentLoaded', () => {
    if (location.pathname.endsWith('admin-dashboard.html')) {
      if (!isAuthenticated()) { showToast('Please sign in'); setTimeout(() => { location.href = 'admin-login.html'; }, 600); return; }
      renderCategories(); renderCustomers(); renderInventory(); updateStats();
    }
  });

  window.Admin = { login, logout, addCategory, getCategories, getCustomers, getInventory };
})();
