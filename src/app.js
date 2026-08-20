// Lumina Skin - Pure Vanilla JS Application Core (Zero Libraries)
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS, INITIAL_USER } from './mockData.js';
import { getIcon } from './icons.js';

// Application State
export const state = {
  products: [...INITIAL_PRODUCTS],
  orders: [...INITIAL_ORDERS],
  reviews: [...INITIAL_REVIEWS],
  user: { ...INITIAL_USER },
  cart: [
    { ...INITIAL_PRODUCTS[0], quantity: 1 }
  ],
  wishlist: ['lumina-02'],
  
  // Navigation State
  currentView: 'home', // 'home' | 'shop' | 'product-detail' | 'cart' | 'checkout' | 'sanctuary' | 'admin' | 'auth'
  selectedProductId: null,
  sanctuaryTab: 'orders', // 'orders' | 'wishlist' | 'reviews' | 'profile'
  adminTab: 'overview', // 'overview' | 'products' | 'orders'
  
  // Filter States
  searchQuery: '',
  selectedCategory: 'All',
  selectedSkinType: 'All',
  sortBy: 'featured',
  
  // Cart & UI State
  isCartDrawerOpen: false,
  isSkinQuizOpen: false,
  isInvoiceOpen: false,
  isAddProductOpen: false,
  activeInvoiceOrder: null,
  appliedPromo: null,
  
  // Quiz State
  quizStep: 1,
  quizAnswers: {},
  quizResult: null
};

// State Helpers
export function setState(updater) {
  if (typeof updater === 'function') {
    updater(state);
  } else {
    Object.assign(state, updater);
  }
  render();
}

export function showToast(message, icon = 'sparkles') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${getIcon(icon)} <span>${message}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// Cart Calculations
export function getCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = state.appliedPromo === 'LUMINA10' ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discount + shipping);
  return { subtotal, discount, shipping, total };
}

// Global Actions
window.app = {
  navigate(view, productId = null) {
    state.currentView = view;
    if (productId) state.selectedProductId = productId;
    state.isCartDrawerOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
  },
  
  setSanctuaryTab(tab) {
    state.sanctuaryTab = tab;
    render();
  },
  
  setAdminTab(tab) {
    state.adminTab = tab;
    render();
  },
  
  toggleCartDrawer(open) {
    state.isCartDrawerOpen = typeof open === 'boolean' ? open : !state.isCartDrawerOpen;
    render();
  },
  
  addToCart(productId, quantity = 1) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      state.cart.push({ ...product, quantity });
    }
    
    showToast(`Added "${product.name}" to your bag`, 'shoppingBag');
    state.isCartDrawerOpen = true;
    render();
  },
  
  updateCartQuantity(productId, delta) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      state.cart = state.cart.filter(i => i.id !== productId);
    }
    render();
  },
  
  removeFromCart(productId) {
    state.cart = state.cart.filter(i => i.id !== productId);
    render();
  },
  
  toggleWishlist(productId) {
    if (state.wishlist.includes(productId)) {
      state.wishlist = state.wishlist.filter(id => id !== productId);
      showToast('Removed from Ritual Wishlist', 'heart');
    } else {
      state.wishlist.push(productId);
      showToast('Saved to Ritual Wishlist', 'heartFilled');
    }
    render();
  },
  
  applyPromo(code) {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'LUMINA10') {
      state.appliedPromo = 'LUMINA10';
      showToast('10% Botanical Privilege applied!', 'sparkles');
    } else {
      showToast('Invalid promotion code. Try "LUMINA10"', 'x');
    }
    render();
  },
  
  openInvoice(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      state.activeInvoiceOrder = order;
      state.isInvoiceOpen = true;
      render();
    }
  },
  
  closeInvoice() {
    state.isInvoiceOpen = false;
    render();
  },
  
  printInvoice() {
    window.print();
  },
  
  openSkinQuiz() {
    state.quizStep = 1;
    state.quizAnswers = {};
    state.quizResult = null;
    state.isSkinQuizOpen = true;
    render();
  },
  
  closeSkinQuiz() {
    state.isSkinQuizOpen = false;
    render();
  },
  
  answerQuiz(questionKey, value) {
    state.quizAnswers[questionKey] = value;
    if (state.quizStep < 3) {
      state.quizStep += 1;
    } else {
      // Calculate result
      const feeling = state.quizAnswers['feeling'] || 'dry';
      let recommendedProduct = state.products[0];
      let regimenTitle = 'Cellular Lipid Restoration Sequence';
      let routineNotes = 'Focus on overnight hydration and peptide barrier repair.';
      
      if (feeling === 'oily') {
        recommendedProduct = state.products.find(p => p.category === 'Toners') || state.products[3];
        regimenTitle = 'Clarifying Botanical Pore Balance';
        routineNotes = 'Use gentle willow bark BHA tonics and oil-free hydration.';
      } else if (feeling === 'combo') {
        recommendedProduct = state.products.find(p => p.category === 'Moisturizers') || state.products[1];
        regimenTitle = 'Harmonizing Micro-Algae Cloud Ritual';
        routineNotes = 'Target T-zone with light fluid and cheeks with rich peptides.';
      }
      
      state.quizResult = {
        title: regimenTitle,
        routineNotes,
        product: recommendedProduct
      };
      state.quizStep = 4; // Result screen
    }
    render();
  },
  
  submitCheckout(formData) {
    const { subtotal, discount, shipping, total } = getCartTotals();
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      status: 'Processing',
      total,
      subtotal,
      discount,
      shippingCost: shipping,
      shippingAddress: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        country: formData.country || 'United States'
      },
      items: state.cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.images[0],
        size: item.size
      }))
    };
    
    state.orders.unshift(newOrder);
    state.cart = [];
    state.appliedPromo = null;
    showToast('Your botanical order has been confirmed!', 'check');
    state.activeInvoiceOrder = newOrder;
    state.isInvoiceOpen = true;
    state.currentView = 'sanctuary';
    state.sanctuaryTab = 'orders';
    render();
  },
  
  // Admin Operations
  updateProductStock(productId, newStock) {
    const product = state.products.find(p => p.id === productId);
    if (product) {
      product.stock = parseInt(newStock, 10) || 0;
      product.isLowStock = product.stock < 10;
      showToast(`Stock updated for ${product.name}`, 'check');
      render();
    }
  },
  
  deleteProduct(productId) {
    if (confirm('Are you sure you want to remove this formulation from the catalog?')) {
      state.products = state.products.filter(p => p.id !== productId);
      showToast('Formulation removed', 'trash');
      render();
    }
  },
  
  openAddProductModal() {
    state.isAddProductOpen = true;
    render();
  },
  
  closeAddProductModal() {
    state.isAddProductOpen = false;
    render();
  },
  
  createProduct(formData) {
    const newProduct = {
      id: `lumina-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      subtitle: formData.subtitle || 'Active Botanical Complex',
      sku: `LUM-${formData.category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      category: formData.category,
      price: parseFloat(formData.price) || 50,
      stock: parseInt(formData.stock, 10) || 20,
      isLowStock: (parseInt(formData.stock, 10) || 20) < 10,
      rating: 5.0,
      reviewsCount: 1,
      size: formData.size || '50ml / 1.7 fl. oz.',
      keyBotanicals: formData.keyBotanicals || 'Rare Botanical Extracts',
      images: [formData.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],
      description: formData.description || 'A pure botanical formulation.',
      skinTypes: ['All Skin Types'],
      benefits: ['Deep nourishment', 'Restores natural barrier', 'Imparts luminous glow'],
      ingredients: ['Aqua', 'Botanical Extracts', 'Vitamin E'],
      isFeatured: true
    };
    
    state.products.unshift(newProduct);
    state.isAddProductOpen = false;
    showToast(`Formulation "${newProduct.name}" created!`, 'sparkles');
    render();
  },
  
  updateOrderStatus(orderId, status) {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      showToast(`Order ${orderId} marked as ${status}`, 'package');
      render();
    }
  },
  
  approveReview(reviewId) {
    const review = state.reviews.find(r => r.id === reviewId);
    if (review) {
      review.status = 'Published';
      showToast('Review approved and published to ritual feed', 'check');
      render();
    }
  },
  
  rejectReview(reviewId) {
    state.reviews = state.reviews.filter(r => r.id !== reviewId);
    showToast('Review rejected', 'trash');
    render();
  }
};

// UI Rendering Functions
function renderHeader() {
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = state.wishlist.length;
  
  return `
    <header class="site-header">
      <div class="container header-inner">
        <div class="flex items-center gap-6">
          <a href="#" onclick="app.navigate('home'); return false;" class="brand-logo">LUMINA</a>
          <nav class="nav-links">
            <a href="#" onclick="app.navigate('home'); return false;" class="nav-link ${state.currentView === 'home' ? 'active' : ''}">Sanctuary</a>
            <a href="#" onclick="app.navigate('shop'); return false;" class="nav-link ${state.currentView === 'shop' ? 'active' : ''}">Formulations</a>
            <a href="#" onclick="app.navigate('sanctuary'); return false;" class="nav-link ${state.currentView === 'sanctuary' ? 'active' : ''}">My Ritual</a>
            <a href="#" onclick="app.navigate('admin'); return false;" class="nav-link ${state.currentView === 'admin' ? 'active' : ''}">Portal Admin</a>
          </nav>
        </div>
        
        <div class="header-actions">
          <button class="btn btn-outline btn-sm" onclick="app.openSkinQuiz()">
            ${getIcon('sparkles')} <span>Skin Quiz</span>
          </button>
          
          <button class="btn btn-icon icon-btn-badge" onclick="app.navigate('sanctuary'); app.setSanctuaryTab('wishlist');" title="Wishlist">
            ${getIcon('heart')}
            ${wishlistCount > 0 ? `<span class="badge-count">${wishlistCount}</span>` : ''}
          </button>
          
          <button class="btn btn-icon icon-btn-badge" onclick="app.toggleCartDrawer(true)" title="Bag">
            ${getIcon('shoppingBag')}
            ${cartCount > 0 ? `<span class="badge-count">${cartCount}</span>` : ''}
          </button>
          
          <button class="btn btn-icon" onclick="app.navigate('auth')" title="Account">
            ${getIcon('user')}
          </button>
        </div>
      </div>
    </header>
  `;
}

function renderHero() {
  return `
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="flex flex-col gap-4">
          <div class="badge badge-primary" style="width: fit-content;">
            ${getIcon('sparkles')} Certified Botanical Chemistry
          </div>
          <h1 class="font-serif text-5xl font-bold" style="line-height: 1.15; color: #1c1b1b;">
            Purity in every drop. Radiance in every ritual.
          </h1>
          <p class="text-muted text-lg" style="max-width: 520px;">
            Harnessing ultra-potent wild-harvested botanicals and bio-fermented peptides to restore skin cellular vitality and peaceful radiance.
          </p>
          <div class="flex gap-3" style="margin-top: 12px;">
            <button class="btn btn-primary btn-lg" onclick="app.navigate('shop')">
              Explore Formulations ${getIcon('arrowRight')}
            </button>
            <button class="btn btn-outline btn-lg" onclick="app.openSkinQuiz()">
              Take Diagnostic Quiz
            </button>
          </div>
          
          <div class="flex items-center gap-6" style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border);">
            <div>
              <div class="font-serif text-2xl font-bold text-dark">100%</div>
              <div class="text-xs text-muted">Wild Harvested</div>
            </div>
            <div style="width: 1px; height: 32px; background: var(--border);"></div>
            <div>
              <div class="font-serif text-2xl font-bold text-dark">5.5 pH</div>
              <div class="text-xs text-muted">Barrier Balance</div>
            </div>
            <div style="width: 1px; height: 32px; background: var(--border);"></div>
            <div>
              <div class="font-serif text-2xl font-bold text-dark">0%</div>
              <div class="text-xs text-muted">Synthetic Fragrance</div>
            </div>
          </div>
        </div>
        
        <div class="hero-image-wrap">
          <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80" alt="Lumina Skin Sanctuary" />
          <div class="hero-badge-float">
            <div class="text-xs text-muted uppercase tracking-wider">Featured Elixir</div>
            <div class="font-serif font-bold text-dark text-sm" style="margin: 2px 0;">Midnight Recovery Elixir</div>
            <div class="text-xs text-emerald font-semibold">Awarded Best Overnight Oil 2026</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderProductCard(product) {
  const isWishlisted = state.wishlist.includes(product.id);
  return `
    <div class="product-card">
      <div class="product-card-img-wrap">
        <img src="${product.images[0]}" alt="${product.name}" onclick="app.navigate('product-detail', '${product.id}')" style="cursor: pointer;" />
        <button class="wishlist-btn-float ${isWishlisted ? 'active' : ''}" onclick="app.toggleWishlist('${product.id}')" title="Wishlist">
          ${getIcon(isWishlisted ? 'heartFilled' : 'heart')}
        </button>
        ${product.isLowStock ? `<span class="badge badge-warning" style="position: absolute; bottom: 12px; left: 12px;">Only ${product.stock} Left</span>` : ''}
      </div>
      
      <div class="product-card-body">
        <div>
          <div class="flex items-center justify-between" style="margin-bottom: 6px;">
            <span class="text-xs uppercase text-muted font-medium">${product.category}</span>
            <div class="flex items-center gap-1 text-xs text-amber font-semibold">
              ${getIcon('star')} <span>${product.rating}</span>
            </div>
          </div>
          <h3 class="font-serif font-bold text-base text-dark" style="cursor: pointer; line-height: 1.3;" onclick="app.navigate('product-detail', '${product.id}')">
            ${product.name}
          </h3>
          <p class="text-xs text-muted" style="margin: 4px 0 12px; line-height: 1.4;">
            ${product.keyBotanicals}
          </p>
        </div>
        
        <div class="flex items-center justify-between" style="padding-top: 12px; border-top: 1px solid var(--border);">
          <div class="font-serif font-bold text-lg text-dark">$${product.price.toFixed(2)}</div>
          <button class="btn btn-primary btn-sm" onclick="app.addToCart('${product.id}')">
            ${getIcon('plus')} <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderHome() {
  const featured = state.products.slice(0, 3);
  return `
    ${renderHero()}
    
    <section style="padding: 64px 0;">
      <div class="container">
        <div class="flex justify-between items-end" style="margin-bottom: 32px;">
          <div>
            <span class="badge badge-primary">Curated Selections</span>
            <h2 class="font-serif text-3xl font-bold" style="margin-top: 8px;">Signature Formulations</h2>
          </div>
          <button class="btn btn-outline" onclick="app.navigate('shop')">
            View All (${state.products.length}) ${getIcon('arrowRight')}
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${featured.map(renderProductCard).join('')}
        </div>
      </div>
    </section>
    
    <section style="background-color: #181d18; color: #ffffff; padding: 72px 0;">
      <div class="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <span class="badge badge-dark" style="color: #9db49b;">Sanctuary Philosophy</span>
          <h2 class="font-serif text-3xl font-bold" style="margin: 12px 0 16px; color: #ffffff;">
            Formulated without compromise. Designed for cellular tranquility.
          </h2>
          <p style="color: #a6b2a5; margin-bottom: 24px; line-height: 1.7;">
            We believe true beauty arises when scientific rigor meets pure botanical energy. Every Lumina formula is brewed in small micro-batches with biocompatible lipid carriers.
          </p>
          <div class="grid grid-cols-2 gap-4">
            <div style="background: #222922; padding: 16px; border-radius: var(--radius-md); border: 1px solid #2f3b2f;">
              <div class="font-serif text-lg font-bold" style="color: #ffffff;">Bio-Peptides</div>
              <div class="text-xs" style="color: #8fa08e; margin-top: 4px;">Cellular signaling for collagen synthesis.</div>
            </div>
            <div style="background: #222922; padding: 16px; border-radius: var(--radius-md); border: 1px solid #2f3b2f;">
              <div class="font-serif text-lg font-bold" style="color: #ffffff;">Cold Extraction</div>
              <div class="text-xs" style="color: #8fa08e; margin-top: 4px;">Preserving 99.4% antioxidant potency.</div>
            </div>
          </div>
        </div>
        
        <div style="border-radius: 20px; overflow: hidden; box-shadow: var(--shadow-lg);">
          <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80" alt="Botanical Science" />
        </div>
      </div>
    </section>
    
    <section style="padding: 64px 0; background-color: #fcf9f8;">
      <div class="container">
        <div class="text-center" style="max-width: 600px; margin: 0 auto 40px;">
          <span class="badge badge-primary">Ritual Reflections</span>
          <h2 class="font-serif text-3xl font-bold" style="margin-top: 8px;">From Our Sanctuary Community</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${state.reviews.slice(0, 2).map(review => `
            <div class="card">
              <div class="flex items-center gap-1 text-amber" style="margin-bottom: 12px;">
                ${Array(review.rating).fill(getIcon('star')).join('')}
              </div>
              <p class="text-dark" style="font-style: italic; line-height: 1.6; margin-bottom: 16px;">
                "${review.comment}"
              </p>
              <div class="flex items-center justify-between" style="padding-top: 12px; border-top: 1px solid var(--border);">
                <div>
                  <div class="font-semibold text-sm text-dark">${review.author}</div>
                  <div class="text-xs text-muted">${review.productName}</div>
                </div>
                <span class="badge badge-success">${getIcon('check')} Verified Buyer</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderShop() {
  const categories = ['All', 'Serums', 'Moisturizers', 'Cleansers', 'Toners', 'Masks & Treatments'];
  const skinTypes = ['All', 'Dry', 'Oily', 'Sensitive', 'Combination'];
  
  let filtered = state.products.filter(p => {
    const matchCat = state.selectedCategory === 'All' || p.category === state.selectedCategory;
    const matchSkin = state.selectedSkinType === 'All' || (p.skinTypes && p.skinTypes.includes(state.selectedSkinType));
    const matchSearch = !state.searchQuery || p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || p.keyBotanicals.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchCat && matchSkin && matchSearch;
  });
  
  if (state.sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (state.sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (state.sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  
  return `
    <div style="padding: 48px 0;">
      <div class="container">
        <div style="margin-bottom: 32px;">
          <h1 class="font-serif text-4xl font-bold">Botanical Formulations</h1>
          <p class="text-muted" style="margin-top: 6px;">Clinical botanical concentrates designed for targeted barrier harmony.</p>
        </div>
        
        <!-- Filters Bar -->
        <div class="card" style="margin-bottom: 32px; padding: 20px;">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div style="position: relative;">
              <input 
                type="text" 
                class="form-input" 
                placeholder="Search botanicals, oils, serums..." 
                value="${state.searchQuery}"
                oninput="state.searchQuery = this.value; render();"
              />
            </div>
            
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-muted">Category:</span>
              <select class="form-select" onchange="state.selectedCategory = this.value; render();">
                ${categories.map(c => `<option value="${c}" ${state.selectedCategory === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>
            
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-muted">Sort By:</span>
              <select class="form-select" onchange="state.sortBy = this.value; render();">
                <option value="featured" ${state.sortBy === 'featured' ? 'selected' : ''}>Signature Order</option>
                <option value="price-low" ${state.sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-high" ${state.sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                <option value="rating" ${state.sortBy === 'rating' ? 'selected' : ''}>Highest Rated</option>
              </select>
            </div>
          </div>
          
          <div class="flex items-center gap-2" style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); flex-wrap: wrap;">
            <span class="text-xs font-semibold text-muted">Skin Type:</span>
            ${skinTypes.map(t => `
              <button 
                class="badge ${state.selectedSkinType === t ? 'badge-primary' : 'badge-dark'}" 
                style="cursor: pointer;"
                onclick="state.selectedSkinType = '${t}'; render();"
              >
                ${t}
              </button>
            `).join('')}
          </div>
        </div>
        
        <!-- Results Grid -->
        <div class="flex justify-between items-center" style="margin-bottom: 20px;">
          <div class="text-xs text-muted font-medium">Showing ${filtered.length} formulations</div>
        </div>
        
        ${filtered.length === 0 ? `
          <div class="card text-center" style="padding: 60px 20px;">
            <div class="font-serif text-2xl font-bold">No formulations found</div>
            <p class="text-muted" style="margin-top: 8px;">Try clearing filters or adjusting your search term.</p>
            <button class="btn btn-primary" style="margin-top: 16px;" onclick="state.searchQuery = ''; state.selectedCategory = 'All'; state.selectedSkinType = 'All'; render();">
              Reset Filters
            </button>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${filtered.map(renderProductCard).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

function renderProductDetail() {
  const product = state.products.find(p => p.id === state.selectedProductId) || state.products[0];
  const isWishlisted = state.wishlist.includes(product.id);
  
  return `
    <div style="padding: 48px 0;">
      <div class="container">
        <button class="btn btn-outline btn-sm" style="margin-bottom: 24px;" onclick="app.navigate('shop')">
          ${getIcon('arrowLeft')} Back to Catalog
        </button>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Images -->
          <div>
            <div style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); aspect-ratio: 1/1; background: #f6f3f0;">
              <img src="${product.images[0]}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
          </div>
          
          <!-- Details -->
          <div class="flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between" style="margin-bottom: 8px;">
                <span class="badge badge-primary">${product.category}</span>
                <div class="flex items-center gap-1 text-xs text-amber font-semibold">
                  ${getIcon('star')} <span>${product.rating} (${product.reviewsCount} ritual reviews)</span>
                </div>
              </div>
              
              <h1 class="font-serif text-3xl font-bold text-dark">${product.name}</h1>
              <div class="text-sm text-primary font-medium" style="margin: 4px 0 16px;">${product.subtitle}</div>
              
              <div class="font-serif text-3xl font-bold text-dark" style="margin-bottom: 16px;">$${product.price.toFixed(2)}</div>
              
              <p class="text-muted" style="line-height: 1.7; margin-bottom: 20px;">${product.description}</p>
              
              <div class="card-sm" style="margin-bottom: 20px; background: #fcf9f8;">
                <div class="text-xs font-semibold text-muted uppercase">Key Botanicals</div>
                <div class="text-sm font-medium text-dark" style="margin-top: 4px;">${product.keyBotanicals}</div>
                <div class="text-xs text-muted" style="margin-top: 4px;">Size: ${product.size}</div>
              </div>
              
              <!-- Benefits -->
              <div style="margin-bottom: 24px;">
                <div class="text-xs font-bold uppercase text-dark" style="margin-bottom: 8px;">Clinical Benefits</div>
                <div class="flex flex-col gap-2">
                  ${product.benefits ? product.benefits.map(b => `
                    <div class="flex items-center gap-2 text-sm text-muted">
                      <span class="text-emerald">${getIcon('check')}</span>
                      <span>${b}</span>
                    </div>
                  `).join('') : ''}
                </div>
              </div>
            </div>
            
            <div class="flex gap-3" style="padding-top: 20px; border-top: 1px solid var(--border);">
              <button class="btn btn-primary btn-lg flex-1" onclick="app.addToCart('${product.id}')">
                ${getIcon('shoppingBag')} Add to Bag • $${product.price.toFixed(2)}
              </button>
              <button class="btn btn-outline btn-lg" onclick="app.toggleWishlist('${product.id}')" title="Wishlist">
                ${getIcon(isWishlisted ? 'heartFilled' : 'heart')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSanctuary() {
  const tabs = [
    { id: 'orders', label: 'My Orders', icon: 'package' },
    { id: 'wishlist', label: 'Ritual Wishlist', icon: 'heart' },
    { id: 'reviews', label: 'My Reflections', icon: 'star' },
    { id: 'profile', label: 'Skin Bio & Profile', icon: 'user' }
  ];
  
  return `
    <div style="padding: 48px 0;">
      <div class="container">
        <!-- Customer Banner -->
        <div class="card flex items-center justify-between flex-wrap gap-4" style="margin-bottom: 32px; background: linear-gradient(135deg, #181d18 0%, #293429 100%); color: #ffffff;">
          <div class="flex items-center gap-4">
            <img src="${state.user.avatar}" alt="${state.user.name}" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid #516050;" />
            <div>
              <span class="badge badge-dark" style="color: #9db49b;">${state.user.membershipTier}</span>
              <h2 class="font-serif text-2xl font-bold" style="margin-top: 4px; color: #ffffff;">Welcome, ${state.user.firstName}</h2>
              <div class="text-xs" style="color: #a6b2a5;">Member since March 2025 • Seattle, WA</div>
            </div>
          </div>
          <button class="btn btn-subtle btn-sm" onclick="app.openSkinQuiz()">
            ${getIcon('sparkles')} Retake Skin Diagnostic
          </button>
        </div>
        
        <!-- Navigation Tabs -->
        <div class="flex gap-2" style="margin-bottom: 24px; border-bottom: 1px solid var(--border); padding-bottom: 12px; overflow-x: auto;">
          ${tabs.map(t => `
            <button 
              class="btn ${state.sanctuaryTab === t.id ? 'btn-primary' : 'btn-outline'}" 
              onclick="app.setSanctuaryTab('${t.id}')"
            >
              ${getIcon(t.icon)} <span>${t.label}</span>
            </button>
          `).join('')}
        </div>
        
        <!-- Tab Content -->
        ${state.sanctuaryTab === 'orders' ? `
          <div class="flex flex-col gap-4">
            ${state.orders.length === 0 ? `
              <div class="card text-center" style="padding: 48px 20px;">
                <div class="font-serif text-xl font-bold">No orders placed yet</div>
                <p class="text-muted" style="margin-top: 6px;">Begin your botanical ritual by exploring our active catalog.</p>
                <button class="btn btn-primary" style="margin-top: 16px;" onclick="app.navigate('shop')">Explore Formulations</button>
              </div>
            ` : state.orders.map(order => `
              <div class="card">
                <div class="flex justify-between items-center flex-wrap gap-2" style="padding-bottom: 16px; border-bottom: 1px solid var(--border);">
                  <div>
                    <div class="font-serif font-bold text-lg text-dark">Order #${order.id}</div>
                    <div class="text-xs text-muted">Placed on ${order.date}</div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="badge ${order.status === 'Delivered' ? 'badge-success' : 'badge-primary'}">${order.status}</span>
                    <button class="btn btn-outline btn-sm" onclick="app.openInvoice('${order.id}')">
                      ${getIcon('printer')} View Invoice
                    </button>
                  </div>
                </div>
                
                <div class="flex flex-col gap-3" style="padding: 16px 0;">
                  ${order.items.map(item => `
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <img src="${item.image}" alt="${item.name}" style="width: 48px; height: 48px; border-radius: var(--radius-sm); object-fit: cover;" />
                        <div>
                          <div class="font-semibold text-sm text-dark">${item.name}</div>
                          <div class="text-xs text-muted">Qty: ${item.quantity} • ${item.size || '30ml'}</div>
                        </div>
                      </div>
                      <div class="font-serif font-bold text-sm text-dark">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  `).join('')}
                </div>
                
                <div class="flex justify-between items-center" style="padding-top: 12px; border-top: 1px solid var(--border);">
                  <div class="text-xs text-muted">Shipping to: ${order.shippingAddress.city}, ${order.shippingAddress.state}</div>
                  <div class="font-serif font-bold text-base text-dark">Total: $${order.total.toFixed(2)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${state.sanctuaryTab === 'wishlist' ? `
          <div>
            ${state.wishlist.length === 0 ? `
              <div class="card text-center" style="padding: 48px 20px;">
                <div class="font-serif text-xl font-bold">Your wishlist is currently empty</div>
                <p class="text-muted" style="margin-top: 6px;">Save your desired botanical elixirs to review them anytime.</p>
                <button class="btn btn-primary" style="margin-top: 16px;" onclick="app.navigate('shop')">Explore Shop</button>
              </div>
            ` : `
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${state.wishlist.map(id => {
                  const product = state.products.find(p => p.id === id);
                  if (!product) return '';
                  return `
                    <div class="card flex flex-col justify-between">
                      <div class="flex gap-4">
                        <img src="${product.images[0]}" alt="${product.name}" style="width: 80px; height: 80px; border-radius: var(--radius-sm); object-fit: cover;" />
                        <div>
                          <div class="font-serif font-bold text-sm text-dark">${product.name}</div>
                          <div class="font-serif font-bold text-primary" style="margin-top: 4px;">$${product.price.toFixed(2)}</div>
                          <div class="text-xs text-muted">${product.size}</div>
                        </div>
                      </div>
                      <div class="flex gap-2" style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border);">
                        <button class="btn btn-primary btn-sm flex-1" onclick="app.addToCart('${product.id}')">
                          Add to Bag
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="app.toggleWishlist('${product.id}')">
                          Remove
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>
        ` : ''}
        
        ${state.sanctuaryTab === 'reviews' ? `
          <div class="flex flex-col gap-4">
            ${state.reviews.map(r => `
              <div class="card">
                <div class="flex items-center justify-between" style="margin-bottom: 8px;">
                  <div class="font-semibold text-sm text-dark">${r.productName}</div>
                  <span class="badge ${r.status === 'Published' ? 'badge-success' : 'badge-warning'}">${r.status}</span>
                </div>
                <div class="flex text-amber" style="margin-bottom: 8px;">
                  ${Array(r.rating).fill(getIcon('star')).join('')}
                </div>
                <p class="text-sm text-muted">"${r.comment}"</p>
                <div class="text-xs text-muted" style="margin-top: 8px;">Submitted ${r.date}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${state.sanctuaryTab === 'profile' ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card">
              <h3 class="font-serif text-lg font-bold" style="margin-bottom: 16px;">Personal Information</h3>
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" value="${state.user.name}" readonly />
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-input" value="${state.user.email}" readonly />
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="text" class="form-input" value="${state.user.phone}" readonly />
              </div>
            </div>
            
            <div class="card">
              <h3 class="font-serif text-lg font-bold" style="margin-bottom: 16px;">Skin Profile & Bio</h3>
              <div class="card-sm" style="background: #fcf9f8; margin-bottom: 16px;">
                <div class="text-xs text-muted font-bold uppercase">Diagnosed Skin Type</div>
                <div class="font-semibold text-dark text-base" style="margin-top: 4px;">${state.user.skinProfile.type}</div>
                <div class="text-xs text-primary" style="margin-top: 4px;">Focus: ${state.user.skinProfile.focus}</div>
              </div>
              <div class="text-xs font-semibold text-muted uppercase" style="margin-bottom: 6px;">Active Concerns</div>
              <div class="flex gap-2 flex-wrap" style="margin-bottom: 16px;">
                ${state.user.skinProfile.concerns.map(c => `<span class="badge badge-primary">${c}</span>`).join('')}
              </div>
              <button class="btn btn-outline btn-full" onclick="app.openSkinQuiz()">
                ${getIcon('sparkles')} Update Diagnostic Quiz
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderAdmin() {
  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: 'dashboard' },
    { id: 'products', label: 'Inventory & Formulations', icon: 'package' },
    { id: 'orders', label: 'Orders & Moderation', icon: 'shield' }
  ];
  
  const totalRevenue = state.orders.reduce((sum, o) => sum + o.total, 0);
  const totalStock = state.products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = state.products.filter(p => p.isLowStock).length;
  
  return `
    <div style="padding: 32px 0;">
      <div class="container">
        <!-- Admin Top Bar -->
        <div class="flex justify-between items-center flex-wrap gap-4" style="margin-bottom: 24px;">
          <div>
            <span class="badge badge-dark">Lumina Brand Administration</span>
            <h1 class="font-serif text-3xl font-bold" style="margin-top: 4px;">Sanctuary Operations Suite</h1>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-primary" onclick="app.openAddProductModal()">
              ${getIcon('plus')} Add New Formulation
            </button>
            <button class="btn btn-outline" onclick="app.navigate('home')">
              View Public Sanctuary
            </button>
          </div>
        </div>
        
        <!-- Tabs -->
        <div class="flex gap-2" style="margin-bottom: 24px; border-bottom: 1px solid var(--border); padding-bottom: 12px;">
          ${tabs.map(t => `
            <button 
              class="btn ${state.adminTab === t.id ? 'btn-primary' : 'btn-outline'}" 
              onclick="app.setAdminTab('${t.id}')"
            >
              ${getIcon(t.icon)} <span>${t.label}</span>
            </button>
          `).join('')}
        </div>
        
        <!-- Overview Tab -->
        ${state.adminTab === 'overview' ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style="margin-bottom: 24px;">
            <div class="card">
              <div class="text-xs text-muted uppercase font-semibold">Total Revenue</div>
              <div class="font-serif text-2xl font-bold text-dark" style="margin-top: 4px;">$${totalRevenue.toFixed(2)}</div>
              <div class="text-xs text-emerald font-semibold" style="margin-top: 4px;">+18.4% vs last month</div>
            </div>
            <div class="card">
              <div class="text-xs text-muted uppercase font-semibold">Active Formulations</div>
              <div class="font-serif text-2xl font-bold text-dark" style="margin-top: 4px;">${state.products.length}</div>
              <div class="text-xs text-muted" style="margin-top: 4px;">Across 5 categories</div>
            </div>
            <div class="card">
              <div class="text-xs text-muted uppercase font-semibold">Total Warehouse Units</div>
              <div class="font-serif text-2xl font-bold text-dark" style="margin-top: 4px;">${totalStock} Units</div>
              <div class="text-xs ${lowStockCount > 0 ? 'text-amber' : 'text-emerald'} font-semibold" style="margin-top: 4px;">
                ${lowStockCount} Low stock alerts
              </div>
            </div>
            <div class="card">
              <div class="text-xs text-muted uppercase font-semibold">Total Orders Processed</div>
              <div class="font-serif text-2xl font-bold text-dark" style="margin-top: 4px;">${state.orders.length}</div>
              <div class="text-xs text-muted" style="margin-top: 4px;">100% fulfillment rate</div>
            </div>
          </div>
          
          <div class="card" style="margin-bottom: 24px;">
            <h3 class="font-serif text-lg font-bold" style="margin-bottom: 16px;">Monthly Revenue Trajectory</h3>
            <!-- SVG Chart -->
            <div style="height: 180px; width: 100%;">
              <svg viewBox="0 0 500 150" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#516050" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#516050" stop-opacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0,130 Q100,90 200,100 T400,40 T500,20 L500,150 L0,150 Z" fill="url(#grad)" />
                <path d="M0,130 Q100,90 200,100 T400,40 T500,20" fill="none" stroke="#516050" stroke-width="3" />
                <circle cx="500" cy="20" r="5" fill="#516050" />
              </svg>
            </div>
            <div class="flex justify-between text-xs text-muted" style="margin-top: 8px;">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun (Current)</span>
            </div>
          </div>
        ` : ''}
        
        <!-- Products Tab -->
        ${state.adminTab === 'products' ? `
          <div class="data-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Formulation</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock Count</th>
                  <th>Status</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${state.products.map(p => `
                  <tr>
                    <td>
                      <div class="flex items-center gap-3">
                        <img src="${p.images[0]}" alt="${p.name}" style="width: 40px; height: 40px; border-radius: var(--radius-sm); object-fit: cover;" />
                        <div>
                          <div class="font-semibold text-dark">${p.name}</div>
                          <div class="text-xs text-muted">SKU: ${p.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td><span class="badge badge-primary">${p.category}</span></td>
                    <td class="font-semibold text-dark">$${p.price.toFixed(2)}</td>
                    <td>
                      <input 
                        type="number" 
                        value="${p.stock}" 
                        min="0" 
                        class="form-input" 
                        style="width: 80px; padding: 4px 8px;"
                        onchange="app.updateProductStock('${p.id}', this.value)"
                      />
                    </td>
                    <td>
                      <span class="badge ${p.stock < 10 ? 'badge-warning' : 'badge-success'}">
                        ${p.stock < 10 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td style="text-align: right;">
                      <button class="btn btn-outline btn-sm text-red" onclick="app.deleteProduct('${p.id}')">
                        ${getIcon('trash')}
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}
        
        <!-- Orders Tab -->
        ${state.adminTab === 'orders' ? `
          <div class="flex flex-col gap-6">
            <div>
              <h3 class="font-serif text-lg font-bold" style="margin-bottom: 12px;">Customer Orders</h3>
              <div class="data-table-wrap">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${state.orders.map(o => `
                      <tr>
                        <td class="font-bold text-dark">${o.id}</td>
                        <td>
                          <div>${o.customerName}</div>
                          <div class="text-xs text-muted">${o.customerEmail}</div>
                        </td>
                        <td>${o.date}</td>
                        <td>${o.items.length} Formulations</td>
                        <td class="font-serif font-bold text-dark">$${o.total.toFixed(2)}</td>
                        <td>
                          <select class="form-select" style="padding: 4px 8px; font-size: 0.75rem;" onchange="app.updateOrderStatus('${o.id}', this.value)">
                            <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="Completed" ${o.status === 'Completed' ? 'selected' : ''}>Completed</option>
                          </select>
                        </td>
                        <td>
                          <button class="btn btn-outline btn-sm" onclick="app.openInvoice('${o.id}')">
                            ${getIcon('printer')} Invoice
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 class="font-serif text-lg font-bold" style="margin-bottom: 12px;">Ritual Reviews Moderation</h3>
              <div class="data-table-wrap">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Author</th>
                      <th>Rating</th>
                      <th>Comment</th>
                      <th>Status</th>
                      <th style="text-align: right;">Moderation</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${state.reviews.map(r => `
                      <tr>
                        <td class="font-semibold text-dark">${r.productName}</td>
                        <td>${r.author}</td>
                        <td>
                          <div class="flex text-amber">
                            ${Array(r.rating).fill(getIcon('star')).join('')}
                          </div>
                        </td>
                        <td style="max-width: 280px; font-size: 0.75rem;">"${r.comment}"</td>
                        <td><span class="badge ${r.status === 'Published' ? 'badge-success' : 'badge-warning'}">${r.status}</span></td>
                        <td style="text-align: right;">
                          ${r.status !== 'Published' ? `
                            <button class="btn btn-subtle btn-sm" onclick="app.approveReview('${r.id}')">
                              Approve
                            </button>
                          ` : ''}
                          <button class="btn btn-outline btn-sm text-red" onclick="app.rejectReview('${r.id}')">
                            ${getIcon('trash')}
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderAuth() {
  return `
    <div style="padding: 64px 0;">
      <div class="container" style="max-width: 440px;">
        <div class="card">
          <div class="text-center" style="margin-bottom: 24px;">
            <span class="badge badge-primary">Botanical Membership</span>
            <h1 class="font-serif text-2xl font-bold" style="margin-top: 8px;">Access Sanctuary</h1>
            <p class="text-muted text-xs" style="margin-top: 4px;">Sign in to view ritual histories, wishlists, and personalized skin diagnostics.</p>
          </div>
          
          <form onsubmit="event.preventDefault(); app.navigate('sanctuary'); showToast('Signed in successfully', 'check');">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" value="elena.r@example.com" required />
            </div>
            
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="form-input" value="••••••••••••" required />
            </div>
            
            <button type="submit" class="btn btn-primary btn-full btn-lg" style="margin-top: 8px;">
              Sign In to Sanctuary
            </button>
          </form>
          
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border); text-align: center;">
            <button class="btn btn-outline btn-full btn-sm" onclick="app.navigate('home')">
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCartDrawer() {
  const { subtotal, discount, shipping, total } = getCartTotals();
  const freeShippingThreshold = 100;
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);
  
  return `
    <div class="cart-drawer-overlay ${state.isCartDrawerOpen ? 'open' : ''}" onclick="app.toggleCartDrawer(false)"></div>
    <div class="cart-drawer ${state.isCartDrawerOpen ? 'open' : ''}">
      <div class="cart-drawer-header">
        <div class="flex items-center gap-2">
          ${getIcon('shoppingBag')}
          <h2 class="font-serif text-lg font-bold">Your Ritual Bag</h2>
        </div>
        <button class="btn btn-icon" onclick="app.toggleCartDrawer(false)">
          ${getIcon('x')}
        </button>
      </div>
      
      <!-- Free Shipping Progress -->
      <div style="padding: 12px 24px; background: #f0f4ef; border-bottom: 1px solid var(--border);">
        <div class="text-xs font-semibold text-primary" style="margin-bottom: 6px;">
          ${remainingForFree === 0 ? '✨ You unlocked Complimentary Botanical Shipping!' : `Add $${remainingForFree.toFixed(2)} more for Complimentary Shipping`}
        </div>
        <div style="height: 6px; width: 100%; background: #d7ded5; border-radius: 99px; overflow: hidden;">
          <div style="height: 100%; width: ${progress}%; background: var(--primary); transition: width 0.3s ease;"></div>
        </div>
      </div>
      
      <div class="cart-drawer-items">
        ${state.cart.length === 0 ? `
          <div class="text-center" style="padding: 48px 0;">
            <div class="font-serif text-lg font-bold">Your bag is empty</div>
            <p class="text-muted text-xs" style="margin-top: 4px;">Discover botanical formulations crafted for your skin.</p>
            <button class="btn btn-primary btn-sm" style="margin-top: 16px;" onclick="app.navigate('shop')">Explore Shop</button>
          </div>
        ` : state.cart.map(item => `
          <div class="card-sm flex gap-3 items-center">
            <img src="${item.images[0]}" alt="${item.name}" style="width: 56px; height: 56px; border-radius: var(--radius-sm); object-fit: cover;" />
            <div class="flex-1">
              <div class="font-semibold text-xs text-dark" style="line-height: 1.3;">${item.name}</div>
              <div class="font-serif font-bold text-xs text-primary" style="margin: 2px 0;">$${item.price.toFixed(2)}</div>
              <div class="flex items-center gap-2" style="margin-top: 6px;">
                <div class="flex items-center border rounded" style="border: 1px solid var(--border); border-radius: 4px;">
                  <button class="btn btn-icon" style="width: 24px; height: 24px;" onclick="app.updateCartQuantity('${item.id}', -1)">${getIcon('minus')}</button>
                  <span style="font-size: 0.75rem; padding: 0 6px; font-weight: 600;">${item.quantity}</span>
                  <button class="btn btn-icon" style="width: 24px; height: 24px;" onclick="app.updateCartQuantity('${item.id}', 1)">${getIcon('plus')}</button>
                </div>
                <button class="text-xs text-muted" onclick="app.removeFromCart('${item.id}')" style="margin-left: 8px;">Remove</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      ${state.cart.length > 0 ? `
        <div class="cart-drawer-footer">
          <!-- Promo Code -->
          <div class="flex gap-2" style="margin-bottom: 16px;">
            <input type="text" id="promo-input" class="form-input" placeholder="Promo code (e.g. LUMINA10)" style="padding: 6px 10px;" />
            <button class="btn btn-outline btn-sm" onclick="app.applyPromo(document.getElementById('promo-input').value)">Apply</button>
          </div>
          
          <div class="flex justify-between text-xs text-muted" style="margin-bottom: 6px;">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          ${discount > 0 ? `
            <div class="flex justify-between text-xs text-emerald" style="margin-bottom: 6px;">
              <span>Privilege Discount (10%)</span>
              <span>-$${discount.toFixed(2)}</span>
            </div>
          ` : ''}
          <div class="flex justify-between text-xs text-muted" style="margin-bottom: 12px;">
            <span>Botanical Shipping</span>
            <span>${shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div class="flex justify-between font-serif font-bold text-base text-dark" style="margin-bottom: 16px; padding-top: 8px; border-top: 1px solid var(--border);">
            <span>Estimated Total</span>
            <span>$${total.toFixed(2)}</span>
          </div>
          
          <button class="btn btn-primary btn-full btn-lg" onclick="app.submitCheckout({
            firstName: 'Elena',
            lastName: 'Rostova',
            email: 'elena.r@example.com',
            address: '742 Evergreen Terrace',
            city: 'Seattle',
            state: 'WA',
            zip: '98101'
          })">
            Complete Ritual Order • $${total.toFixed(2)}
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

function renderInvoiceModal() {
  const order = state.activeInvoiceOrder;
  if (!state.isInvoiceOpen || !order) return '';
  
  return `
    <div class="modal-overlay ${state.isInvoiceOpen ? 'open' : ''}">
      <div class="modal-box invoice-printable" style="max-width: 680px; padding: 32px;">
        <div class="flex justify-between items-start" style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid var(--border);">
          <div>
            <div class="brand-logo" style="font-size: 1.75rem;">LUMINA</div>
            <div class="text-xs text-muted">Botanical Sanctuary Formulations LLC</div>
            <div class="text-xs text-muted">Seattle, Washington • sanctuary@luminaskin.com</div>
          </div>
          <div class="text-right">
            <span class="badge badge-success">Official Receipt</span>
            <div class="font-serif font-bold text-lg text-dark" style="margin-top: 4px;">#${order.id}</div>
            <div class="text-xs text-muted">${order.date}</div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4" style="margin-bottom: 24px;">
          <div>
            <div class="text-xs font-bold uppercase text-muted">Billed & Shipped To:</div>
            <div class="font-semibold text-sm text-dark" style="margin-top: 4px;">${order.customerName}</div>
            <div class="text-xs text-muted">${order.shippingAddress.street}</div>
            <div class="text-xs text-muted">${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}</div>
          </div>
          <div>
            <div class="text-xs font-bold uppercase text-muted">Payment Status:</div>
            <div class="font-semibold text-sm text-emerald" style="margin-top: 4px;">Paid in Full • Credit Card (Ending 4242)</div>
            <div class="text-xs text-muted">Fulfillment: ${order.status}</div>
          </div>
        </div>
        
        <table class="data-table" style="margin-bottom: 20px;">
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td class="font-medium text-dark">${item.name} (${item.size || '30ml'})</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td style="text-align: right;" class="font-bold text-dark">$${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="flex flex-col items-end gap-1" style="margin-bottom: 24px; padding-top: 12px; border-top: 1px solid var(--border);">
          <div class="flex justify-between" style="width: 220px; font-size: 0.8125rem;">
            <span class="text-muted">Subtotal:</span>
            <span>$${order.subtotal.toFixed(2)}</span>
          </div>
          ${order.discount > 0 ? `
            <div class="flex justify-between text-emerald" style="width: 220px; font-size: 0.8125rem;">
              <span>Privilege Discount:</span>
              <span>-$${order.discount.toFixed(2)}</span>
            </div>
          ` : ''}
          <div class="flex justify-between" style="width: 220px; font-size: 0.8125rem;">
            <span class="text-muted">Shipping:</span>
            <span>${order.shippingCost === 0 ? 'Free' : `$${order.shippingCost.toFixed(2)}`}</span>
          </div>
          <div class="flex justify-between font-serif font-bold text-lg text-dark" style="width: 220px; padding-top: 6px; border-top: 1px solid var(--border);">
            <span>Total:</span>
            <span>$${order.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 no-print">
          <button class="btn btn-outline" onclick="app.printInvoice()">
            ${getIcon('printer')} Print Invoice
          </button>
          <button class="btn btn-primary" onclick="app.closeInvoice()">
            Close
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderSkinQuizModal() {
  if (!state.isSkinQuizOpen) return '';
  
  return `
    <div class="modal-overlay ${state.isSkinQuizOpen ? 'open' : ''}">
      <div class="modal-box" style="padding: 32px; max-width: 540px;">
        <div class="flex justify-between items-center" style="margin-bottom: 20px;">
          <div class="flex items-center gap-2">
            ${getIcon('sparkles')}
            <h2 class="font-serif text-xl font-bold">Skin Diagnostic Sequence</h2>
          </div>
          <button class="btn btn-icon" onclick="app.closeSkinQuiz()">${getIcon('x')}</button>
        </div>
        
        ${state.quizStep === 1 ? `
          <div>
            <span class="text-xs text-muted uppercase font-bold">Step 1 of 3 • Barrier State</span>
            <h3 class="font-serif text-lg font-bold" style="margin: 6px 0 16px;">How does your skin feel 2 hours after cleansing?</h3>
            <div class="flex flex-col gap-3">
              <button class="card-sm text-left hover:border-primary" onclick="app.answerQuiz('feeling', 'dry')">
                <div class="font-semibold text-dark">Tight, slightly dry or flaking</div>
                <div class="text-xs text-muted">Requires rich lipid replenishment & squalane</div>
              </button>
              <button class="card-sm text-left hover:border-primary" onclick="app.answerQuiz('feeling', 'combo')">
                <div class="font-semibold text-dark">Oily along T-zone, normal on cheeks</div>
                <div class="text-xs text-muted">Requires balancing micro-algae & water-light fluids</div>
              </button>
              <button class="card-sm text-left hover:border-primary" onclick="app.answerQuiz('feeling', 'oily')">
                <div class="font-semibold text-dark">Noticeable shine and active pore congestion</div>
                <div class="text-xs text-muted">Requires willow bark BHA and clarifying botanical tonics</div>
              </button>
            </div>
          </div>
        ` : ''}
        
        ${state.quizStep === 2 ? `
          <div>
            <span class="text-xs text-muted uppercase font-bold">Step 2 of 3 • Primary Objective</span>
            <h3 class="font-serif text-lg font-bold" style="margin: 6px 0 16px;">What is your primary skincare focus right now?</h3>
            <div class="flex flex-col gap-3">
              <button class="card-sm text-left" onclick="app.answerQuiz('concern', 'redness')">
                <div class="font-semibold text-dark">Calm redness & restore compromised moisture barrier</div>
              </button>
              <button class="card-sm text-left" onclick="app.answerQuiz('concern', 'glow')">
                <div class="font-semibold text-dark">Boost radiance, plump fine lines & smooth texture</div>
              </button>
              <button class="card-sm text-left" onclick="app.answerQuiz('concern', 'pores')">
                <div class="font-semibold text-dark">Refine pore appearance and control excess oil</div>
              </button>
            </div>
          </div>
        ` : ''}
        
        ${state.quizStep === 3 ? `
          <div>
            <span class="text-xs text-muted uppercase font-bold">Step 3 of 3 • Lifestyle & Exposure</span>
            <h3 class="font-serif text-lg font-bold" style="margin: 6px 0 16px;">What is your primary environmental climate?</h3>
            <div class="flex flex-col gap-3">
              <button class="card-sm text-left" onclick="app.answerQuiz('climate', 'urban')">
                <div class="font-semibold text-dark">Urban / Screen time & high pollution exposure</div>
              </button>
              <button class="card-sm text-left" onclick="app.answerQuiz('climate', 'dry')">
                <div class="font-semibold text-dark">Dry / High altitude or heavy indoor air-conditioning</div>
              </button>
              <button class="card-sm text-left" onclick="app.answerQuiz('climate', 'humid')">
                <div class="font-semibold text-dark">Humid / Tropical & high heat environment</div>
              </button>
            </div>
          </div>
        ` : ''}
        
        ${state.quizStep === 4 && state.quizResult ? `
          <div class="text-center">
            <span class="badge badge-success">Diagnostic Completed</span>
            <h3 class="font-serif text-2xl font-bold" style="margin: 8px 0;">${state.quizResult.title}</h3>
            <p class="text-sm text-muted" style="margin-bottom: 20px;">${state.quizResult.routineNotes}</p>
            
            <div class="card-sm flex gap-4 items-center text-left" style="background: #fcf9f8; margin-bottom: 20px;">
              <img src="${state.quizResult.product.images[0]}" alt="${state.quizResult.product.name}" style="width: 64px; height: 64px; border-radius: var(--radius-sm); object-fit: cover;" />
              <div>
                <div class="text-xs font-bold uppercase text-primary">Recommended Formulation</div>
                <div class="font-serif font-bold text-dark text-sm">${state.quizResult.product.name}</div>
                <div class="font-bold text-dark" style="margin-top: 2px;">$${state.quizResult.product.price.toFixed(2)}</div>
              </div>
            </div>
            
            <div class="flex gap-2">
              <button class="btn btn-primary flex-1" onclick="app.addToCart('${state.quizResult.product.id}'); app.closeSkinQuiz();">
                Add Recommended to Bag
              </button>
              <button class="btn btn-outline" onclick="app.closeSkinQuiz()">
                Close
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderAddProductModal() {
  if (!state.isAddProductOpen) return '';
  return `
    <div class="modal-overlay ${state.isAddProductOpen ? 'open' : ''}">
      <div class="modal-box" style="padding: 32px; max-width: 520px;">
        <div class="flex justify-between items-center" style="margin-bottom: 20px;">
          <h2 class="font-serif text-xl font-bold">Add Botanical Formulation</h2>
          <button class="btn btn-icon" onclick="app.closeAddProductModal()">${getIcon('x')}</button>
        </div>
        
        <form onsubmit="
          event.preventDefault();
          app.createProduct({
            name: this.elements['name'].value,
            category: this.elements['category'].value,
            price: this.elements['price'].value,
            stock: this.elements['stock'].value,
            keyBotanicals: this.elements['botanicals'].value,
            size: this.elements['size'].value,
            image: this.elements['image'].value
          });
        ">
          <div class="form-group">
            <label class="form-label">Formulation Name</label>
            <input type="text" name="name" class="form-input" placeholder="e.g. Celestial Orchid Dew" required />
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <div class="form-group">
              <label class="form-label">Category</label>
              <select name="category" class="form-select">
                <option value="Serums">Serums</option>
                <option value="Moisturizers">Moisturizers</option>
                <option value="Cleansers">Cleansers</option>
                <option value="Toners">Toners</option>
                <option value="Masks & Treatments">Masks & Treatments</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Price ($)</label>
              <input type="number" name="price" class="form-input" value="78" step="0.01" required />
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <div class="form-group">
              <label class="form-label">Stock Quantity</label>
              <input type="number" name="stock" class="form-input" value="25" required />
            </div>
            <div class="form-group">
              <label class="form-label">Bottle Size</label>
              <input type="text" name="size" class="form-input" value="30ml / 1.0 fl. oz." />
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Key Botanicals</label>
            <input type="text" name="botanicals" class="form-input" placeholder="e.g. Orchid Extract, Squalane, Vitamin C" />
          </div>
          
          <div class="form-group">
            <label class="form-label">Image URL</label>
            <input type="url" name="image" class="form-input" value="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80" />
          </div>
          
          <div class="flex justify-end gap-2" style="margin-top: 20px;">
            <button type="button" class="btn btn-outline" onclick="app.closeAddProductModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Create Formulation</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer style="background-color: #181d18; color: #a0aba0; padding: 64px 0 32px; border-top: 1px solid #283228;">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8" style="margin-bottom: 48px;">
          <div>
            <div class="brand-logo" style="color: #ffffff; margin-bottom: 12px;">LUMINA</div>
            <p class="text-xs" style="line-height: 1.7; color: #8fa08e;">
              Clinical botanical chemistry designed to cultivate skin resilience, barrier harmony, and radiant tranquility.
            </p>
          </div>
          <div>
            <div class="font-semibold text-xs text-white uppercase tracking-wider" style="margin-bottom: 12px;">Navigation</div>
            <div class="flex flex-col gap-2 text-xs">
              <a href="#" onclick="app.navigate('home'); return false;">Sanctuary</a>
              <a href="#" onclick="app.navigate('shop'); return false;">All Formulations</a>
              <a href="#" onclick="app.navigate('sanctuary'); return false;">My Ritual Account</a>
              <a href="#" onclick="app.navigate('admin'); return false;">Portal Admin</a>
            </div>
          </div>
          <div>
            <div class="font-semibold text-xs text-white uppercase tracking-wider" style="margin-bottom: 12px;">Commitment</div>
            <div class="flex flex-col gap-2 text-xs">
              <span>100% Vegan & Cruelty Free</span>
              <span>FSC Certified Recycled Packaging</span>
              <span>Carbon Neutral Delivery</span>
              <span>Dermatologist Formulated</span>
            </div>
          </div>
          <div>
            <div class="font-semibold text-xs text-white uppercase tracking-wider" style="margin-bottom: 12px;">Botanical Letters</div>
            <p class="text-xs" style="color: #8fa08e; margin-bottom: 12px;">Receive early access to seasonal micro-harvests.</p>
            <div class="flex gap-2">
              <input type="email" class="form-input" placeholder="Your email..." style="background: #222922; border-color: #2f3b2f; color: #ffffff; padding: 6px 10px;" />
              <button class="btn btn-subtle btn-sm" onclick="showToast('Subscribed to Botanical Letters', 'sparkles')">Join</button>
            </div>
          </div>
        </div>
        
        <div class="flex justify-between items-center text-xs" style="padding-top: 24px; border-top: 1px solid #283228; color: #697568;">
          <div>© 2026 Lumina Skin Inc. Pure Vanilla HTML/CSS/JS Architecture.</div>
          <div>Formulated for Peaceful Radiance.</div>
        </div>
      </div>
    </footer>
  `;
}

// Master Render Loop
export function render() {
  const root = document.getElementById('root');
  if (!root) return;
  
  let viewContent = '';
  switch (state.currentView) {
    case 'home':
      viewContent = renderHome();
      break;
    case 'shop':
      viewContent = renderShop();
      break;
    case 'product-detail':
      viewContent = renderProductDetail();
      break;
    case 'sanctuary':
      viewContent = renderSanctuary();
      break;
    case 'admin':
      viewContent = renderAdmin();
      break;
    case 'auth':
      viewContent = renderAuth();
      break;
    default:
      viewContent = renderHome();
  }
  
  root.innerHTML = `
    ${renderHeader()}
    <main>${viewContent}</main>
    ${renderFooter()}
    ${renderCartDrawer()}
    ${renderInvoiceModal()}
    ${renderSkinQuizModal()}
    ${renderAddProductModal()}
    <div id="toast-container" class="toast-container"></div>
  `;
}

// Initialize on DOM Ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}
