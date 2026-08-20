import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem, ViewMode } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#fcf9f8] h-full shadow-2xl flex flex-col justify-between border-l border-[#ece8e5] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#ece8e5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#516050]" />
            <h2 className="font-serif text-lg font-semibold text-[#1c1b1b]">
              Your Ritual Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#747872] hover:text-[#1c1b1b] rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#e8ede7]/60 px-6 py-3 border-b border-[#dce4db] text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-[#3c4a3c] font-medium mb-1.5">
              Add <span className="font-bold">${remainingForFreeShipping.toFixed(2)}</span> more for complimentary shipping
            </p>
          ) : (
            <p className="text-[#3c4a3c] font-semibold flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>You unlocked Complimentary Carbon-Neutral Shipping!</span>
            </p>
          )}
          <div className="w-full bg-[#cbd8cb] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#516050] h-full transition-all duration-300"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#edeae7] flex items-center justify-center text-[#747872]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#1c1b1b]">Your bag is currently empty.</h3>
              <p className="text-xs text-[#747872] max-w-xs">
                Explore our botanical cleansers, restorative serums, and moisturizers to start your ritual.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('shop');
                }}
                className="mt-2 px-5 py-2.5 bg-[#516050] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#435042] transition-colors"
              >
                Discover Formulations
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white p-3.5 rounded-xl border border-[#ece8e5] flex gap-3.5 luxury-shadow-sm"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg bg-stone-100 shrink-0 border border-[#f0ece9]"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 flex flex-col justify-between text-xs">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#1c1b1b] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#747872]">{item.product.size || item.product.category}</p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#c4c8c0] rounded-lg bg-[#fcf9f8]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#edeae7] text-[#444842]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-[11px] font-semibold text-[#1c1b1b]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#edeae7] text-[#444842]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-serif font-semibold text-sm text-[#1c1b1b]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#ece8e5] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#444842]">
                <span>Subtotal</span>
                <span className="font-medium text-[#1c1b1b]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#444842]">
                <span>Estimated Shipping</span>
                <span className="font-medium">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '$5.00'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#ece8e5] flex justify-between font-serif text-base font-bold text-[#1c1b1b]">
              <span>Estimated Total</span>
              <span>${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 5)).toFixed(2)}</span>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#1c1b1b] text-white hover:bg-[#333] rounded-xl text-xs font-semibold uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigate('cart');
                }}
                className="w-full py-2.5 text-xs text-[#516050] font-medium hover:underline text-center"
              >
                View Full Bag & Ritual Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
