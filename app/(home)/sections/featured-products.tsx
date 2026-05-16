"use client";
import { useState } from "react";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const filters = ["All", "New In", "Bestsellers", "Sale"];

const products = [
  {
    id: 1,
    name: "Minimal Linen Blazer",
    price: 189,
    originalPrice: 240,
    rating: 4.8,
    reviews: 124,
    badge: "Sale",
    category: "Sale",
    image:
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Silk Wrap Dress",
    price: 225,
    rating: 4.9,
    reviews: 89,
    badge: "New In",
    category: "New In",
    image:
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Tailored Trousers",
    price: 145,
    rating: 4.7,
    reviews: 201,
    badge: "Bestseller",
    category: "Bestsellers",
    image:
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Cashmere Knit Top",
    price: 165,
    originalPrice: 200,
    rating: 4.6,
    reviews: 67,
    badge: "Sale",
    category: "Sale",
    image:
      "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Oversized Denim Jacket",
    price: 210,
    rating: 4.9,
    reviews: 312,
    badge: "Bestseller",
    category: "Bestsellers",
    image:
      "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Summer Floral Midi",
    price: 175,
    rating: 4.8,
    reviews: 55,
    badge: "New In",
    category: "New In",
    image:
      "https://images.pexels.com/photos/1381553/pexels-photo-1381553.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    name: "Classic White Shirt",
    price: 95,
    rating: 4.7,
    reviews: 445,
    badge: "Bestseller",
    category: "Bestsellers",
    image:
      "https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    name: "Satin Slip Skirt",
    price: 115,
    originalPrice: 145,
    rating: 4.5,
    reviews: 88,
    badge: "Sale",
    category: "Sale",
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const badgeStyles: Record<string, string> = {
  "New In": "bg-emerald-100 text-emerald-700",
  Bestseller: "bg-amber-100 text-amber-700",
  Sale: "bg-rose-100 text-rose-600",
};

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <section id="featured" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-2">
              Curated for you
            </p>
            <h2
              className="text-4xl font-bold text-stone-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Featured Pieces
            </h2>
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-stone-900 text-white shadow-md"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-3/4">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={1000}
                  height={1000}
                />

                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeStyles[product.badge]}`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
                >
                  <Heart
                    size={15}
                    className={
                      wishlist.includes(product.id)
                        ? "fill-rose-500 text-rose-500"
                        : "text-stone-400"
                    }
                  />
                </button>

                {/* View details overlay */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Link
                    href={`/products/slug`}
                    className="w-full bg-stone-900 text-white py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors"
                  >
                    <Eye size={15} />
                    View Details
                  </Link>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-stone-800 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs text-stone-500">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-base font-bold text-stone-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border-2 border-stone-900 text-stone-900 px-10 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-stone-900 hover:text-white transition-all duration-300"
          >
            Load More Products
          </Link>
        </div>
      </div>
    </section>
  );
}
