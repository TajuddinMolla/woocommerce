"use client";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { getCategoryMeta, getSubCategoryMeta } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { EmptyState } from "@/components/empty-state";
import Link from "next/link";
import Image from "next/image";
import { StarRating } from "@/app/products/sections/star-rating";
export default function SubCategoryPage() {
  const { slug, sub_slug } = useParams<{ slug: string; sub_slug: string }>();
  const router = useRouter();

  const catSlug = decodeURIComponent(slug ?? "");
  const subSlug = decodeURIComponent(sub_slug ?? "");
  const catMeta = getCategoryMeta(catSlug);
  const subMeta = getSubCategoryMeta(catSlug, subSlug);

  const products = PRODUCTS.filter(
    (p) =>
      p.category === catSlug && p.tags.some((t) => subMeta?.tags.includes(t)),
  );

  const brands = [...new Set(products.map((p) => p.brand))];

  if (!catMeta || !subMeta) {
    return (
      <EmptyState
        title="Subcategory not found."
        description="The subcategory you are looking for does not exist."
      >
        <Link href="/products" className="text-primary hover:underline">
          Browse all products
        </Link>
      </EmptyState>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${encodeURIComponent(catSlug)}`}
            className="hover:text-foreground transition-colors"
          >
            {catMeta.icon} {catMeta.name}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">
            {subMeta.icon} {subMeta.name}
          </span>
        </div>
      </div>

      {/* Hero */}
      <div
        className={`bg-linear-to-br from-secondary/50 to-secondary/20 border-b border-border`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <button
            onClick={() =>
              router.push(`/categories/${encodeURIComponent(catSlug)}`)
            }
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to {catMeta.name}
          </button>

          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-2xl bg-background/80 backdrop-blur flex items-center justify-center text-4xl shadow-lg border border-border/50">
              {subMeta.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {subMeta.name}
              </h1>
              <p className="text-muted-foreground mt-1 max-w-md">
                {subMeta.description}
              </p>

              {brands.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {brands.map((b) => (
                    <Badge
                      key={b}
                      variant="outline"
                      className="text-xs bg-background/60"
                    >
                      {b}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Stats row */}
        {products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Products", value: products.length },
              { label: "Brands", value: brands.length },
              {
                label: "Avg. Price",
                value: `$${Math.round(products.reduce((s, p) => s + p.price, 0) / products.length)}`,
              },
              {
                label: "Avg. Rating",
                value: `${(products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)} ★`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card p-4 text-center"
              >
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {products.length === 0 ? (
          <div className="py-16">
            <EmptyState
              title="No products found."
              description="Try adjusting your filters or search terms to find what you're looking for."
            />
          </div>
        ) : (
          <>
            {/* All products grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  All {subMeta.name} Products
                </h2>
                <Link
                  href={`/products/?category=${encodeURIComponent(catSlug)}`}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Browse with filters →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((p) => {
                  const discount = p.originalPrice
                    ? Math.round(
                        ((p.originalPrice - p.price) / p.originalPrice) * 100,
                      )
                    : 0;
                  return (
                    <div
                      key={p.id}
                      onClick={() => router.push(`/products/${p.id}`)}
                      className="group cursor-pointer rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div className="relative aspect-square bg-muted overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          width={1000}
                          height={1000}
                        />
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {p.isNew && (
                            <Badge className="text-xs bg-blue-500 hover:bg-blue-600 text-white">
                              New
                            </Badge>
                          )}
                          {discount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              -{discount}%
                            </Badge>
                          )}
                        </div>
                        {p.availability === "out-of-stock" && (
                          <div className="absolute inset-0 bg-background/50 flex items-end p-3">
                            <span className="text-xs font-semibold bg-background/80 px-2 py-1 rounded text-muted-foreground">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 space-y-1.5">
                        <p className="text-xs text-muted-foreground">
                          {p.brand}
                        </p>
                        <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {p.name}
                        </h3>
                        <StarRating
                          rating={p.rating}
                          reviewCount={p.reviewCount}
                        />
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="font-bold text-foreground">
                            ${p.price}
                          </span>
                          {p.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              ${p.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Browse full category CTA */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <ShoppingBag className="h-10 w-10 text-primary opacity-70" />
                <div>
                  <h3 className="font-bold text-foreground text-lg">
                    Want more options?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Explore all {catMeta.name} with full filtering & sorting.
                  </p>
                </div>
              </div>
              <Link
                href={`/products/?category=${encodeURIComponent(catSlug)}`}
                className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Browse all {catMeta.name}
              </Link>
            </div>
          </>
        )}

        {/* Other subcategories */}
        {catMeta.subCategories.filter((s) => s.slug !== subSlug).length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              More in {catMeta.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {catMeta.subCategories
                .filter((s) => s.slug !== subSlug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/categories/${encodeURIComponent(catSlug)}/sub-categories/${s.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {s.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {s.description}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
