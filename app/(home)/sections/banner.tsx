import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left - Large banner */}
          <div className="relative rounded-3xl overflow-hidden group cursor-pointer h-96 lg:h-auto">
            <Image
              src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="New arrivals"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              width={1000}
              height={1000}
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="text-xs tracking-[0.2em] uppercase text-amber-400 font-semibold">
                New Collection
              </span>
              <h3
                className="text-3xl font-bold text-white mt-2 mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Summer Edit 2026
              </h3>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-amber-400 transition-all duration-300 group/btn"
              >
                Shop Collection
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </a>
            </div>
          </div>

          {/* Right - Two stacked banners */}
          <div className="grid grid-rows-2 gap-6">
            {/* Top */}
            <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
              <Image
                src="https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sale"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 bg-linear-to-r from-rose-900/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <span className="text-xs tracking-[0.2em] uppercase text-rose-300 font-semibold">
                  Up to 40% off
                </span>
                <h3
                  className="text-2xl font-bold text-white mt-1 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Summer Sale
                </h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-white font-semibold underline underline-offset-4 hover:text-rose-300 transition-colors w-fit"
                >
                  Shop Sale <ArrowRight size={13} />
                </a>
              </div>
            </div>

            {/* Bottom */}
            <div className="relative rounded-3xl overflow-hidden group cursor-pointer bg-stone-900">
              <Image
                src="https://images.pexels.com/photos/1381553/pexels-photo-1381553.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Accessories"
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <span className="text-xs tracking-[0.2em] uppercase text-amber-400 font-semibold">
                  Curated
                </span>
                <h3
                  className="text-2xl font-bold text-white mt-1 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Accessories Edit
                </h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-white font-semibold underline underline-offset-4 hover:text-amber-400 transition-colors w-fit"
                >
                  Explore Now <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
