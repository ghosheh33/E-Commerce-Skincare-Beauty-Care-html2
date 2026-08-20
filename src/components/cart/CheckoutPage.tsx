import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Printer,
  ChevronRight
} from 'lucide-react';
import { CartItem, Order, UserProfile, ViewMode } from '../../types';

interface CheckoutPageProps {
  items: CartItem[];
  user: UserProfile;
  onClearCart: () => void;
  onOrderCompleted: (order: Order) => void;
  onNavigate: (view: ViewMode) => void;
  onViewInvoice: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  user,
  onClearCart,
  onOrderCompleted,
  onNavigate,
  onViewInvoice,
}) => {
  // Form fields
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [street, setStreet] = useState(user.address.street);
  const [city, setCity] = useState(user.address.city);
  const [state, setState] = useState(user.address.state);
  const [postalCode, setPostalCode] = useState(user.address.postalCode);
  const [country, setCountry] = useState('United States');
  const [phone, setPhone] = useState(user.phone);

  // Discount code
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountError, setDiscountError] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/26');
  const [cardCvc, setCardCvc] = useState('389');
  const [cardHolder, setCardHolder] = useState(user.name);

  // Order Complete confirmation state
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = rawSubtotal * appliedDiscount;
  const subtotal = rawSubtotal - discountAmount;
  const shipping = subtotal >= 50 ? 0 : 5.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === 'LUMINA10') {
      setAppliedDiscount(0.10);
      setDiscountError('');
    } else if (discountCode.trim().toUpperCase() === 'RITUAL20') {
      setAppliedDiscount(0.20);
      setDiscountError('');
    } else {
      setDiscountError('Invalid botanical code. Try LUMINA10');
    }
  };

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `#LS-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      customerName: `${firstName} ${lastName}`,
      customerEmail: email,
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
        size: item.product.size || '30ml',
      })),
      subtotal: subtotal,
      tax: tax,
      shipping: shipping,
      total: total,
      status: 'Processing',
      shippingAddress: {
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
      },
    };

    onOrderCompleted(newOrder);
    onClearCart();
    setCompletedOrder(newOrder);
  };

  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-[#e8ede7] text-[#3c4a3c] mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-[#516050]">
          Order Confirmed • Sanctuary Ritual Prepared
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1b1b]">
          Thank You, {firstName}
        </h1>

        <p className="text-xs sm:text-sm text-[#444842] leading-relaxed max-w-md mx-auto">
          We have received your order <span className="font-mono font-semibold text-[#1c1b1b]">{completedOrder.id}</span>. A confirmation email and tracking itinerary have been dispatched to <span className="font-semibold text-[#1c1b1b]">{email}</span>.
        </p>

        <div className="p-6 bg-white rounded-2xl border border-[#ece8e5] luxury-shadow-sm text-left text-xs space-y-3">
          <div className="flex justify-between border-b border-[#ece8e5] pb-3">
            <span className="text-[#747872]">Order Number:</span>
            <span className="font-mono font-semibold text-[#1c1b1b]">{completedOrder.id}</span>
          </div>
          <div className="flex justify-between border-b border-[#ece8e5] pb-3">
            <span className="text-[#747872]">Shipping Destination:</span>
            <span className="font-medium text-[#1c1b1b]">{completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#747872]">Total Paid:</span>
            <span className="font-serif font-bold text-sm text-[#1c1b1b]">${completedOrder.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => onViewInvoice(completedOrder)}
            className="w-full sm:w-auto px-6 py-3 bg-[#edeae7] text-[#1c1b1b] hover:bg-[#e2dfdb] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>View Full Official Invoice</span>
          </button>

          <button
            onClick={() => onNavigate('shop')}
            className="w-full sm:w-auto px-8 py-3 bg-[#516050] text-white hover:bg-[#435042] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Checkout Breadcrumb Steps */}
      <div className="mb-10 flex items-center justify-between border-b border-[#ece8e5] pb-6">
        <div>
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center gap-1 text-xs text-[#516050] font-medium hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Bag</span>
          </button>
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-[#747872]">Information</span>
            <ChevronRight className="w-3 h-3 text-[#747872]" />
            <span className="text-[#747872]">Shipping</span>
            <ChevronRight className="w-3 h-3 text-[#747872]" />
            <span className="text-[#1c1b1b] font-semibold">Payment</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#516050] bg-[#e8ede7] px-3 py-1.5 rounded-full font-medium">
          <Lock className="w-3.5 h-3.5" />
          <span>Secure Botanical Checkout</span>
        </div>
      </div>

      <form onSubmit={handleCompletePurchase} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Contact Section */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-medium text-[#1c1b1b]">
              1. Contact Information
            </h2>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#444842]">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-medium text-[#1c1b1b]">
              2. Shipping Destination
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#444842]">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#444842]">Last Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#444842]">Street Address</label>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#444842]">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#444842]">State</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                />
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-xs font-medium text-[#444842]">Postal Code</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#444842]">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-medium text-[#1c1b1b]">
                3. Payment Details
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                    paymentMethod === 'card'
                      ? 'bg-[#1c1b1b] text-white'
                      : 'bg-[#edeae7] text-[#444842]'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                    paymentMethod === 'paypal'
                      ? 'bg-[#1c1b1b] text-white'
                      : 'bg-[#edeae7] text-[#444842]'
                  }`}
                >
                  PayPal
                </button>
              </div>
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#444842]">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#444842]">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                    />
                    <CreditCard className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#444842]">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#444842]">CVV Security Code</label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-[#f7f5f3] rounded-xl text-center text-xs text-[#444842] space-y-2">
                <p>You will be securely redirected to PayPal to authorize payment after clicking complete purchase.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary with Discounts */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#ece8e5] luxury-shadow space-y-6">
          <h2 className="font-serif text-lg font-medium text-[#1c1b1b]">
            Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)})
          </h2>

          {/* Mini Items Stack */}
          <div className="divide-y divide-[#ece8e5] max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-[#ece8e5]"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -top-1.5 -right-1.5 bg-[#516050] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-[#1c1b1b] line-clamp-1">{item.product.name}</h4>
                    <p className="text-[11px] text-[#747872]">{item.product.size}</p>
                  </div>
                </div>
                <span className="font-serif font-medium text-[#1c1b1b]">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Promo Code Input */}
          <div className="space-y-1.5 pt-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (Try LUMINA10)"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-xs text-[#1c1b1b] uppercase tracking-wider focus:outline-none focus:border-[#516050]"
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                className="px-4 py-2 bg-[#edeae7] text-[#1c1b1b] hover:bg-[#e2dfdb] rounded-xl text-xs font-semibold"
              >
                Apply
              </button>
            </div>
            {discountError && <p className="text-[11px] text-red-600">{discountError}</p>}
            {appliedDiscount > 0 && (
              <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{appliedDiscount * 100}% Botanical discount code applied!</span>
              </p>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2.5 text-xs border-t border-[#ece8e5] pt-4">
            <div className="flex justify-between text-[#444842]">
              <span>Subtotal</span>
              <span>${rawSubtotal.toFixed(2)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Discount ({appliedDiscount * 100}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#444842]">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-[#444842]">
              <span>Estimated Sales Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-serif text-lg font-bold text-[#1c1b1b] pt-2 border-t border-[#ece8e5]">
              <span>Total Due</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Complete Purchase Button */}
          <button
            type="submit"
            className="w-full py-4 bg-[#1c1b1b] text-white hover:bg-[#333] rounded-xl text-xs font-semibold uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 group"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Complete Ritual Order</span>
          </button>
        </div>
      </form>
    </div>
  );
};
