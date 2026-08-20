import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Leaf, HeartHandshake, Check } from 'lucide-react';
import { ViewMode } from '../../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#191d19] text-[#e3e7e2] pt-16 pb-12 border-t border-[#293029]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Promise Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-14 border-b border-[#2d362d] text-center md:text-left">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#273227] flex items-center justify-center text-[#9db49b] shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-white font-medium text-base">Wild-Harvested Botanicals</h4>
              <p className="text-xs text-[#a0aba0] mt-1 leading-relaxed">
                Ethically foraged active ingredients harvested in peak bloom for maximal potency.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#273227] flex items-center justify-center text-[#9db49b] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-white font-medium text-base">Clinical Precision</h4>
              <p className="text-xs text-[#a0aba0] mt-1 leading-relaxed">
                Triple-tested dermal formulas delivering biocompatible barrier restoration.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#273227] flex items-center justify-center text-[#9db49b] shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-white font-medium text-base">Zero Animal Testing</h4>
              <p className="text-xs text-[#a0aba0] mt-1 leading-relaxed">
                100% cruelty-free, vegan certified, and bottled in recyclable miron glass.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12">
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl font-semibold tracking-[0.18em] text-white">
              LUMINA
            </span>
            <p className="text-xs text-[#a0aba0] leading-relaxed max-w-sm">
              Discover clinical efficacy wrapped in luxury. Botanical skincare formulations designed for calm, radiant, resilient skin.
            </p>
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-widest text-[#798879]">Sanctuary Headquarters</span>
              <p className="text-xs text-[#c2cbc2] mt-0.5">Portland • Paris • Kyoto</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif text-white text-sm font-semibold tracking-wide">Explore</h5>
            <ul className="space-y-2 text-xs text-[#a0aba0]">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Shop All Rituals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Cleansers & Toners
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Radiance Serums
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Moisture Crèmes
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif text-white text-sm font-semibold tracking-wide">Sanctuary Care</h5>
            <ul className="space-y-2 text-xs text-[#a0aba0]">
              <li>
                <button onClick={() => onNavigate('sanctuary')} className="hover:text-white transition-colors">
                  My Orders & Tracking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sanctuary')} className="hover:text-white transition-colors">
                  My Botanical Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sanctuary')} className="hover:text-white transition-colors">
                  Ritual Reflections
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sanctuary')} className="hover:text-white transition-colors">
                  Skin Diagnostics
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h5 className="font-serif text-white text-sm font-semibold tracking-wide">Join The Botanical Circle</h5>
            <p className="text-xs text-[#a0aba0] leading-relaxed">
              Receive complimentary skincare guidance, private seasonal releases, and 15% off your first ritual order.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#273227] text-white text-xs px-4 py-3 rounded-md border border-[#3b473b] placeholder-[#7e8d7e] focus:outline-none focus:border-[#9db49b]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#516050] text-white text-xs rounded font-medium hover:bg-[#627361] transition-colors flex items-center gap-1"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#a7d4a5] font-medium pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Welcome to Lumina. Check your inbox for your welcome ritual.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#293029] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#798879] gap-4">
          <p>© {new Date().getFullYear()} Lumina Skin Botanical Laboratories. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Ritual</span>
            <span className="hover:text-white cursor-pointer transition-colors">Sustainability Index</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
