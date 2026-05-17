"use client";
import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { PRICE_RANGE } from "@/data/products";
import { AttributeFilterOption } from "@/services/attributes/attributes.type";
import { WooCategory } from "@/services/categories/categories.type";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { FilterState } from "@/services/products/products.client";
import { isPriceFilterActive } from "@/utils/filterProducts";
import { WooProductStockStatus } from "@/services/products/product.type";
import { useDebounce } from "@/hooks/useDebounce";

type SectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

function Section({ title, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-stone-300 pb-4 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors"
      >
        {title}
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && <div className="space-y-2 pt-1">{children}</div>}
    </div>
  );
}

export type FilterSidebarMetadata = {
  categories: WooCategory[];
  categoriesLoading: boolean;
  categoriesError: boolean;
  attributeOptions: AttributeFilterOption[];
  filterAttributes: { slug: string; name: string }[];
  attributesLoading: boolean;
  attributesError: boolean;
};

type Props = FilterSidebarMetadata & {
  filters: FilterState;
  setFilters: (
    u: Partial<FilterState> | ((p: FilterState) => FilterState),
  ) => void;
  clearAll: () => void;
};

export function FilterSidebar({
  filters,
  setFilters,
  clearAll,
  categories,
  categoriesLoading,
  categoriesError,
  attributeOptions,
  filterAttributes,
  attributesLoading,
  attributesError,
}: Props) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const [prevFiltersSearch, setPrevFiltersSearch] = useState(filters.search);
  if (filters.search !== prevFiltersSearch) {
    setPrevFiltersSearch(filters.search);
    setSearchInput(filters.search);
  }

  const debouncedSearchInput = useDebounce(searchInput, 500);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice,
    filters.maxPrice,
  ]);
  const [prevCommittedPrice, setPrevCommittedPrice] = useState({
    min: filters.minPrice,
    max: filters.maxPrice,
  });
  if (
    filters.minPrice !== prevCommittedPrice.min ||
    filters.maxPrice !== prevCommittedPrice.max
  ) {
    setPrevCommittedPrice({
      min: filters.minPrice,
      max: filters.maxPrice,
    });
    setPriceRange([filters.minPrice, filters.maxPrice]);
  }

  useEffect(() => {
    if (debouncedSearchInput !== filters.search) {
      setFilters({ search: debouncedSearchInput, page: 1 });
    }
  }, [debouncedSearchInput, filters.search, setFilters]);

  const toggleMulti = useCallback(
    (key: "categories" | "attributes", value: string) => {
      setFilters((prev) => {
        const arr = prev[key] as string[];
        return {
          ...prev,
          [key]: arr.includes(value)
            ? arr.filter((v) => v !== value)
            : [...arr, value],
          page: 1,
        };
      });
    },
    [setFilters],
  );

  const hasFilters =
    filters.search ||
    filters.categories.length ||
    filters.attributes.length ||
    isPriceFilterActive(filters.minPrice, filters.maxPrice);

  return (
    <aside className="w-full space-y-1">
      <div className="flex items-center justify-between mt-4 lg:mt-0 mb-4 ">
        <h2 className="text-base font-bold text-foreground">Filters</h2>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <X className="h-3 w-3" /> Clear all
          </button>
        )}
      </div>

      <Section title="Search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </Section>

      <Section title="Category">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {categoriesLoading ? (
            <p className="text-sm text-muted-foreground">Loading categories…</p>
          ) : categoriesError ? (
            <p className="text-sm text-destructive">
              Could not load categories
            </p>
          ) : categories.length === 0 ? (
            <p className="text-sm text-muted-foreground">No categories found</p>
          ) : (
            categories.map((cat) => {
              const value = cat.slug;
              return (
                <label
                  key={cat.slug}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters.categories.includes(value)}
                    onCheckedChange={() => toggleMulti("categories", value)}
                  />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                </label>
              );
            })
          )}
        </div>
      </Section>

      {attributesLoading && attributeOptions.length === 0 ? (
        <Section title="Attributes" defaultOpen={false}>
          <p className="text-sm text-muted-foreground">Loading attributes…</p>
        </Section>
      ) : attributesError ? (
        <Section title="Attributes" defaultOpen={false}>
          <p className="text-sm text-destructive">Could not load attributes</p>
        </Section>
      ) : (
        filterAttributes.map((attr) => {
          const terms = attributeOptions.filter(
            (o) => o.attributeSlug === attr.slug,
          );
          if (terms.length === 0) return null;

          return (
            <Section key={attr.slug} title={attr.name} defaultOpen={false}>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {terms.map((term) => (
                  <label
                    key={term.key}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <Checkbox
                      checked={filters.attributes.includes(term.key)}
                      onCheckedChange={() =>
                        toggleMulti("attributes", term.key)
                      }
                    />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {term.termName}
                    </span>
                  </label>
                ))}
              </div>
            </Section>
          );
        })
      )}

      <Section title="Price Range">
        <div className="px-1 pt-2">
          <Slider
            min={PRICE_RANGE.min}
            max={PRICE_RANGE.max}
            step={10}
            value={priceRange}
            onValueChange={(value) =>
              setPriceRange([value[0], value[1]])
            }
            onValueCommit={([min, max]) =>
              setFilters({ minPrice: min, maxPrice: max, page: 1 })
            }
            className="mb-3 h-1 bg-primary rounded-full"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              ${priceRange[0]}
            </span>
            <span className="font-medium text-foreground">
              ${priceRange[1]}
            </span>
          </div>
        </div>
      </Section>

      <Section title="Availability" defaultOpen={false}>
        <div className="space-y-2">
          {(
            [
              "",
              WooProductStockStatus.INSTOCK,
              WooProductStockStatus.OUTOFSTOCK,
            ] as const
          ).map((v) => {
            const label =
              v === ""
                ? "All"
                : v === WooProductStockStatus.INSTOCK
                  ? "In Stock"
                  : "Out of Stock";
            return (
              <label
                key={v ?? "all"}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="availability"
                  checked={(filters.availability ?? "") === v}
                  onChange={() =>
                    setFilters({
                      availability: v || undefined,
                      page: 1,
                    })
                  }
                  className="accent-primary"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      </Section>
    </aside>
  );
}
