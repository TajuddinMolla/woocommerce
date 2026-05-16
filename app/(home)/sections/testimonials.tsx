import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Emily R.',
    location: 'New York, USA',
    rating: 5,
    text: 'The quality of every piece I\'ve ordered has been exceptional. The linen blazer fits like it was made for me. I\'ve already recommended LUMIÈRE to all my friends.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Marcus T.',
    location: 'London, UK',
    rating: 5,
    text: 'Finally a brand that offers both style and sustainability. The packaging is beautiful, delivery was incredibly fast, and the clothes feel premium.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Sofia L.',
    location: 'Paris, France',
    rating: 5,
    text: 'I ordered three items and they all arrived in perfect condition. The silk dress is exactly as pictured — the color is stunning. Will definitely be ordering again.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-amber-400 font-medium mb-3">What they say</p>
          <h2
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Loved by thousands
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="text-stone-300 text-sm ml-2">4.9 average from 2,800+ reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-stone-800 rounded-2xl p-7 hover:bg-stone-700 transition-colors duration-300 relative"
            >
              <Quote size={28} className="text-amber-500 mb-4 opacity-60" />
              <p className="text-stone-300 text-sm leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-500/30"
                  width={1000}
                  height={1000}
                />
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-stone-500 text-xs">{t.location}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
