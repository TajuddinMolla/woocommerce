import { FilterState } from "@/services/products/products.client";
import { isPriceFilterActive } from "@/utils/filterProducts";

export const DEFAULT_PRODUCT_FILTERS: FilterState = {
  search: "",
  minPrice: 0,
  maxPrice: 0,
  orderby: "",
  page: 1,
  order: "desc",
  categories: [],
  attributes: [],
  view: "grid",
  availability: undefined,
  onSale: false,
};

const STOCK_STATUSES = ["instock", "outofstock", "onbackorder"] as const;
const VIEWS = ["grid", "list"] as const;

function parseIntParam(value: string | null, fallback = 0) {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

function parseList(value: string | null) {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseStockStatus(
  value: string | null,
): FilterState["availability"] {
  if (!value || value === "") return undefined;
  return STOCK_STATUSES.includes(value as (typeof STOCK_STATUSES)[number])
    ? (value as FilterState["availability"])
    : undefined;
}

function parseBool(value: string | null) {
  return value === "true" || value === "1";
}

function parseView(value: string | null) {
  if (!value) return DEFAULT_PRODUCT_FILTERS.view;
  return VIEWS.includes(value as (typeof VIEWS)[number])
    ? value
    : DEFAULT_PRODUCT_FILTERS.view;
}

export function parseProductFilters(
  searchParams: URLSearchParams,
): FilterState {
  const page = Math.max(1, parseIntParam(searchParams.get("page"), 1));

  return {
    search: searchParams.get("search") ?? "",
    minPrice: parseIntParam(searchParams.get("min_price")),
    maxPrice: parseIntParam(searchParams.get("max_price")),
    orderby: searchParams.get("orderby") ?? "",
    page,
    order: searchParams.get("order") ?? DEFAULT_PRODUCT_FILTERS.order,
    categories: parseList(
      searchParams.get("categories") ?? searchParams.get("category"),
    ),
    attributes: parseList(
      searchParams.get("brands") ??
        searchParams.get("brand") ??
        searchParams.get("attributes") ??
        searchParams.get("attribute"),
    ),
    view: parseView(searchParams.get("view")),
    availability: parseStockStatus(
      searchParams.get("stock") ?? searchParams.get("availability"),
    ),
    onSale: parseBool(searchParams.get("on_sale")),
  };
}

export function serializeProductFilters(filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);

  if (filters.categories.length) {
    params.set("categories", filters.categories.join(","));
  }

  if (filters.attributes.length) {
    params.set("brands", filters.attributes.join(","));
  }

  if (isPriceFilterActive(filters.minPrice, filters.maxPrice)) {
    if (filters.minPrice > 0) {
      params.set("min_price", String(filters.minPrice));
    }
    if (filters.maxPrice > 0) {
      params.set("max_price", String(filters.maxPrice));
    }
  }

  if (filters.page > 1) params.set("page", String(filters.page));

  if (filters.orderby) params.set("orderby", filters.orderby);

  if (filters.order !== DEFAULT_PRODUCT_FILTERS.order) {
    params.set("order", filters.order);
  }

  if (filters.availability) params.set("stock", filters.availability);

  if (filters.onSale) params.set("on_sale", "true");

  if (filters.view !== DEFAULT_PRODUCT_FILTERS.view) {
    params.set("view", filters.view);
  }

  return params.toString();
}
