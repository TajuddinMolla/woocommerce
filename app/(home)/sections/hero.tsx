import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[88vh] items-center">
          {/* Text */}
          <div className="py-20 lg:py-0 lg:pr-16 z-10">
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-stone-500 font-medium mb-6 border border-stone-300 px-3 py-1 rounded-full">
              Summer Collection 2026
            </span>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] text-stone-900 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Dress for
              <br />
              <em className="not-italic text-amber-600">the moment</em>
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-md mb-10">
              Thoughtfully crafted pieces for the modern wardrobe. Timeless
              style, conscious materials, effortless wear.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#featured"
                className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-stone-700 transition-all duration-300 hover:gap-4 group"
              >
                Shop Now
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-800 px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:border-stone-900 transition-all duration-300"
              >
                View Lookbook
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-16">
              {[
                { value: "2,400+", label: "Styles" },
                { value: "98%", label: "Satisfied customers" },
                { value: "48hr", label: "Fast shipping" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-stone-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="hidden lg:flex relative h-full min-h-[88vh] items-center justify-center">
            <div className="relative w-full h-full">
              {/* Main image */}
              <div className="absolute inset-y-8 right-0 left-12 rounded-3xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Hero fashion"
                  className="w-full h-full object-cover object-top"
                  width={1000}
                  height={1000}
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-stone-900/20" />
              </div>

              {/* Floating card */}
              <div className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-2xl p-4 w-48 z-10">
                <div className="text-xs text-stone-400 mb-1">Trending now</div>
                <div className="text-sm font-semibold text-stone-800">
                  Linen Blazer
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-amber-600 font-bold">$129</span>
                  <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                    -20%
                  </span>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-16 left-2 bg-amber-500 text-white rounded-2xl shadow-xl px-4 py-3 z-10">
                <div className="text-lg font-bold">New In</div>
                <div className="text-xs opacity-80">340+ styles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile hero image */}
      <div className="lg:hidden w-full h-72 -mt-4 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=900"
          alt="Hero fashion"
          className="w-full h-full object-cover object-top"
          width={1000}
          height={1000}
        />
      </div>
    </section>
  );
}
