"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type FilterState = {
  search: string;
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  rating: number;
  colors: string[];
  availability: string;
  sort: string;
  view: "grid" | "list";
  page: number;
};

const DEFAULTS: FilterState = {
  search: "",
  categories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 1500,
  rating: 0,
  colors: [],
  availability: "",
  sort: "popular",
  view: "grid",
  page: 1,
};

function parseParams(params: URLSearchParams): FilterState {
  const get = (key: string) => params.get(key);

  const getAll = (key: string) =>
    params.getAll(key).flatMap((v) => v.split(",").filter(Boolean));

  return {
    search: get("search") ?? DEFAULTS.search,
    categories: getAll("category"),
    brands: getAll("brand"),
    minPrice:
      parseInt(get("minPrice") ?? String(DEFAULTS.minPrice), 10) ||
      DEFAULTS.minPrice,
    maxPrice:
      parseInt(get("maxPrice") ?? String(DEFAULTS.maxPrice), 10) ||
      DEFAULTS.maxPrice,
    rating:
      parseFloat(get("rating") ?? String(DEFAULTS.rating)) || DEFAULTS.rating,
    colors: getAll("color"),
    availability: get("availability") ?? DEFAULTS.availability,
    sort: get("sort") ?? DEFAULTS.sort,
    view: (get("view") as FilterState["view"]) ?? DEFAULTS.view,
    page: parseInt(get("page") ?? "1", 10) || 1,
  };
}

function buildSearch(state: FilterState): string {
  const params = new URLSearchParams();

  if (state.search) {
    params.set("search", state.search);
  }

  state.categories.forEach((c) => {
    params.append("category", c);
  });

  state.brands.forEach((b) => {
    params.append("brand", b);
  });

  if (state.minPrice !== DEFAULTS.minPrice) {
    params.set("minPrice", String(state.minPrice));
  }

  if (state.maxPrice !== DEFAULTS.maxPrice) {
    params.set("maxPrice", String(state.maxPrice));
  }

  if (state.rating > 0) {
    params.set("rating", String(state.rating));
  }

  state.colors.forEach((c) => {
    params.append("color", c);
  });

  if (state.availability) {
    params.set("availability", state.availability);
  }

  if (state.sort !== DEFAULTS.sort) {
    params.set("sort", state.sort);
  }

  if (state.view !== DEFAULTS.view) {
    params.set("view", state.view);
  }

  if (state.page !== 1) {
    params.set("page", String(state.page));
  }

  const str = params.toString();

  return str ? `?${str}` : "";
}

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL is the single source of truth
  const filters = useMemo(
    () => parseParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const setFilters = useCallback(
    (updater: Partial<FilterState> | ((prev: FilterState) => FilterState)) => {
      const next =
        typeof updater === "function"
          ? updater(filters)
          : {
              ...filters,
              ...updater,
              page: "page" in updater ? (updater.page ?? 1) : 1,
            };

      const search = buildSearch(next);

      console.log(search, "search");

      router.replace(`${pathname}${search}`, {
        scroll: false,
      });
    },
    [filters, pathname, router],
  );

  const clearAll = useCallback(() => {
    router.replace(pathname, {
      scroll: false,
    });
  }, [pathname, router]);

  return {
    filters,
    setFilters,
    clearAll,
    DEFAULTS,
  };
}
