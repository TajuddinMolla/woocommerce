"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterSidebar } from "./filter-sidebar";
import { FilterState } from "@/services/products/products.client";
import { isPriceFilterActive } from "@/utils/filterProducts";

function countActiveFilters(filters: FilterState) {
  let count = 0;
  if (filters.search) count++;
  count += filters.categories.length;
  count += filters.attributes.length;
  if (isPriceFilterActive(filters.minPrice, filters.maxPrice)) count++;
  if (filters.availability) count++;
  if (filters.onSale) count++;
  return count;
}

type Props = {
  filters: FilterState;
  setFilters: (
    u: Partial<FilterState> | ((p: FilterState) => FilterState),
  ) => void;
  clearAll: () => void;
};

export function MobileFilterSheet({ filters, setFilters, clearAll }: Props) {
  const activeCount = countActiveFilters(filters);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden shrink-0">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full gap-0 overflow-y-auto p-0 sm:max-w-sm">
        <SheetTitle></SheetTitle>
        <div className="flex min-h-full flex-col p-6">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            clearAll={clearAll}
          />
          <SheetFooter className="sticky bottom-0 -mx-6 border-t border-border bg-background px-6 py-4">
            <SheetClose asChild>
              <Button className="w-full">Show results</Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
