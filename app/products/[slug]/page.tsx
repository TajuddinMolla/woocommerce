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
import Link from "next/link";
import Image from "next/image";
import { StarRating } from "../sections/star-rating";
import { EmptyState } from "@/components/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useProduct,
  useProducts,
} from "@/services/products/products.client";
import { WooImage, WooProduct } from "@/services/products/product.type";
import { ProductCard } from "../sections/product-card";

const PLACEHOLDER_IMAGE =
  "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600";

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function isNewProduct(dateCreated: string | null) {
  if (!dateCreated) return false;
  const created = new Date(dateCreated);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return created > thirtyDaysAgo;
}

function getProductImage(product: WooProduct) {
  return product.images[0]?.src || PLACEHOLDER_IMAGE;
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-4 w-16 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { toast } = useToast();

  const { product, isLoading, isError } = useProduct(slug);

  const categoryId = product?.categories[0]?.id;
  const { products: relatedProducts } = useProducts({
    category: categoryId ? String(categoryId) : undefined,
    per_page: 5,
    exclude: product ? [product.id] : undefined,
  });

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError || !product) {
    return (
      <EmptyState
        title="Product not found."
        description="The product you are looking for does not exist."
      >
        <Link href="/products" className="text-primary hover:underline">
          Browse all products
        </Link>
      </EmptyState>
    );
  }

  return (
    <ProductDetailContent
      key={slug}
      product={product}
      relatedProducts={relatedProducts}
      router={router}
      toast={toast}
    />
  );
}

type ProductDetailContentProps = {
  product: WooProduct;
  relatedProducts: WooProduct[];
  router: ReturnType<typeof useRouter>;
  toast: ReturnType<typeof useToast>["toast"];
};

function ProductDetailContent({
  product,
  relatedProducts,
  router,
  toast,
}: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const image = getProductImage(product);
  const fallbackImage: WooImage = {
    id: 0,
    src: PLACEHOLDER_IMAGE,
    name: product.name,
    alt: product.name,
  };
  const images =
    product.images.length > 0 ? product.images : [fallbackImage];
  const category = product.categories[0];
  const categoryName = category?.name ?? "Uncategorized";
  const categorySlug = category?.slug ?? "";
  const price = Number(product.price) || 0;
  const regularPrice =
    product.on_sale && product.regular_price
      ? Number(product.regular_price)
      : undefined;
  const discount =
    regularPrice && regularPrice > price
      ? Math.round(((regularPrice - price) / regularPrice) * 100)
      : 0;
  const rating = Number(product.average_rating) || 0;
  const reviewCount = product.rating_count || 0;
  const description = stripHtml(
    product.short_description || product.description || "",
  );
  const isNew = isNewProduct(product.date_created);
  const isOutOfStock = product.stock_status !== "instock";
  const brand =
    product.meta_data.find((m) => m.key === "brand")?.value ?? product.sku;

  const related = relatedProducts.slice(0, 4);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${qty}× ${product.name} added to your cart.`,
    });
  };

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: Math.round(
      reviewCount *
        Math.max(0, (star - 1) * 0.18 + (star === 5 ? 0.45 : 0) + 0.03),
    ),
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/products" className="hover:text-foreground transition-colors">
            All Products
          </Link>
          <span>/</span>
          {categorySlug && (
            <>
              <Link
                href={`/categories/${encodeURIComponent(categorySlug)}`}
                className="hover:text-foreground transition-colors"
              >
                {categoryName}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground font-medium line-clamp-1 max-w-xs">
            {product.name}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div className="space-y-3">
            <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden">
              <Image
                src={images[selectedImage]?.src || image}
                alt={product.name}
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {isNew && (
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-sm">
                    New Arrival
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge variant="destructive" className="text-sm">
                    -{discount}% OFF
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm">
                    Featured
                  </Badge>
                )}
              </div>
              {isOutOfStock && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <span className="text-xl font-bold text-muted-foreground bg-background/80 px-6 py-3 rounded-xl">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((img, i) => (
                  <button
                    key={`${img.src}-${i}`}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${i === selectedImage ? "border-primary" : "border-transparent hover:border-muted-foreground/30"}`}
                  >
                    <Image
                      src={img.src}
                      alt={product.name}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  {categorySlug && (
                    <Link
                      href={`/categories/${encodeURIComponent(categorySlug)}`}
                      className="text-sm text-primary font-medium hover:underline"
                    >
                      {categoryName}
                    </Link>
                  )}
                  {brand && (
                    <p className="text-sm text-muted-foreground">{brand}</p>
                  )}
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

            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <StarRating rating={rating} reviewCount={reviewCount} size="md" />
              <span className="text-sm text-muted-foreground">
                ({reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">${price}</span>
              {regularPrice && regularPrice > price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${regularPrice}
                  </span>
                  <Badge variant="destructive" className="text-sm">
                    Save ${(regularPrice - price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            {description && (
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}

            {product.on_sale && (
              <Badge variant="secondary" className="text-xs w-fit">
                On Sale
              </Badge>
            )}

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

            <div className="flex gap-3 pt-2">
              <Button
                size="lg"
                className="flex-1 gap-2"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Buy Now
              </Button>
            </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-xl font-bold mb-5">Customer Reviews</h2>
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-foreground">
                  {rating.toFixed(1)}
                </p>
                <div className="flex justify-center mt-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {reviewCount.toLocaleString()} reviews
                </p>
              </div>
              <div className="flex-1 space-y-2">
                {ratingBreakdown.map(({ star, count }) => {
                  const pct =
                    reviewCount > 0
                      ? Math.round((count / reviewCount) * 100)
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

          <div>
            <h2 className="text-xl font-bold mb-5">Product Highlights</h2>
            <div className="space-y-3">
              {[
                brand && `Brand: ${brand}`,
                `Category: ${categoryName}`,
                `Availability: ${isOutOfStock ? "Out of Stock" : "In Stock"}`,
                product.sku && `SKU: ${product.sku}`,
                product.featured && "Featured product",
                product.on_sale && "Currently on sale",
              ]
                .filter(Boolean)
                .map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">More in {categoryName}</h2>
              {categorySlug && (
                <Link
                  href={`/categories/${encodeURIComponent(categorySlug)}`}
                  className="text-sm text-primary hover:underline"
                >
                  View all →
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  view="grid"
                  onQuickView={() => {}}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
