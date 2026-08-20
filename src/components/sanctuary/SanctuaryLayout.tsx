import React, { useState } from 'react';
import {
  Package,
  Heart,
  MessageSquare,
  UserCheck,
  Star,
  Printer,
  ShoppingBag,
  Trash2,
  Sparkles,
  Check,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SanctuaryTab, Order, Product, Review, UserProfile, ViewMode } from '../../types';

interface SanctuaryLayoutProps {
  activeTab: SanctuaryTab;
  onTabChange: (tab: SanctuaryTab) => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  orders: Order[];
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  reviews: Review[];
  allProducts: Product[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  onViewInvoice: (order: Order) => void;
  onOpenSkinQuiz: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const SanctuaryLayout: React.FC<SanctuaryLayoutProps> = ({
  activeTab,
  onTabChange,
  user,
  onUpdateUser,
  orders,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  reviews,
  allProducts,
  onAddReview,
  onViewInvoice,
  onOpenSkinQuiz,
  onNavigate,
}) => {
  // Profile form state
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [street, setStreet] = useState(user.address.street);
  const [city, setCity] = useState(user.address.city);
  const [state, setState] = useState(user.address.state);
  const [postalCode, setPostalCode] = useState(user.address.postalCode);
  const [profileSaved, setProfileSaved] = useState(false);

  // New review state
  const [selectedProductId, setSelectedProductId] = useState(allProducts[0]?.id || '');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      phone,
      address: {
        ...user.address,
        street,
        city,
        state,
        postalCode,
      },
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = allProducts.find((p) => p.id === selectedProductId);
    if (!prod || !reviewComment.trim()) return;

    onAddReview({
      productId: prod.id,
      productName: prod.name,
      productImage: prod.images[0],
      author: user.name,
      rating: reviewRating,
      comment: reviewComment,
      isVerifiedBuyer: true,
    });

    setReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const userReviews = reviews.filter((r) => r.author.toLowerCase().includes(user.firstName.toLowerCase()) || r.author === 'Elena M.' || r.author === user.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Sanctuary Banner Header */}
      <div className="mb-10 border-b border-[#ece8e5] pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#516050] block mb-1">
            Customer Sanctuary
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1b1b]">
            Welcome, {user.firstName}
          </h1>
          <p className="text-xs sm:text-sm text-[#747872] mt-1">
            Manage your daily rituals, track shipments, and review tailored botanical recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-[#e8ede7] text-[#3c4a3c] rounded-full text-xs font-semibold">
            {user.membershipTier}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-[#ece8e5]">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border border-[#c4c8c0]"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-serif font-semibold text-sm text-[#1c1b1b]">{user.name}</h3>
              <p className="text-[11px] text-[#747872]">{user.email}</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="space-y-1.5 text-xs font-medium">
            <button
              onClick={() => onTabChange('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#516050] text-white shadow-sm'
                  : 'text-[#444842] hover:bg-[#edeae7]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-[#edeae7] text-[#747872]'}`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => onTabChange('wishlist')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'wishlist'
                  ? 'bg-[#516050] text-white shadow-sm'
                  : 'text-[#444842] hover:bg-[#edeae7]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                <span>My Wishlist</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-[#edeae7] text-[#747872]'}`}>
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => onTabChange('reviews')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'reviews'
                  ? 'bg-[#516050] text-white shadow-sm'
                  : 'text-[#444842] hover:bg-[#edeae7]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Ritual Reviews</span>
              </div>
            </button>

            <button
              onClick={() => onTabChange('profile')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#516050] text-white shadow-sm'
                  : 'text-[#444842] hover:bg-[#edeae7]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4" />
                <span>Profile & Skin Bio</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Right Main Tab Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: MY ORDERS (Screenshot 8) */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-[#1c1b1b]">Order History</h2>
                  <p className="text-xs text-[#747872]">View your past shipments, receipts, and order statuses</p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-[#ece8e5] text-center space-y-3">
                  <p className="font-serif text-lg text-[#1c1b1b]">No orders placed yet.</p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="px-5 py-2.5 bg-[#516050] text-white text-xs font-semibold rounded-lg hover:bg-[#435042]"
                  >
                    Start Your Ritual
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl border border-[#ece8e5] p-6 luxury-shadow-sm space-y-4"
                    >
                      {/* Order Head */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ece8e5] text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-sm text-[#1c1b1b]">{order.id}</span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                order.status === 'Delivered'
                                  ? 'bg-[#e8ede7] text-[#3c4a3c]'
                                  : order.status === 'Shipped'
                                  ? 'bg-blue-50 text-blue-700'
                                  : order.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : order.status === 'Cancelled'
                                  ? 'bg-red-50 text-red-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-[#747872]">Placed on {order.date}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-serif font-bold text-base text-[#1c1b1b]">
                            ${order.total.toFixed(2)}
                          </span>
                          <button
                            onClick={() => onViewInvoice(order)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#edeae7] hover:bg-[#e2dfdb] text-[#1c1b1b] rounded-lg text-xs font-medium transition-colors"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>View Invoice</span>
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-14 rounded-lg object-cover bg-stone-100 border border-[#ece8e5]"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <h4 className="font-serif font-medium text-[#1c1b1b]">{item.name}</h4>
                                <p className="text-[#747872]">{item.size} • Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-medium text-[#1c1b1b]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY WISHLIST (Screenshot 10) */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#1c1b1b]">My Wishlist</h2>
                <p className="text-xs text-[#747872]">Curated botanical formulations saved for your future rituals</p>
              </div>

              {wishlist.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-[#ece8e5] text-center space-y-3">
                  <Heart className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="font-serif text-lg text-[#1c1b1b]">Your wishlist is currently empty.</p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="px-5 py-2.5 bg-[#516050] text-white text-xs font-semibold rounded-lg hover:bg-[#435042]"
                  >
                    Curate Formulations
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-[#ece8e5] overflow-hidden luxury-shadow-sm p-4 flex flex-col justify-between space-y-3"
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={() => onRemoveFromWishlist(prod.id)}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-full hover:bg-white shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#516050]">{prod.category}</span>
                        <h4 className="font-serif text-sm font-medium text-[#1c1b1b]">{prod.name}</h4>
                        <span className="font-serif font-bold text-sm text-[#1c1b1b] block">
                          ${prod.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          onAddToCart(prod);
                          onRemoveFromWishlist(prod.id);
                        }}
                        className="w-full py-2 bg-[#516050] text-white rounded-lg text-xs font-semibold hover:bg-[#435042] flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MY REVIEWS (Screenshot 11) */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Write Review Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-4">
                <div>
                  <h2 className="font-serif text-xl text-[#1c1b1b]">Share Your Ritual Story</h2>
                  <p className="text-xs text-[#747872]">Reflect on your formulation results to assist our community</p>
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-medium text-[#1c1b1b]">Select Formulation</label>
                      <select
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                      >
                        {allProducts.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} (${p.price.toFixed(2)})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-medium text-[#1c1b1b]">Ritual Rating</label>
                      <div className="flex gap-1.5 pt-1.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setReviewRating(s)}
                            className="p-1 text-amber-400"
                          >
                            <Star className={`w-5 h-5 ${s <= reviewRating ? 'fill-current' : 'text-stone-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-[#1c1b1b]">Your Written Reflection</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share how this product performed on your skin..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl p-3 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {reviewSubmitted && (
                      <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span>Submitted! Awaiting administrative review approval.</span>
                      </span>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-6 py-2.5 bg-[#516050] text-white rounded-xl font-semibold hover:bg-[#435042] transition-colors"
                    >
                      Submit Reflection
                    </button>
                  </div>
                </form>
              </div>

              {/* Past Reflections List */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-[#1c1b1b]">Your Past Reflections</h3>
                {userReviews.length === 0 ? (
                  <p className="text-xs text-[#747872]">You have not submitted any reflections yet.</p>
                ) : (
                  <div className="space-y-3">
                    {userReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-white p-5 rounded-xl border border-[#ece8e5] luxury-shadow-sm flex items-start justify-between gap-4 text-xs"
                      >
                        <div className="flex gap-3">
                          <img
                            src={rev.productImage}
                            alt={rev.productName}
                            className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="space-y-1">
                            <h4 className="font-serif font-medium text-sm text-[#1c1b1b]">{rev.productName}</h4>
                            <div className="flex text-amber-400">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                            <p className="text-[#444842] italic">"{rev.comment}"</p>
                          </div>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                            rev.status === 'Published'
                              ? 'bg-[#e8ede7] text-[#3c4a3c]'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {rev.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: MY PROFILE & SKIN PROFILE (Screenshot 16) */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Skin Diagnostic Banner Card */}
              <div className="bg-[#1c221c] text-white p-6 sm:p-8 rounded-2xl border border-[#2b352b] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#9db49b]">
                      Personal Skin Bio
                    </span>
                    <h2 className="font-serif text-2xl text-white">
                      Archetype: {user.skinProfile.type} Skin
                    </h2>
                    <p className="text-xs text-[#a0aba0]">
                      Focus Area: <span className="text-white font-medium">{user.skinProfile.focus}</span>
                    </p>
                  </div>

                  <button
                    onClick={onOpenSkinQuiz}
                    className="px-4 py-2 bg-[#2a342a] hover:bg-[#516050] text-[#d7ded5] hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Retake Diagnostic Quiz</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-[#2d362d] flex flex-wrap gap-2 text-xs">
                  <span className="text-[#798879] self-center mr-1">Active Targets:</span>
                  {user.skinProfile.concerns.map((c) => (
                    <span key={c} className="px-3 py-1 bg-black/40 text-[#c2cbc2] rounded-full border border-white/10 text-xs">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Daily Ritual Box */}
              <div className="bg-[#f6f3f2] p-6 rounded-2xl border border-[#ece8e5] space-y-3">
                <h3 className="font-serif text-lg text-[#1c1b1b] font-medium">
                  Tailored For You: Your Morning & Evening Sequence
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-[#ece8e5] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#516050]">AM Sequence</span>
                    <p className="font-medium text-[#1c1b1b]">Purifying Cleanser + Botanical Toner + Cloud Barrier Cream</p>
                    <p className="text-[#747872] text-[11px]">Locks in moisture and defends against environmental pollution.</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[#ece8e5] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#516050]">PM Sequence</span>
                    <p className="font-medium text-[#1c1b1b]">Gentle Wash + Midnight Recovery Serum + Deep Moisture Cream</p>
                    <p className="text-[#747872] text-[11px]">Intense overnight lipid barrier renewal and cellular repair.</p>
                  </div>
                </div>
              </div>

              {/* Profile Details Edit Form */}
              <form onSubmit={handleProfileSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-6 text-xs">
                <h3 className="font-serif text-xl text-[#1c1b1b]">Personal Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-medium text-[#444842]">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-medium text-[#444842]">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-medium text-[#444842]">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-medium text-[#444842]">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                    />
                  </div>
                </div>

                <h4 className="font-serif text-base text-[#1c1b1b] pt-2 border-t border-[#ece8e5]">Primary Shipping Address</h4>

                <div className="space-y-1">
                  <label className="font-medium text-[#444842]">Street Address</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-medium text-[#444842]">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-medium text-[#444842]">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-medium text-[#444842]">Postal Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#ece8e5]">
                  {profileSaved && (
                    <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>Profile and shipping details saved successfully.</span>
                    </span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-6 py-2.5 bg-[#1c1b1b] text-white rounded-xl font-semibold hover:bg-[#333] transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
