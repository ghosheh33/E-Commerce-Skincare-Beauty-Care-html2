import React, { useState } from 'react';
import { ShoppingBag, Heart, User, Search, ShieldCheck, Sparkles, X, ArrowRight, Menu } from 'lucide-react';
import { ViewMode } from '../../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onSearch: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  isAdmin,
  onToggleAdmin,
  onSearch,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      onNavigate('shop');
      setShowSearchInput(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcf9f8]/95 backdrop-blur-md border-b border-[#ece8e5] transition-all">
      {/* Announcement Bar */}
      <div className="bg-[#516050] text-[#f4f7f4] text-xs font-medium py-2 px-4 text-center tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 opacity-80" />
        <span>Complimentary botanical sample kit with all orders over $75</span>
        <span className="hidden md:inline text-white/50">•</span>
        <span className="hidden md:inline">Free carbon-neutral shipping on orders over $50</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          id="btn-mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -ml-2 text-[#444842] hover:text-[#1c1b1b] lg:hidden"
          aria-label="Open menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            id="btn-logo-home"
            onClick={() => onNavigate('home')}
            className="group text-left focus:outline-none"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.18em] text-[#1c1b1b] group-hover:text-[#516050] transition-colors">
              LUMINA
            </span>
            <span className="block text-[9px] font-sans tracking-[0.35em] text-[#747872] uppercase -mt-1 group-hover:text-[#516050]">
              Botanical Care
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#444842]">
            <button
              id="nav-shop"
              onClick={() => onNavigate('shop')}
              className={`hover:text-[#1c1b1b] transition-colors py-1 relative ${
                currentView === 'shop' ? 'text-[#1c1b1b] font-semibold' : ''
              }`}
            >
              Shop All
              {currentView === 'shop' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#516050]" />
              )}
            </button>
            <button
              id="nav-rituals"
              onClick={() => onNavigate('shop')}
              className="hover:text-[#1c1b1b] transition-colors"
            >
              Rituals & Sets
            </button>
            <button
              id="nav-story"
              onClick={() => onNavigate('home')}
              className="hover:text-[#1c1b1b] transition-colors"
            >
              Our Story
            </button>
            <button
              id="nav-journal"
              onClick={() => onNavigate('home')}
              className="hover:text-[#1c1b1b] transition-colors"
            >
              Botanical Journal
            </button>
          </nav>
        </div>

        {/* Action Controls & Admin Mode Switcher */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Quick Admin Toggle Pill */}
          <button
            id="btn-toggle-admin"
            onClick={onToggleAdmin}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isAdmin
                ? 'bg-[#1c1b1b] text-white shadow-sm'
                : 'bg-[#edeae7] text-[#444842] hover:bg-[#e2dfdb]'
            }`}
            title={isAdmin ? 'Switch to Customer View' : 'Switch to Admin Management'}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAdmin ? 'Admin Mode' : 'Admin Panel'}</span>
          </button>

          {/* Search Trigger / Input */}
          <div className="relative">
            {showSearchInput ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search botanical rituals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  className="w-48 sm:w-64 pl-3 pr-8 py-1.5 text-xs bg-white border border-[#c4c8c0] rounded-full focus:outline-none focus:border-[#516050] text-[#1c1b1b]"
                />
                <button
                  type="button"
                  onClick={() => setShowSearchInput(false)}
                  className="absolute right-2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                id="btn-search-trigger"
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-[#444842] hover:text-[#1c1b1b] hover:bg-stone-200/50 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist */}
          <button
            id="btn-nav-wishlist"
            onClick={() => onNavigate('sanctuary')}
            className="p-2 text-[#444842] hover:text-[#1c1b1b] hover:bg-stone-200/50 rounded-full transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#516050] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account / Sanctuary */}
          <button
            id="btn-nav-account"
            onClick={() => onNavigate('sanctuary')}
            className={`p-2 rounded-full transition-colors ${
              currentView === 'sanctuary'
                ? 'bg-[#516050] text-white'
                : 'text-[#444842] hover:text-[#1c1b1b] hover:bg-stone-200/50'
            }`}
            aria-label="Customer Sanctuary"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Cart Trigger */}
          <button
            id="btn-nav-cart"
            onClick={onOpenCart}
            className="flex items-center gap-2 pl-3 pr-4 py-2 bg-[#1c1b1b] text-white hover:bg-[#323631] rounded-full text-xs font-medium transition-all shadow-sm group"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-stone-300 group-hover:text-white" />
            <span className="font-semibold">{cartCount}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ece8e5] bg-[#fcf9f8] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => {
              onNavigate('shop');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left font-serif text-lg text-[#1c1b1b] py-1"
          >
            Shop All Formulations
          </button>
          <button
            onClick={() => {
              onNavigate('sanctuary');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left font-serif text-lg text-[#1c1b1b] py-1"
          >
            Customer Sanctuary & Orders
          </button>
          <button
            onClick={() => {
              onToggleAdmin();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between w-full text-left font-sans text-sm font-medium text-[#516050] py-2 border-t border-[#ece8e5]"
          >
            <span>{isAdmin ? 'Exit Admin Dashboard' : 'Open Admin Management Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
