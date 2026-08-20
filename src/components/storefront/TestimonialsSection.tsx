import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const stories = [
    {
      author: 'Elena M.',
      role: 'Verified Buyer • Portland, OR',
      headline: 'Restored my reactive skin after years of trial.',
      content:
        'The Radiance Serum and Cloud Barrier Cream have completely altered my skin barrier. Redness that used to flare after cleansing is gone, and the morning finish is sheer velvet.',
      rating: 5,
      product: 'Midnight Recovery Serum',
    },
    {
      author: 'Sarah K.',
      role: 'Verified Buyer • Brooklyn, NY',
      headline: 'A truly calming sensorial ritual every night.',
      content:
        'Lumina feels like a high-end spa in my bathroom. The texture is lightweight yet deeply nourishing. My skin stays hydrated throughout whole 12-hour flights without flaking.',
      rating: 5,
      product: 'Deep Moisture Cream',
    },
  ];

  return (
    <section className="py-20 bg-[#fcf9f8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#516050]">
            Radiant Testimonies
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1c1b1b] font-normal">
            Reflections From Our Community
          </h2>
          <p className="text-xs sm:text-sm text-[#444842]">
            Authentic experiences from daily ritual practitioners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="bg-white p-8 sm:p-10 rounded-2xl luxury-shadow border border-[#ece8e5] relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#516050]/20" />
                </div>

                <h4 className="font-serif text-lg font-medium text-[#1c1b1b]">
                  "{story.headline}"
                </h4>

                <p className="text-xs sm:text-sm text-[#444842] leading-relaxed italic">
                  "{story.content}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#f0ece9] flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5 font-medium text-[#1c1b1b]">
                    <span>{story.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#516050]" />
                  </div>
                  <p className="text-[#747872] text-[11px]">{story.role}</p>
                </div>

                <span className="px-2.5 py-1 bg-[#e8ede7] text-[#3c4a3c] rounded text-[10px] font-semibold">
                  {story.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
