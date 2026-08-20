import React, { useState, useMemo } from 'react';
import { Search, Heart, Star, ShoppingBag, SlidersHorizontal, Check, ArrowRight } from 'lucide-react';
import { Product } from '../../types';

interface CatalogPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  initialSearchQuery?: string;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  initialSearchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'Cleansers', 'Serums', 'Moisturizers', 'Masks & Treatments', 'Toners'];
  const skinTypes = ['Dry', 'Oily', 'Combination', 'Sensitive'];

  const toggleSkinType = (st: string) => {
    if (selectedSkinTypes.includes(st)) {
      setSelectedSkinTypes(selectedSkinTypes.filter((t) => t !== st));
    } else {
      setSelectedSkinTypes([...selectedSkinTypes, st]);
    }
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Skin type filter
        if (
          selectedSkinTypes.length > 0 &&
          !selectedSkinTypes.some((st) => p.skinTypes.includes(st as any))
        ) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchDesc = p.description.toLowerCase().includes(query);
          const matchCat = p.category.toLowerCase().includes(query);
          const matchBotanical = p.keyBotanicals?.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchCat && !matchBotanical) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedSkinTypes, searchQuery, sortBy]);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Catalog Header Banner */}
      <div className="mb-10 text-center sm:text-left border-b border-[#ece8e5] pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#516050] block mb-1">
            Botanical Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1b1b]">
            All Formulations & Rituals
          </h1>
          <p className="text-xs sm:text-sm text-[#747872] mt-1">
            Showing {filteredProducts.length} clean, targeted botanical remedies
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="sm:hidden flex items-center justify-center gap-2 py-2 px-4 bg-[#edeae7] text-[#1c1b1b] rounded-lg text-xs font-medium"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters & Categories</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filter Section */}
        <div
          className={`lg:col-span-3 space-y-8 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          } bg-[#fcf9f8] p-6 lg:p-0 rounded-2xl lg:bg-transparent border lg:border-none border-[#ece8e5]`}
        >
          {/* Search Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#1c1b1b]">
              Search Rituals
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="E.g. Serum, Cleanser, Squalane..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#c4c8c0] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1c1b1b] placeholder-stone-400 focus:outline-none focus:border-[#516050]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1c1b1b]">
              Category
            </h3>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-[#516050] text-white font-medium shadow-sm'
                      : 'text-[#444842] hover:bg-[#edeae7]'
                  }`}
                >
                  <span>{cat === 'All' ? 'All Skincare' : cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Type Filter */}
          <div className="space-y-3 pt-4 border-t border-[#ece8e5]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1c1b1b]">
              Skin Type
            </h3>
            <div className="space-y-2">
              {skinTypes.map((st) => {
                const checked = selectedSkinTypes.includes(st);
                return (
                  <label
                    key={st}
                    onClick={() => toggleSkinType(st)}
                    className="flex items-center gap-2.5 text-xs text-[#444842] cursor-pointer hover:text-[#1c1b1b] select-none"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        checked
                          ? 'bg-[#516050] border-[#516050] text-white'
                          : 'bg-white border-[#c4c8c0]'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{st} Skin</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Reset Filters */}
          {(selectedCategory !== 'All' || selectedSkinTypes.length > 0 || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSkinTypes([]);
                setSearchQuery('');
              }}
              className="text-xs text-[#516050] hover:underline font-medium pt-2 block"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Right Main Grid */}
        <div className="lg:col-span-9 space-y-6">
          {/* Sorting Bar */}
          <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-[#ece8e5] text-xs">
            <span className="text-[#747872]">
              Showing <span className="font-semibold text-[#1c1b1b]">{filteredProducts.length}</span> results
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[#747872]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#fcf9f8] border border-[#d6d2ce] rounded-lg px-2.5 py-1 text-xs font-medium text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              >
                <option value="featured">Featured & Curated</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#c4c8c0] space-y-3">
              <p className="font-serif text-xl text-[#1c1b1b]">No botanical formulations match your criteria.</p>
              <p className="text-xs text-[#747872]">Try adjusting your skin type or category filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedSkinTypes([]);
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#516050] text-white text-xs font-medium rounded-lg hover:bg-[#435042]"
              >
                View All Formulations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const wish = isWishlisted(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#ece8e5] hover:border-[#c4c8c0] luxury-shadow-sm hover:luxury-shadow transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-square bg-[#f5f2ef] overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Heart Wishlist */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product);
                        }}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                          wish
                            ? 'bg-white text-[#d64545] shadow-sm'
                            : 'bg-white/80 text-[#444842] hover:bg-white hover:text-[#1c1b1b]'
                        }`}
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
                      </button>

                      {/* Stock Warning Pill if low */}
                      {product.isLowStock && (
                        <div className="absolute top-3 left-3 bg-[#e88758] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                          Only {product.stock} Left
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#516050]">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-[#1c1b1b] font-medium text-xs">{product.rating}</span>
                          </div>
                        </div>

                        <h3 className="font-serif text-base font-medium text-[#1c1b1b] group-hover:text-[#516050] transition-colors line-clamp-1">
                          {product.name}
                        </h3>

                        <p className="text-xs text-[#747872] line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Botanical Tags */}
                      {product.keyBotanicals && (
                        <p className="text-[11px] text-[#516050] italic truncate">
                          ★ {product.keyBotanicals}
                        </p>
                      )}

                      {/* Price & Action */}
                      <div className="pt-3 border-t border-[#f0ece9] flex items-center justify-between gap-3">
                        <span className="font-serif text-lg font-semibold text-[#1c1b1b]">
                          ${product.price.toFixed(2)}
                        </span>

                        <button
                          onClick={(e) => handleAdd(e, product)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            addedId === product.id
                              ? 'bg-[#516050] text-white'
                              : 'bg-[#edeae7] text-[#1c1b1b] hover:bg-[#516050] hover:text-white'
                          }`}
                        >
                          {addedId === product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
