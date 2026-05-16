"use client";
import { TrendingUp, Star, Tag, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { CATEGORIES, Product, PRODUCTS } from "@/data/products";
import Link from "next/link";
import { getCategoryMeta } from "@/data/categories";
import Image from "next/image";
import { StarRating } from "@/app/products/sections/star-rating";
import { COLOR_MAP } from "@/utils/colorMap";
import { EmptyState } from "@/components/empty-state";

const CATEGORY_ICONS: Record<string, string> = {
  Electronics: "🖥️",
  Footwear: "👟",
  Clothing: "👕",
  Accessories: "👜",
  Furniture: "🪑",
  Sports: "🏋️",
  Beauty: "💄",
  Kitchen: "🍳",
};

const CATEGORY_DESCS: Record<string, string> = {
  Electronics:
    "Cutting-edge gadgets, devices, and tech accessories for every lifestyle.",
  Footwear: "Step up your style with premium shoes for every occasion.",
  Clothing: "Timeless styles and modern essentials for your wardrobe.",
  Accessories: "Complete any look with our curated collection of accessories.",
  Furniture:
    "Ergonomic and stylish furniture for productive, comfortable spaces.",
  Sports:
    "Gear up for peak performance with top sports equipment and nutrition.",
  Beauty: "Premium skincare, makeup, and wellness products.",
  Kitchen: "Elevate your cooking with professional-grade kitchen tools.",
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const category = decodeURIComponent(slug ?? "");

  const catMeta = getCategoryMeta(category);
  const products = PRODUCTS.filter((p) => p.category === category);
  const brands = [...new Set(products.map((p) => p.brand))];
  const featured = products.filter((p) => p.isFeatured).slice(0, 3);
  const topRated = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const onSale = products.filter((p) => p.originalPrice).slice(0, 4);
  const avgPrice = products.length
    ? Math.round(products.reduce((s, p) => s + p.price, 0) / products.length)
    : 0;
  const avgRating = products.length
    ? (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)
    : "0";

  if (!CATEGORIES.includes(category)) {
    return (
      <EmptyState
        title="Category not found."
        description="The category you are looking for does not exist."
      >
        <Link href="/" className="text-primary hover:underline">
          Browse all products
        </Link>
      </EmptyState>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-linear-to-br from-secondary/10 via-secondary/5 to-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start gap-5">
            <div className="text-6xl">{CATEGORY_ICONS[category] ?? "📦"}</div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {category}
                </h1>
                <Badge variant="secondary" className="text-sm">
                  {products.length} products
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-xl">
                {CATEGORY_DESCS[category] ??
                  `Explore our ${category} collection.`}
              </p>
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-5">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                    Avg. Price
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    ${avgPrice}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                    Avg. Rating
                  </p>
                  <p className="text-xl font-bold text-foreground flex items-center gap-1">
                    {avgRating} <span className="text-amber-400">★</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                    Brands
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {brands.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Browse all CTA */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Brands in {category}
          </h2>
          <Link
            href={`/products/?category=${encodeURIComponent(category)}`}
            className="text-sm text-primary hover:underline font-medium"
          >
            Browse all {products.length} products →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 -mt-8">
          {brands.map((brand) => {
            const count = products.filter((p) => p.brand === brand).length;
            return (
              <Link
                key={brand}
                href={`/products/?category=${encodeURIComponent(category)}&brand=${encodeURIComponent(brand)}`}
              >
                <Badge
                  variant="outline"
                  className="text-sm py-1 px-3 cursor-pointer hover:border-primary hover:text-primary transition-colors"
                >
                  {brand}{" "}
                  <span className="ml-1 text-muted-foreground">({count})</span>
                </Badge>
              </Link>
            );
          })}
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <Section
            title="Featured"
            icon={<Flame className="h-4 w-4 text-orange-500" />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((p) => (
                <ProductMiniCard key={p.id} product={p} featured />
              ))}
            </div>
          </Section>
        )}

        {/* Top Rated */}
        {topRated.length > 0 && (
          <Section
            title="Top Rated"
            icon={<Star className="h-4 w-4 text-amber-400" />}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {topRated.map((p) => (
                <ProductMiniCard key={p.id} product={p} />
              ))}
            </div>
          </Section>
        )}

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <Section
            title="New Arrivals"
            icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {newArrivals.map((p) => (
                <ProductMiniCard key={p.id} product={p} />
              ))}
            </div>
          </Section>
        )}

        {/* On Sale */}
        {onSale.length > 0 && (
          <Section
            title="On Sale"
            icon={<Tag className="h-4 w-4 text-red-500" />}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {onSale.map((p) => (
                <ProductMiniCard key={p.id} product={p} />
              ))}
            </div>
          </Section>
        )}

        {/* Subcategory grid */}
        {catMeta && catMeta.subCategories.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Shop by Subcategory
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {catMeta.subCategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/categories/${encodeURIComponent(category)}/sub-categories/${sub.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="text-2xl">{sub.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {sub.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {sub.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Browse all CTA */}
        <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
          <h3 className="text-xl font-bold mb-2">
            Explore all {category} products
          </h3>
          <p className="text-muted-foreground mb-4">
            {`Filter, sort and find exactly what you're looking for.`}
          </p>
          <Link
            href={`/products/?category=${encodeURIComponent(category)}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Browse {products.length} Products
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ProductMiniCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  const router = useRouter();
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div
      onClick={() => router.push(`/products/${product.slug}`)}
      className={`group cursor-pointer rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 ${featured ? "flex gap-4 p-4" : "flex flex-col"}`}
    >
      <div
        className={`relative bg-muted overflow-hidden ${featured ? "w-28 h-28 shrink-0 rounded-lg" : "aspect-square"}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          width={1000}
          height={1000}
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {product.isNew && (
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
      </div>
      <div
        className={`flex flex-col ${featured ? "justify-center flex-1 min-w-0" : "p-3 gap-1"}`}
      >
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <StarRating
          rating={product.rating}
          reviewCount={featured ? product.reviewCount : undefined}
        />
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        {featured && (
          <div className="flex gap-1 mt-2">
            {product.colors.slice(0, 5).map((c: string) => (
              <span
                key={c}
                title={c}
                className="h-3.5 w-3.5 rounded-full border border-border"
                style={{ backgroundColor: COLOR_MAP[c] ?? "#ccc" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
