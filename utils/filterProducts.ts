import { Product } from "@/data/products";
import { FilterState } from "@/hooks/useQueryParams";

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

  if (filters.brands.length > 0) {
    result = result.filter((p) => filters.brands.includes(p.brand));
  }

  result = result.filter(
    (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice,
  );

  if (filters.rating > 0) {
    result = result.filter((p) => p.rating >= filters.rating);
  }

  if (filters.colors.length > 0) {
    result = result.filter((p) =>
      p.colors.some((c) => filters.colors.includes(c)),
    );
  }

  if (filters.availability === "in-stock") {
    result = result.filter((p) => p.availability === "in-stock");
  } else if (filters.availability === "out-of-stock") {
    result = result.filter((p) => p.availability === "out-of-stock");
  }

  switch (filters.sort) {
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
