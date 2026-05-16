"use client";
import { useCallback } from "react";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useState } from "react";
import { FilterState } from "@/hooks/useQueryParams";
import { BRANDS, CATEGORIES, COLORS, PRICE_RANGE } from "@/data/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { COLOR_MAP } from "@/utils/colorMap";

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

type Props = {
  filters: FilterState;
  setFilters: (
    u: Partial<FilterState> | ((p: FilterState) => FilterState),
  ) => void;
  clearAll: () => void;
};

export function FilterSidebar({ filters, setFilters, clearAll }: Props) {
  const toggleMulti = useCallback(
    (key: "categories" | "brands" | "colors", value: string) => {
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
    filters.brands.length ||
    filters.colors.length ||
    filters.availability ||
    filters.rating > 0 ||
    filters.minPrice !== 0 ||
    filters.maxPrice !== PRICE_RANGE.max;

  return (
    <aside className="w-full space-y-1">
      <div className="flex items-center justify-between mb-4">
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

      {/* Search */}
      <Section title="Search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value, page: 1 })}
            className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </Section>

      {/* Category */}
      <Section title="Category">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Checkbox
                checked={filters.categories.includes(cat)}
                onCheckedChange={() => toggleMulti("categories", cat)}
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </Section>

      {/* Brand */}
      <Section title="Brand" defaultOpen={false}>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Checkbox
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleMulti("brands", brand)}
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </Section>

      {/* Price Range */}
      <Section title="Price Range">
        <div className="px-1 pt-2">
          <Slider
            min={PRICE_RANGE.min}
            max={PRICE_RANGE.max}
            step={10}
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={([min, max]) =>
              setFilters({ minPrice: min, maxPrice: max, page: 1 })
            }
            className="mb-3 h-1 bg-primary rounded-full"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              ${filters.minPrice}
            </span>
            <span className="font-medium text-foreground">
              ${filters.maxPrice}
            </span>
          </div>
        </div>
      </Section>

      {/* Rating */}
      <Section title="Minimum Rating">
        <div className="space-y-1.5">
          {[4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() =>
                setFilters({
                  rating: filters.rating === star ? 0 : star,
                  page: 1,
                })
              }
              className={`flex items-center gap-2 w-full rounded px-2 py-1 text-sm transition-colors ${
                filters.rating === star
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted"
              }`}
            >
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < star ? "text-amber-400" : "text-muted-foreground/30"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              <span className="text-muted-foreground">& up</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Color */}
      <Section title="Color" defaultOpen={false}>
        <div className="flex flex-wrap gap-2 pt-1">
          {COLORS.map((color) => (
            <button
              key={color}
              title={color}
              onClick={() => toggleMulti("colors", color)}
              className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                filters.colors.includes(color)
                  ? "border-primary shadow-md scale-110"
                  : "border-transparent shadow-sm"
              }`}
              style={{ backgroundColor: COLOR_MAP[color] ?? "#ccc" }}
            />
          ))}
        </div>
        {filters.colors.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            {filters.colors.join(", ")}
          </p>
        )}
      </Section>

      {/* Availability */}
      <Section title="Availability" defaultOpen={false}>
        <div className="space-y-2">
          {(["", "in-stock", "out-of-stock"] as const).map((v) => {
            const label =
              v === "" ? "All" : v === "in-stock" ? "In Stock" : "Out of Stock";
            return (
              <label
                key={v ?? "all"}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === v}
                  onChange={() => setFilters({ availability: v, page: 1 })}
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
