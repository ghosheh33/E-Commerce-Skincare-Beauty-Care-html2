import React, { useState } from 'react';
import {
  Heart,
  Star,
  ShoppingBag,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Leaf,
  Plus,
  Minus,
  Check,
  ChevronDown,
  ChevronUp,
  MessageSquarePlus,
  ArrowRight
} from 'lucide-react';
import { Product, Review, ViewMode } from '../../types';

interface ProductDetailPageProps {
  product: Product;
  reviews: Review[];
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  onNavigate: (view: ViewMode) => void;
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  reviews,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onNavigate,
  onAddReview,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<'benefits' | 'ingredients' | 'ritual' | null>('benefits');

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const wish = isWishlisted(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === 'Published');

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      onAddReview({
        productId: product.id,
        productName: product.name,
        productImage: product.images[0],
        author: newReviewAuthor,
        rating: newReviewRating,
        comment: newReviewComment,
        isVerifiedBuyer: true,
      });
      setShowReviewModal(false);
      setNewReviewAuthor('');
      setNewReviewComment('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-[#747872]">
        <button onClick={() => onNavigate('home')} className="hover:text-[#1c1b1b]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => onNavigate('shop')} className="hover:text-[#1c1b1b]">
          Shop
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="hover:text-[#1c1b1b]">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1c1b1b] font-medium">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image Stack & Main Photo */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#516050] ring-2 ring-[#516050]/20'
                      : 'border-[#ece8e5] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Display Image */}
          <div className="relative flex-1 aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden border border-[#ece8e5] luxury-shadow">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                wish
                  ? 'bg-white text-[#d64545] shadow-sm'
                  : 'bg-white/80 text-[#444842] hover:bg-white hover:text-[#1c1b1b]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wish ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Column: Product Info & Commerce Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-[#516050]">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#e8ede7] text-[#3c4a3c] rounded-full text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>In Stock • {product.stock} Units</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1b1b] font-normal leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-3 text-xs pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`}
                  />
                ))}
              </div>
              <span className="font-semibold text-[#1c1b1b]">{product.rating} / 5</span>
              <span className="text-[#747872]">({product.reviewsCount} customer reflections)</span>
            </div>

            {/* Price & Size */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-serif text-3xl font-semibold text-[#1c1b1b]">
                ${product.price.toFixed(2)}
              </span>
              {product.size && (
                <span className="text-xs text-[#747872] font-medium">({product.size})</span>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#444842] leading-relaxed border-t border-[#ece8e5] pt-4">
            {product.description}
          </p>

          {/* Skin Type Compatibility Pills */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#747872]">
              Suitable for Skin Types:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.skinTypes.map((st) => (
                <span
                  key={st}
                  className="px-2.5 py-0.5 bg-[#edeae7] text-[#444842] rounded-full text-xs font-medium"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Action CTA Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#ece8e5]">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#c4c8c0] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 hover:bg-[#edeae7] text-[#444842] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-2 text-xs font-semibold text-[#1c1b1b] w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2.5 hover:bg-[#edeae7] text-[#444842] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-[#516050] text-white shadow-sm'
                    : 'bg-[#edeae7] text-[#1c1b1b] hover:bg-[#516050] hover:text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 bg-[#1c1b1b] text-white hover:bg-[#333] rounded-xl text-xs font-semibold uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 group"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Accordion Tabs (Benefits & Ingredients) */}
          <div className="border-t border-[#ece8e5] pt-4 divide-y divide-[#ece8e5] text-xs">
            {/* Benefits Accordion */}
            <div className="py-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'benefits' ? null : 'benefits')}
                className="w-full flex items-center justify-between font-serif text-sm font-medium text-[#1c1b1b]"
              >
                <span>Formulation Benefits</span>
                {openAccordion === 'benefits' ? (
                  <ChevronUp className="w-4 h-4 text-[#747872]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#747872]" />
                )}
              </button>
              {openAccordion === 'benefits' && (
                <ul className="mt-3 space-y-2 text-[#444842] pl-2 animate-in fade-in duration-200">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#516050] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Ingredients Accordion */}
            <div className="py-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'ingredients' ? null : 'ingredients')}
                className="w-full flex items-center justify-between font-serif text-sm font-medium text-[#1c1b1b]"
              >
                <span>Full Botanical Ingredient List</span>
                {openAccordion === 'ingredients' ? (
                  <ChevronUp className="w-4 h-4 text-[#747872]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#747872]" />
                )}
              </button>
              {openAccordion === 'ingredients' && (
                <div className="mt-3 space-y-2 text-[#444842] pl-2 animate-in fade-in duration-200">
                  <p className="leading-relaxed text-[11px] font-mono bg-[#f6f3f2] p-3 rounded-lg border border-[#ece8e5]">
                    {product.ingredients.join(' • ')}
                  </p>
                  <p className="text-[11px] text-[#747872] italic">
                    100% free of synthetic parabens, phthalates, synthetic silicones, sulfates, and artificial fragrances.
                  </p>
                </div>
              )}
            </div>

            {/* Ritual Usage */}
            <div className="py-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'ritual' ? null : 'ritual')}
                className="w-full flex items-center justify-between font-serif text-sm font-medium text-[#1c1b1b]"
              >
                <span>Application & Daily Ritual</span>
                {openAccordion === 'ritual' ? (
                  <ChevronUp className="w-4 h-4 text-[#747872]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#747872]" />
                )}
              </button>
              {openAccordion === 'ritual' && (
                <p className="mt-3 text-[#444842] pl-2 leading-relaxed animate-in fade-in duration-200">
                  Warm 3-4 drops between clean palms and press gently onto freshly cleansed, toned damp skin. Follow with your favorite Lumina moisturizer. Ideal for PM restoration.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reflections / Reviews Section (Screenshot 3) */}
      <section className="pt-12 border-t border-[#ece8e5]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1c1b1b]">
              Customer Reflections
            </h2>
            <p className="text-xs text-[#747872] mt-1">
              Verified stories from daily users of {product.name}
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#516050] text-white hover:bg-[#435042] rounded-xl text-xs font-semibold transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Reflection</span>
          </button>
        </div>

        {/* Reviews Cards List */}
        {productReviews.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#ece8e5] text-center space-y-2">
            <p className="font-serif text-base text-[#1c1b1b]">Be the first to share your experience.</p>
            <p className="text-xs text-[#747872]">Write a review to help others calibrate their rituals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-[#ece8e5] luxury-shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#747872]">{rev.date}</span>
                  </div>

                  <p className="text-xs text-[#444842] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f0ece9] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-[#1c1b1b]">{rev.author}</span>
                    {rev.isVerifiedBuyer && (
                      <span className="text-[10px] text-[#516050] font-semibold bg-[#e8ede7] px-1.5 py-0.5 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl luxury-shadow-lg p-6 border border-[#e5e1dd] space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="font-serif text-xl font-medium text-[#1c1b1b]">
              Share Your Reflection
            </h3>
            <p className="text-xs text-[#747872]">
              Reviewing <span className="font-semibold text-[#1c1b1b]">{product.name}</span>
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-[#1c1b1b]">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Eleanor Vance"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-[#1c1b1b]">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 text-amber-400"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= newReviewRating ? 'fill-current' : 'text-stone-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-[#1c1b1b]">Your Experience & Skin Response</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the texture, scent, and changes observed on your skin..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl p-3 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-[#747872] hover:text-[#1c1b1b]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#516050] text-white font-medium rounded-xl hover:bg-[#435042]"
                >
                  Submit Reflection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
