"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/services/products/products.client";
import { WooProduct } from "@/services/products/product.type";
import { ProductCard } from "@/app/products/sections/product-card";
import { ProductCardSkeleton } from "@/app/products/sections/product-card-skeleton";

const filters = ["All", "New In", "Bestsellers", "Sale"];

const FEATURED_LIMIT = 8;

function filterProducts(
  products: WooProduct[],
  activeFilter: string,
): WooProduct[] {
  switch (activeFilter) {
    case "Sale":
      return products.filter((p) => p.on_sale);
    case "Bestsellers":
      return [...products].sort((a, b) => b.rating_count - a.rating_count);
    case "New In": {
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      return products.filter(
        (p) =>
          p.date_created &&
          new Date(p.date_created).getTime() > thirtyDaysAgo,
      );
    }
    default:
      return products;
  }
}

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");

  const { products, isLoading, isError } = useProducts({
    featured: true,
    per_page: FEATURED_LIMIT,
  });

  const filtered = filterProducts(products, activeFilter);

  return (
    <section id="featured" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: FEATURED_LIMIT }).map((_, i) => (
              <ProductCardSkeleton key={i} view="grid" />
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-stone-500 py-12">
            Unable to load featured products. Please try again later.
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-stone-500 py-12">
            No products match this filter.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                view="grid"
                onQuickView={() => {}}
              />
            ))}
          </div>
        )}

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
