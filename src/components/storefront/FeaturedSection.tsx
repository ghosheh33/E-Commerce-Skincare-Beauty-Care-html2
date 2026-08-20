import React, { useState } from 'react';
import { Heart, Star, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { Product, ViewMode } from '../../types';

interface FeaturedSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  onNavigate: (view: ViewMode) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onNavigate,
}) => {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3);
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleDotClick = (e: React.MouseEvent, productId: string, index: number) => {
    e.stopPropagation();
    setActiveImageIndices((prev) => ({ ...prev, [productId]: index }));
  };

  const handleAddClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="bg-[#121612] text-white py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9db49b] block mb-2">
              Essential Rituals
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Featured Products
            </h2>
            <p className="text-sm text-[#a0aba0] mt-2">
              Curated essentials for your daily morning and evening ritual.
            </p>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#9db49b] hover:text-white transition-colors group"
          >
            <span>View All Formulations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => {
            const currentImgIndex = activeImageIndices[product.id] || 0;
            const currentImg = product.images[currentImgIndex] || product.images[0];
            const wish = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group cursor-pointer bg-[#1c221c] rounded-2xl overflow-hidden border border-[#2b352b] hover:border-[#485b48] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image Area with Dots & Heart */}
                <div className="relative aspect-[4/5] bg-[#171b17] overflow-hidden">
                  <img
                    src={currentImg}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                      wish
                        ? 'bg-white text-[#d64545]'
                        : 'bg-black/40 text-white hover:bg-white hover:text-[#1c1b1b]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
                  </button>

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-[#c2cbc2] rounded-full border border-white/10">
                      {product.category}
                    </span>
                  </div>

                  {/* Carousel Dots */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => handleDotClick(e, product.id, idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImgIndex
                              ? 'bg-white w-5'
                              : 'bg-white/40 hover:bg-white/70'
                          }`}
                          aria-label={`View image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Content & Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#9db49b] font-medium">{product.subtitle || product.category}</span>
                      <div className="flex items-center gap-1 text-amber-300">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-white text-xs font-semibold">{product.rating}</span>
                        <span className="text-[#798879] text-[11px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#9db49b] transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#a0aba0] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#293029] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#798879] block">Price</span>
                      <span className="font-serif text-lg font-semibold text-white">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddClick(e, product)}
                      className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        addedId === product.id
                          ? 'bg-[#516050] text-white'
                          : 'bg-[#2a342a] text-[#d7ded5] hover:bg-[#516050] hover:text-white'
                      }`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
