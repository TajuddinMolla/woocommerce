"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  RotateCcw,
  Shield,
  CheckCircle2,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PRODUCTS } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import { StarRating } from "../sections/star-rating";
import { COLOR_MAP } from "@/utils/colorMap";
import { EmptyState } from "@/components/empty-state";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <EmptyState
        title="Product not found."
        description="The product you are looking for does not exist."
      >
        <Link href="/" className="text-primary hover:underline">
          Browse all products
        </Link>
      </EmptyState>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${qty}× ${product.name} (${selectedColor}) added to your cart.`,
    });
  };

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: Math.round(
      product.reviewCount *
        Math.max(0, (star - 1) * 0.18 + (star === 5 ? 0.45 : 0) + 0.03),
    ),
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">
            All Products
          </Link>
          <span>/</span>
          <Link
            href={`/category/${encodeURIComponent(product.category)}`}
            className="hover:text-foreground transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1 max-w-xs">
            {product.name}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="space-y-3">
            <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-sm">
                    New Arrival
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge variant="destructive" className="text-sm">
                    -{discount}% OFF
                  </Badge>
                )}
              </div>
              {product.availability === "out-of-stock" && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <span className="text-xl font-bold text-muted-foreground bg-background/80 px-6 py-3 rounded-xl">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            {/* Thumbnail strip - repeated as visual detail */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${i === 1 ? "border-primary" : "border-transparent hover:border-muted-foreground/30"}`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/category/${encodeURIComponent(product.category)}`}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    {product.category}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {product.brand}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setWishlisted((w) => !w)}
                    className={`p-2 rounded-full border transition-colors ${wishlisted ? "border-red-300 bg-red-50 text-red-500" : "border-border hover:border-muted-foreground/50"}`}
                  >
                    <Heart
                      className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`}
                    />
                  </button>
                  <button className="p-2 rounded-full border border-border hover:border-muted-foreground/50 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mt-2 leading-snug">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <StarRating
                rating={product.rating}
                reviewCount={product.reviewCount}
                size="md"
              />
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                  <Badge variant="destructive" className="text-sm">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs capitalize"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Color picker */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Color:{" "}
                <span className="font-normal text-muted-foreground capitalize">
                  {selectedColor}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    className={`h-9 w-9 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedColor === color
                        ? "border-primary scale-110 shadow-md"
                        : "border-transparent shadow-sm hover:border-muted-foreground/30"
                    }`}
                    style={{ backgroundColor: COLOR_MAP[color] ?? "#ccc" }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MinusCircle className="h-6 w-6" />
                </button>
                <span className="w-10 text-center font-semibold text-lg">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <PlusCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3 pt-2">
              <Button
                size="lg"
                className="flex-1 gap-2"
                disabled={product.availability === "out-of-stock"}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.availability === "out-of-stock"
                  ? "Out of Stock"
                  : "Add to Cart"}
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Buy Now
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
              {[
                {
                  icon: <Truck className="h-4 w-4 text-green-500" />,
                  title: "Free Shipping",
                  sub: "On orders $50+",
                },
                {
                  icon: <RotateCcw className="h-4 w-4 text-blue-500" />,
                  title: "30-Day Returns",
                  sub: "Hassle-free",
                },
                {
                  icon: <Shield className="h-4 w-4 text-purple-500" />,
                  title: "2-Year Warranty",
                  sub: "Manufacturer",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center gap-1 p-2 rounded-lg "
                >
                  {item.icon}
                  <p className="text-xs font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rating breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-xl font-bold mb-5">Customer Reviews</h2>
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-foreground">
                  {product.rating.toFixed(1)}
                </p>
                <div className="flex justify-center mt-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {product.reviewCount.toLocaleString()} reviews
                </p>
              </div>
              <div className="flex-1 space-y-2">
                {ratingBreakdown.map(({ star, count }) => {
                  const pct =
                    product.reviewCount > 0
                      ? Math.round((count / product.reviewCount) * 100)
                      : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="w-3 text-muted-foreground text-right">
                        {star}
                      </span>
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400 shrink-0" />
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-7 text-xs text-muted-foreground text-right">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h2 className="text-xl font-bold mb-5">Product Highlights</h2>
            <div className="space-y-3">
              {[
                `Brand: ${product.brand}`,
                `Category: ${product.category}`,
                `Availability: ${product.availability === "in-stock" ? "In Stock" : "Out of Stock"}`,
                `Colors: ${product.colors.join(", ")}`,
                ...product.tags.map(
                  (t) =>
                    `Feature: ${t.charAt(0).toUpperCase() + t.slice(1).replace("-", " ")}`,
                ),
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">More in {product.category}</h2>
              <Link
                href={`/category/${encodeURIComponent(product.category)}`}
                className="text-sm text-primary hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => {
                const disc = p.originalPrice
                  ? Math.round(
                      ((p.originalPrice - p.price) / p.originalPrice) * 100,
                    )
                  : 0;
                return (
                  <div
                    key={p.id}
                    onClick={() => router.push(`/products/${p.slug}`)}
                    className="group cursor-pointer rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={1000}
                        height={1000}
                      />
                      <div className="absolute top-2 left-2 flex gap-1">
                        {p.isNew && (
                          <Badge className="text-xs bg-blue-500 hover:bg-blue-600 text-white">
                            New
                          </Badge>
                        )}
                        {disc > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            -{disc}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-3 space-y-1">
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                      <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <StarRating rating={p.rating} />
                      <p className="font-bold text-foreground">${p.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
