// --------------------------
// Product Data
// --------------------------
const products = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 29.99,
    category: "men",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Soft, breathable cotton t-shirt perfect for everyday wear. Features a classic fit, crew neck, and durable fabric.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Blue", "Gray"],
    featured: true
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 49.99,
    category: "men",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Modern slim fit jeans made from stretch denim. Comfortable and stylish for any occasion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Gray"],
    featured: true
  },
  {
    id: 3,
    name: "Floral Summer Dress",
    price: 39.99,
    category: "women",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae468?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Lightweight floral dress with flowy fabric. Ideal for warm weather and casual outings.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Red", "Blue", "White"],
    featured: true
  },
  {
    id: 4,
    name: "Casual Hoodie",
    price: 44.99,
    category: "women",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Cozy and soft hoodie with kangaroo pocket. Perfect for layering or lounging.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Black", "Pink"],
    featured: false
  },
  {
    id: 5,
    name: "Kids Graphic T-Shirt",
    price: 19.99,
    category: "kids",
    image: "https://images.unsplash.com/photo-1519278409-1d010065c3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Fun and colorful graphic tee made from soft cotton. Machine washable and durable.",
    sizes: ["XS", "S", "M"],
    colors: ["Blue", "Red", "Green"],
    featured: true
  },
  {
    id: 6,
    name: "Kids Denim Jacket",
    price: 34.99,
    category: "kids",
    image: "https://images.unsplash.com/photo-1503919545889-da77a5d7c73d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Classic denim jacket with adjustable cuffs. Timeless style for growing kids.",
    sizes: ["S", "M", "L"],
    colors: ["Blue"],
    featured: false
  }
];

// --------------------------
// Cart Management
// --------------------------
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const countElements = document.querySelectorAll('#cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  countElements.forEach(el => el.textContent = totalItems);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product, size, color) {
  const existingItem = cart.find(item => 
    item.id === product.id && 
    item.size === size && 
    item.color === color
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      size,
      color,
      quantity: 1
    });
  }

  saveCart();
  alert('Product added to cart!');
}

// --------------------------
// Homepage
// --------------------------
if (document.getElementById('featured-products')) {
  const featuredProducts = products.filter(p => p.featured);
  const container = document.getElementById('featured-products');

  featuredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <a href="product.html?id=${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info-card">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>
      </a>
    `;
    container.appendChild(productCard);
  });

  // Newsletter subscription
  document.getElementById('subscribe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert('Thank you for subscribing!');
    this.reset();
  });
}

// --------------------------
// Shop Page
// --------------------------
if (document.getElementById('products-list')) {
  let filteredProducts = [...products];

  // Get category from URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    document.querySelector(`input[name="category"][value="${categoryParam}"]`).checked = true;
    filteredProducts = products.filter(p => p.category === categoryParam);
  }

  function renderProducts(productsToRender) {
    const container = document.getElementById('products-list');
    const noProducts = document.getElementById('no-products');
    container.innerHTML = '';

    if (productsToRender.length === 0) {
      noProducts.style.display = 'block';
      return;
    }

    noProducts.style.display = 'none';
    productsToRender.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <a href="product.html?id=${product.id}">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info-card">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$