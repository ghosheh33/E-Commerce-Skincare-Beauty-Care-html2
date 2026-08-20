import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ViewMode } from '../../types';

interface HeroSectionProps {
  onNavigate: (view: ViewMode) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#fcf9f8] overflow-hidden">
      {/* Editorial Decorative Background Elements */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none bg-[radial-gradient(#d7ded5_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8ede7] text-[#3c4a3c] text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#516050]" />
              <span>Bio-Active Botanical Formulations</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1c1b1b] tracking-tight leading-[1.15]">
              Purity in <br />
              <span className="italic font-normal">Every Drop</span>
            </h1>

            <p className="text-sm sm:text-base text-[#444842] leading-relaxed max-w-lg mx-auto lg:mx-0">
              Discover clinical efficacy wrapped in botanical luxury. Our biocompatible formulations are designed to restore your skin's natural, radiant calm without compromise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                id="hero-btn-shop"
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#516050] text-white hover:bg-[#435042] text-xs font-semibold uppercase tracking-widest rounded-md transition-all shadow-sm flex items-center justify-center gap-2 group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-btn-treatments"
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#516050] text-[#516050] hover:bg-[#516050]/5 text-xs font-semibold uppercase tracking-widest rounded-md transition-all flex items-center justify-center"
              >
                Explore Treatments
              </button>
            </div>

            {/* Quick Botanical Badges */}
            <div className="pt-8 border-t border-[#ece8e5] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="font-serif text-lg font-semibold text-[#1c1b1b]">100%</p>
                <p className="text-[11px] text-[#747872] uppercase tracking-wider">Vegan Certified</p>
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-[#1c1b1b]">98.4%</p>
                <p className="text-[11px] text-[#747872] uppercase tracking-wider">Clinical Efficacy</p>
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-[#1c1b1b]">0%</p>
                <p className="text-[11px] text-[#747872] uppercase tracking-wider">Synthetic Fragrance</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Art Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Main Luxury Bottles Image */}
              <div className="relative rounded-2xl overflow-hidden luxury-shadow-lg aspect-[4/5] bg-stone-100 border border-[#e5e1dd]">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=85"
                  alt="Lumina Botanical Essence Serum"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Floating Tag Card on Image */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#516050]">Award Winner</span>
                    <h4 className="font-serif text-sm font-semibold text-[#1c1b1b]">Midnight Recovery Serum</h4>
                  </div>
                  <span className="font-serif font-bold text-[#1c1b1b] text-base">$85.00</span>
                </div>
              </div>

              {/* Floating Leaf Motif Accent */}
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-[#d7e7d3]/60 blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
