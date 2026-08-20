import React from 'react';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck, Sparkles, ChevronLeft } from 'lucide-react';
import { CartItem, ViewMode } from '../../types';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onNavigate,
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shipping = isFreeShipping ? 0 : 5.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#edeae7] mx-auto flex items-center justify-center text-[#747872]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl text-[#1c1b1b]">Your Ritual Bag is Empty</h1>
        <p className="text-xs sm:text-sm text-[#747872] max-w-md mx-auto">
          Explore our targeted botanical formulations to restore equilibrium to your daily skincare ritual.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="mt-4 px-6 py-3 bg-[#516050] text-white text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#435042] transition-colors"
        >
          Discover Formulations
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-[#ece8e5] pb-6 flex items-center justify-between">
        <div>
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-1 text-xs text-[#516050] font-medium hover:underline mb-2"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Continue Curating</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1b1b]">
            Your Shopping Bag
          </h1>
        </div>
        <span className="text-xs text-[#747872]">
          {items.reduce((acc, i) => acc + i.quantity, 0)} Items
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Table Header on Desktop */}
          <div className="hidden sm:grid grid-cols-12 text-xs font-semibold uppercase tracking-wider text-[#747872] pb-3 border-b border-[#ece8e5]">
            <div className="col-span-6">Formulation</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <div className="divide-y divide-[#ece8e5]">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
              >
                {/* Product Info */}
                <div className="sm:col-span-6 flex gap-4 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-stone-100 border border-[#ece8e5] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#516050]">
                      {item.product.category}
                    </span>
                    <h3 className="font-serif text-base font-medium text-[#1c1b1b]">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[#747872]">
                      {item.product.size || 'Standard Size'}
                    </p>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[11px] text-stone-400 hover:text-red-600 transition-colors flex items-center gap-1 pt-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Single Price */}
                <div className="sm:col-span-2 text-left sm:text-center text-xs text-[#444842]">
                  <span className="sm:hidden text-[#747872] mr-2">Price:</span>
                  ${item.product.price.toFixed(2)}
                </div>

                {/* Quantity Selector */}
                <div className="sm:col-span-2 flex sm:justify-center">
                  <div className="flex items-center border border-[#c4c8c0] rounded-lg bg-white">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-[#edeae7] text-[#444842]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-semibold text-[#1c1b1b]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-[#edeae7] text-[#444842]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div className="sm:col-span-2 text-left sm:text-right font-serif text-base font-semibold text-[#1c1b1b]">
                  <span className="sm:hidden text-xs text-[#747872] mr-2">Total:</span>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Complimentary Perks Banner */}
          <div className="bg-[#f7f5f3] p-5 rounded-2xl border border-[#ece8e5] flex items-center gap-3 text-xs text-[#516050] mt-6">
            <Sparkles className="w-5 h-5 text-[#516050] shrink-0" />
            <p>
              Your order qualifies for 2 complimentary deluxe botanical travel samples selected during packing.
            </p>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#ece8e5] luxury-shadow space-y-6">
          <h2 className="font-serif text-xl font-medium text-[#1c1b1b]">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs border-b border-[#ece8e5] pb-4">
            <div className="flex justify-between text-[#444842]">
              <span>Subtotal</span>
              <span className="font-medium text-[#1c1b1b]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#444842]">
              <span>Carbon-Neutral Shipping</span>
              <span className="font-medium">{isFreeShipping ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-[#444842]">
              <span>Estimated Sales Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between font-serif text-lg font-bold text-[#1c1b1b]">
            <span>Estimated Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={onProceedToCheckout}
            className="w-full py-4 bg-[#1c1b1b] text-white hover:bg-[#333] rounded-xl text-xs font-semibold uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#747872]">
            <ShieldCheck className="w-4 h-4 text-[#516050]" />
            <span>Encrypted 256-Bit SSL Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
