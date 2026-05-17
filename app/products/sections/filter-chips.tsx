"use client";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCategories } from "@/services/categories/categories.client";
import { FilterState } from "@/services/products/products.client";
import { isPriceFilterActive } from "@/utils/filterProducts";

type Chip = { label: string; onRemove: () => void };

type Props = {
  filters: FilterState;
  setFilters: (
    u: Partial<FilterState> | ((p: FilterState) => FilterState),
  ) => void;
  clearAll: () => void;
  total: number;
};

export function FilterChips({ filters, setFilters, clearAll, total }: Props) {
  const { categories } = useCategories();
  const categoryLabel = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  const chips: Chip[] = [];

  if (filters.search)
    chips.push({
      label: `"${filters.search}"`,
      onRemove: () => setFilters({ search: "", page: 1 }),
    });
  filters.categories.forEach((c) =>
    chips.push({
      label: categoryLabel(c),
      onRemove: () =>
        setFilters((p) => ({
          ...p,
          categories: p.categories.filter((x) => x !== c),
          page: 1,
        })),
    }),
  );
  filters.attributes.forEach((b) =>
    chips.push({
      label: b,
      onRemove: () =>
        setFilters((p) => ({
          ...p,
          attributes: p.attributes.filter((x) => x !== b),
          page: 1,
        })),
    }),
  );
  if (isPriceFilterActive(filters.minPrice, filters.maxPrice)) {
    const maxLabel = filters.maxPrice === 0 ? "∞" : `$${filters.maxPrice}`;
    chips.push({
      label: `$${filters.minPrice}–${maxLabel}`,
      onRemove: () => setFilters({ minPrice: 0, maxPrice: 0, page: 1 }),
    });
  }
  // if (filters.rating > 0)
  //   chips.push({
  //     label: `${filters.rating}★ & up`,
  //     onRemove: () => setFilters({ rating: 0, page: 1 }),
  //   });
  // filters.colors.forEach((c) =>
  //   chips.push({
  //     label: c,
  //     onRemove: () =>
  //       setFilters((p) => ({
  //         ...p,
  //         colors: p.colors.filter((x) => x !== c),
  //         page: 1,
  //       })),
  //   }),
  // );
  if (filters.availability)
    chips.push({
      label: filters.availability === "instock" ? "In Stock" : "Out of Stock",
      onRemove: () => setFilters({ availability: undefined, page: 1 }),
    });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pb-3">
      <span className="text-xs text-muted-foreground mr-1">
        Active filters:
      </span>
      {chips.map((chip, i) => (
        <Badge
          key={i}
          variant="secondary"
          className="flex items-center gap-1 pr-1 text-xs"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <button
        onClick={clearAll}
        className="text-xs text-destructive hover:underline ml-1"
      >
        Clear all ({chips.length})
      </button>
    </div>
  );
}
