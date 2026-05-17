"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LayoutGrid, List } from "lucide-react";
import { FilterState } from "@/services/products/products.client";
import { MobileFilterSheet } from "./mobile-filter-sheet";

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Top Rated" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

type Props = {
  filters: FilterState;
  setFilters: (
    u: Partial<FilterState> | ((p: FilterState) => FilterState),
  ) => void;
  clearAll: () => void;
  total: number;
  filtered: number;
};

export function ProductToolbar({
  filters,
  setFilters,
  clearAll,
  total,
  filtered,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-3 pb-3 border-b border-stone-300">
      <div className="flex min-w-0 items-center gap-2">
        <MobileFilterSheet
          filters={filters}
          setFilters={setFilters}
          clearAll={clearAll}
        />
        <p className="text-sm text-muted-foreground truncate">
          <span className="font-semibold text-foreground">{filtered}</span>
          {filtered !== total && <span> of {total}</span>} product
          {filtered !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Select
          value={filters.orderby}
          onValueChange={(v) => setFilters({ orderby: v, page: 1 })}
        >
          <SelectTrigger className="h-9 w-36 sm:w-44 text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex rounded-md border border-input overflow-hidden">
          <button
            onClick={() => setFilters({ view: "grid" })}
            className={`px-2.5 py-2 transition-colors ${filters.view === "grid" ? "bg-primary text-white" : "bg-background text-muted-foreground hover:bg-muted"}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setFilters({ view: "list" })}
            className={`px-2.5 py-2 transition-colors ${filters.view === "list" ? "bg-primary text-white" : "bg-background text-muted-foreground hover:bg-muted"}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
