"use client";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StarRating } from "./star-rating";
import { COLOR_MAP } from "@/utils/colorMap";
import { useState } from "react";
import { WooProduct } from "@/services/products/product.type";
const placeholder =
  "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600";
type Props = {
  product: WooProduct;
  view: "grid" | "list";
  onQuickView: (p: Product) => void;
};

const badgeStyles: Record<string, string> = {
  Featured: "bg-emerald-100 text-emerald-700",
};

export function ProductCard({ product, view }: Props) {
  const router = useRouter();
  const discount = product.regular_price
    ? Math.round(
        ((Number(product.regular_price) - Number(product.sale_price)) /
          Number(product.regular_price)) *
          100,
      )
    : 0;

  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  if (view === "list") {
    return (
      <div className="flex gap-4 rounded-xl border border-stone-300 bg-card p-4 hover:shadow-md transition-shadow group">
        <div className="relative w-36 h-36 shrink-0 rounded-lg bg-muted overflow-hidden">
          <Image
            src={product?.images[0]?.src || placeholder}
            alt={product.name}
            className="w-full h-full object-cover"
            width={144}
            height={144}
          />
          {product.stock_status === "outofstock" && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  {product.categories.find((c) => c.name === "Category")?.name}
                </p>
                <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </div>
              <div className="flex gap-1 shrink-0">
                {discount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    -{discount}%
                  </Badge>
                )}
              </div>
            </div>
            <StarRating
              rating={product.rating_count}
              reviewCount={product.rating_count}
            />
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">
                ${product.price || 0}
              </span>
              {product.regular_price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.regular_price || 0}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* <div className="flex gap-1">
                {product.attributes.slice(0, 4).map((a) => (
                  <span
                    key={a.id}
                    title={a.name}
                    className="h-4 w-4 rounded-full border border-stone-300 shadow-sm"
                    style={{ backgroundColor: COLOR_MAP[a.name] ?? "#ccc" }}
                  />
                ))}
              </div> */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/products/${product.slug}`)}
                className="h-8 gap-1.5"
              >
                <Eye className="h-3.5 w-3.5" /> View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={product.id}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-3/4">
        <Image
          src={product?.images[0]?.src || placeholder}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width={1000}
          height={1000}
        />

        {/* Badge */}
        {product.featured && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeStyles["Featured"]}`}
          >
            Featured
          </span>
        )}

        {/* Wishlist */}
        {/* <button
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
        </button> */}

        {/* Add to cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            onClick={() => router.push(`/products/${product.slug}`)}
            className="w-full cursor-pointer bg-stone-900 text-white py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors"
          >
            <Eye size={15} />
            View Details
          </Button>
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
            {product.rating_count} ({product.rating_count})
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-stone-900">
            ${product.price || 0}
          </span>
          {product.regular_price && (
            <span className="text-sm text-stone-400 line-through">
              ${product.regular_price || 0}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
