import React from 'react';
import { Droplet, Sparkles, Feather, ShieldCheck } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-24 bg-[#f6f3f2] border-y border-[#ebe6e3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#516050]">
            The Lumina Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1c1b1b] font-normal">
            Where Botanical Wisdom Meets Clinical Precision
          </h2>
          <p className="text-xs sm:text-sm text-[#444842] leading-relaxed">
            We formulate at the confluence of cold-pressed wild botanicals and biocompatible dermal science. Every element is tested to fortify without disruption.
          </p>
        </div>

        {/* 2-Column Luxury Story Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Card 1: Sustainable Sourcing */}
          <div className="bg-white rounded-2xl overflow-hidden luxury-shadow-sm border border-[#e5e1dd] flex flex-col justify-between">
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
                alt="Cold-pressed botanical sourcing"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#516050]">
                Clean Extraction
              </div>
            </div>
            <div className="p-8 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl font-medium text-[#1c1b1b]">
                  Sustainable, Cold-Extracted Actives
                </h3>
                <p className="text-xs sm:text-sm text-[#444842] leading-relaxed mt-2">
                  Our botanicals are gathered from certified organic high-altitude habitats during optimal flowering cycles. Cold-pressing preserves volatile phytosterols and delicate antioxidants.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-6 border-t border-[#f0ece9] text-xs text-[#747872]">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-[#516050]" />
                  <span>Micro-Filtered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4 text-[#516050]" />
                  <span>Low Carbon Footprint</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Uncompromised Texture */}
          <div className="bg-white rounded-2xl overflow-hidden luxury-shadow-sm border border-[#e5e1dd] flex flex-col justify-between">
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
                alt="Velvet botanical texture"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#516050]">
                Sensory Formulation
              </div>
            </div>
            <div className="p-8 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl font-medium text-[#1c1b1b]">
                  Uncompromised Texture & Absorption
                </h3>
                <p className="text-xs sm:text-sm text-[#444842] leading-relaxed mt-2">
                  We formulate each texture to sink seamlessly past the lipid bilayer, delivering instant nourishment without any sticky aftermath or occlusive film.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-6 border-t border-[#f0ece9] text-xs text-[#747872]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#516050]" />
                  <span>Biomimetic Lipids</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#516050]" />
                  <span>Dermatologist Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
