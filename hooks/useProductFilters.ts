"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterState } from "@/services/products/products.client";
import {
  DEFAULT_PRODUCT_FILTERS,
  parseProductFilters,
  serializeProductFilters,
} from "@/lib/product-filter-params";

export function useProductFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(
    () => parseProductFilters(searchParams),
    [searchParams],
  );

  const updateFilters = useCallback(
    (update: Partial<FilterState> | ((prev: FilterState) => FilterState)) => {
      const current = parseProductFilters(searchParams);
      const next =
        typeof update === "function" ? update(current) : { ...current, ...update };
      const query = serializeProductFilters(next);
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return { filters, updateFilters, clearAll, defaults: DEFAULT_PRODUCT_FILTERS };
}
