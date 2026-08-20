import React, { useState, useEffect } from 'react';
import {
  ViewMode,
  SanctuaryTab,
  AdminTab,
  Product,
  CartItem,
  Order,
  Review,
  UserProfile,
  OrderStatus
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
  INITIAL_USER
} from './data/mockData';

// Common Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { InvoiceModal } from './components/common/InvoiceModal';
import { SkinQuizModal } from './components/common/SkinQuizModal';

// Storefront & Shop Components
import { HeroSection } from './components/storefront/HeroSection';
import { FeaturedSection } from './components/storefront/FeaturedSection';
import { BrandStorySection } from './components/storefront/BrandStorySection';
import { TestimonialsSection } from './components/storefront/TestimonialsSection';
import { CatalogPage } from './components/shop/CatalogPage';
import { ProductDetailPage } from './components/shop/ProductDetailPage';

// Cart & Commerce
import { CartDrawer } from './components/cart/CartDrawer';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/cart/CheckoutPage';

// Customer Sanctuary & Auth
import { SanctuaryLayout } from './components/sanctuary/SanctuaryLayout';
import { AuthPage } from './components/auth/AuthPage';

// Admin Suite
import { AdminLayout } from './components/admin/AdminLayout';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [sanctuaryTab, setSanctuaryTab] = useState<SanctuaryTab>('orders');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');

  // Application Data States
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 },
    { product: INITIAL_PRODUCTS[1], quantity: 1 },
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([
    INITIAL_PRODUCTS[2],
    INITIAL_PRODUCTS[3],
  ]);

  // UI Drawer & Modal States
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [isSkinQuizOpen, setIsSkinQuizOpen] = useState(false);
  const [catalogSearchTerm, setCatalogSearchTerm] = useState('');

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setCurrentView('checkout');
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Product Selection Handlers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  // Order Handlers
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Review Handlers
  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newReview: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      status: 'Pending Approval',
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleApproveReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: 'Published' } : r))
    );
  };

  const handleRejectReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: 'Rejected' } : r))
    );
  };

  // Product Management Handlers (Admin)
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, stock: newStock, isLowStock: newStock < 15 }
          : p
      )
    );
  };

  // User Profile Handlers
  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateSkinProfile = (skinProfile: UserProfile['skinProfile']) => {
    setUser((prev) => ({ ...prev, skinProfile }));
  };

  // Search in Header
  const handleHeaderSearch = (term: string) => {
    setCatalogSearchTerm(term);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // If Admin view is active, render Admin Layout
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b]">
        <AdminLayout
          activeTab={adminTab}
          onTabChange={setAdminTab}
          onExitAdmin={() => setCurrentView('home')}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          products={products}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateStock={handleUpdateStock}
          reviews={reviews}
          onApproveReview={handleApproveReview}
          onRejectReview={handleRejectReview}
          onViewInvoice={(ord) => setSelectedInvoiceOrder(ord)}
        />

        {/* Invoice Modal for Admin */}
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1c1b1b] font-sans antialiased">
      {/* Global Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        isAdmin={false}
        onToggleAdmin={() => setCurrentView('admin')}
        onSearch={handleHeaderSearch}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* VIEW 1: STOREFRONT HOME */}
        {currentView === 'home' && (
          <div>
            <HeroSection onNavigate={setCurrentView} />
            <FeaturedSection
              products={products}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={isWishlisted}
              onNavigate={setCurrentView}
            />
            <BrandStorySection />
            <TestimonialsSection />
          </div>
        )}

        {/* VIEW 2: SHOP / CATALOG */}
        {currentView === 'shop' && (
          <CatalogPage
            products={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={isWishlisted}
            initialSearchQuery={catalogSearchTerm}
          />
        )}

        {/* VIEW 3: PRODUCT DETAIL PAGE */}
        {currentView === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            reviews={reviews}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={isWishlisted}
            onNavigate={setCurrentView}
            onAddReview={handleAddReview}
          />
        )}

        {/* VIEW 4: CART PAGE */}
        {currentView === 'cart' && (
          <CartPage
            items={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onProceedToCheckout={() => setCurrentView('checkout')}
            onNavigate={setCurrentView}
          />
        )}

        {/* VIEW 5: CHECKOUT PAGE */}
        {currentView === 'checkout' && (
          <CheckoutPage
            items={cart}
            user={user}
            onClearCart={handleClearCart}
            onOrderCompleted={handleOrderCompleted}
            onNavigate={setCurrentView}
            onViewInvoice={(ord) => setSelectedInvoiceOrder(ord)}
          />
        )}

        {/* VIEW 6: CUSTOMER SANCTUARY / PORTAL */}
        {currentView === 'sanctuary' && (
          <SanctuaryLayout
            activeTab={sanctuaryTab}
            onTabChange={setSanctuaryTab}
            user={user}
            onUpdateUser={handleUpdateUser}
            orders={orders}
            wishlist={wishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            reviews={reviews}
            allProducts={products}
            onAddReview={handleAddReview}
            onViewInvoice={(ord) => setSelectedInvoiceOrder(ord)}
            onOpenSkinQuiz={() => setIsSkinQuizOpen(true)}
            onNavigate={setCurrentView}
          />
        )}

        {/* VIEW 7: AUTH SIGN IN / REGISTER */}
        {currentView === 'auth' && (
          <AuthPage
            onLoginSuccess={(userData) => {
              if (userData) handleUpdateUser(userData);
              setCurrentView('sanctuary');
            }}
            onNavigate={setCurrentView}
          />
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartDrawerOpen(false);
          setCurrentView('checkout');
        }}
        onNavigate={setCurrentView}
      />

      {/* Global Invoice Modal */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
      />

      {/* Interactive Skin Diagnostic Quiz Modal */}
      <SkinQuizModal
        isOpen={isSkinQuizOpen}
        onClose={() => setIsSkinQuizOpen(false)}
        onUpdateProfile={handleUpdateSkinProfile}
      />

      {/* Footer on Customer facing screens */}
      <Footer onNavigate={setCurrentView} />
    </div>
  );
}
