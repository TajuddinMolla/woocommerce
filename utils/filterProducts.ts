import { Product } from "@/data/products";
import { WooProductStockStatus } from "@/services/products/product.type";
import { FilterState } from "@/services/products/products.client";

export function isPriceFilterActive(minPrice: number, maxPrice: number) {
  return minPrice !== 0 || maxPrice !== 0;
}

export function filterAndSortProducts(
  products: Product[],
  filters: FilterState,
): Product[] {
  let result = [...products];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)),
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  if (filters.attributes.length > 0) {
    result = result.filter((p) => filters.attributes.includes(p.brand));
  }

  if (isPriceFilterActive(filters.minPrice, filters.maxPrice)) {
    result = result.filter((p) => {
      if (filters.minPrice !== 0 && p.price < filters.minPrice) return false;
      if (filters.maxPrice !== 0 && p.price > filters.maxPrice) return false;
      return true;
    });
  }

  if (filters.availability === WooProductStockStatus.INSTOCK) {
    result = result.filter((p) => p.availability === "in-stock");
  } else if (filters.availability === WooProductStockStatus.OUTOFSTOCK) {
    result = result.filter((p) => p.availability === "out-of-stock");
  }

  switch (filters.orderby) {
    case "price_asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "popular":
    default:
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }

  return result;
}
