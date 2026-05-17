"use client";
import { useEffect, useRef } from "react";
import { PRODUCTS } from "@/data/products";
import {
  filterAndSortProducts,
  isPriceFilterActive,
} from "@/utils/filterProducts";
import { EmptyState } from "./empty-state";
import { FilterSidebar } from "./filter-sidebar";
import { Pagination } from "./pagination";
import { FilterChips } from "./filter-chips";
import { ProductToolbar } from "./product-toolbar";
import { ProductCard } from "./product-card";
import {
  categorySlugsToIds,
  useCategories,
} from "@/services/categories/categories.client";
import { useProducts } from "@/services/products/products.client";
import { useDebounce } from "@/hooks/useDebounce";
import { useProductFilters } from "@/hooks/useProductFilters";
import { ProductCardSkeleton } from "./product-card-skeleton";

const PAGE_SIZE = 12;

export default function ProductLists() {
  const { filters, updateFilters, clearAll } = useProductFilters();
  const { categories } = useCategories();

  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedMinPrice = useDebounce(filters.minPrice, 500);
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 500);

  const priceFilterActive = isPriceFilterActive(
    debouncedMinPrice,
    debouncedMaxPrice,
  );

  const { products, pagination, isLoading } = useProducts({
    search: debouncedSearch,
    min_price:
      priceFilterActive && debouncedMinPrice > 0
        ? debouncedMinPrice.toString()
        : undefined,
    max_price:
      priceFilterActive && debouncedMaxPrice > 0
        ? debouncedMaxPrice.toString()
        : undefined,
    orderby: filters.orderby,
    page: filters.page,
    per_page: PAGE_SIZE,
    order: filters.order as "asc" | "desc",
    category: categorySlugsToIds(filters.categories, categories) || undefined,
    attribute: filters.attributes.join(","),
    stock_status: filters.availability
      ? (filters.availability as
          | "instock"
          | "outofstock"
          | "onbackorder"
          | undefined)
      : undefined,
    on_sale: filters.onSale || undefined,
  });

  const filtered = filterAndSortProducts(PRODUCTS, filters);

  const categoryFilterKey = filters.categories.join(",");
  const attributeFilterKey = filters.attributes.join(",");

  const isFirstFilterRender = useRef(true);
  useEffect(() => {
    if (isFirstFilterRender.current) {
      isFirstFilterRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    filters.orderby,
    filters.order,
    categoryFilterKey,
    attributeFilterKey,
    filters.availability,
    filters.onSale,
    filters.page,
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-[105px]">
              <FilterSidebar
                filters={filters}
                setFilters={updateFilters}
                clearAll={clearAll}
              />
            </div>
          </aside>

          {/* Product area */}
          <div className="flex-1 min-w-0">
            <FilterChips
              filters={filters}
              setFilters={updateFilters}
              clearAll={clearAll}
              total={PRODUCTS.length}
            />
            <ProductToolbar
              filters={filters}
              setFilters={updateFilters}
              clearAll={clearAll}
              total={PRODUCTS.length}
              filtered={filtered.length}
            />

            {isLoading ? (
              <div
                className={
                  filters.view === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
                    : "flex flex-col gap-3 mt-4"
                }
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton
                    key={i}
                    view={filters.view as "grid" | "list"}
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : (
              <>
                <div
                  className={
                    filters.view === "grid"
                      ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
                      : "flex flex-col gap-3 mt-4"
                  }
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      view={filters.view as "grid" | "list"}
                      onQuickView={() => {}}
                    />
                  ))}
                </div>
                <Pagination
                  page={filters.page}
                  totalPages={pagination?.totalPages ?? 0}
                  onChange={(p) => updateFilters({ page: p })}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
