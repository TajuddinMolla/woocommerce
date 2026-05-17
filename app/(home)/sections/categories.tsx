"use client";

import Image from "next/image";
import Link from "next/link";
import { useCategories } from "@/services/categories/categories.client";
import { WooCategory } from "@/services/products/product.type";

const CATEGORY_LIMIT = 4;

const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600";

const OVERLAY_COLOR = "from-stone-800/60";

function isDisplayCategory(cat: WooCategory) {
  return cat.slug !== "uncategorized";
}

function categoryHref(slug: string) {
  const params = new URLSearchParams();
  params.set("categories", slug);
  return `/products?${params}`;
}

function formatCount(count?: number) {
  if (count === undefined) return "";
  const label = count === 1 ? "product" : "products";
  return `${count.toLocaleString()} ${label}`;
}

export default function Categories() {
  const { categories, isLoading, isError } = useCategories();

  const displayCategories = categories
    .filter(isDisplayCategory)
    .filter((c) => (c.parent ?? 0) === 0)
    .slice(0, CATEGORY_LIMIT);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-2">
              Shop by
            </p>
            <h2
              className="text-4xl font-bold text-stone-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Category
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex text-sm font-medium text-stone-600 hover:text-stone-900 underline underline-offset-4 transition-colors"
          >
            View all products
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: CATEGORY_LIMIT }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl aspect-3/4 bg-stone-200 animate-pulse"
              />
            ))}
          </div>
        ) : isError || displayCategories.length === 0 ? (
          <p className="text-center text-stone-500 py-12">
            Unable to load categories. Please try again later.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {displayCategories.map((cat) => (
              <Link
                key={cat.id}
                href={categoryHref(cat.slug)}
                className="group relative rounded-2xl overflow-hidden aspect-3/4 cursor-pointer"
              >
                <Image
                  src={DEFAULT_IMAGE}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={600}
                  height={800}
                />
                <div
                  className={`absolute inset-0 bg-linear-to-t ${OVERLAY_COLOR} to-transparent`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div
                    className="text-white font-bold text-xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {cat.name}
                  </div>
                  {cat.count !== undefined && (
                    <div className="text-stone-300 text-xs mt-1">
                      {formatCount(cat.count)}
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-amber-400 rounded-2xl transition-all duration-300" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
