"use client";
import { useEffect, useMemo, useRef } from "react";
import { EmptyState } from "./empty-state";
import { FilterSidebar, type FilterSidebarMetadata } from "./filter-sidebar";
import { Pagination } from "./pagination";
import { FilterChips } from "./filter-chips";
import { ProductToolbar } from "./product-toolbar";
import { ProductCard } from "./product-card";
import { useAttributeFilterOptions } from "@/services/attributes/attributes.client";
import { useCategories } from "@/services/categories/categories.client";
import { useProducts } from "@/services/products/products.client";
import { useDebounce } from "@/hooks/useDebounce";
import { useProductFilters } from "@/hooks/useProductFilters";
import { ProductCardSkeleton } from "./product-card-skeleton";
import {
  areFilterMetadataReady,
  buildProductQueryParams,
} from "@/lib/product-query-params";

const PAGE_SIZE = 12;

export default function ProductLists() {
  const { filters, updateFilters, clearAll } = useProductFilters();
  const {
    categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();
  const {
    options: attributeOptions,
    attributes: filterAttributes,
    isLoading: attributesLoading,
    isError: attributesError,
  } = useAttributeFilterOptions();

  const filterMetadata: FilterSidebarMetadata = {
    categories,
    categoriesLoading,
    categoriesError,
    attributeOptions,
    filterAttributes,
    attributesLoading,
    attributesError,
  };

  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedMinPrice = useDebounce(filters.minPrice, 500);
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 500);

  const productQueryParams = useMemo(
    () =>
      buildProductQueryParams({
        filters,
        debouncedSearch,
        debouncedMinPrice,
        debouncedMaxPrice,
        categories,
        attributeOptions,
        pageSize: PAGE_SIZE,
      }),
    [
      filters,
      debouncedSearch,
      debouncedMinPrice,
      debouncedMaxPrice,
      categories,
      attributeOptions,
    ],
  );

  const filterMetaReady = areFilterMetadataReady(
    filters,
    categories,
    attributeOptions,
  );

  const { products, pagination, isLoading } = useProducts(productQueryParams, {
    enabled: filterMetaReady,
  });

  const showLoading = !filterMetaReady || isLoading;
  const resultCount = pagination?.total ?? products.length;

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
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-[105px]">
              <FilterSidebar
                filters={filters}
                setFilters={updateFilters}
                clearAll={clearAll}
                {...filterMetadata}
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <FilterChips
              filters={filters}
              setFilters={updateFilters}
              clearAll={clearAll}
              categories={categories}
              attributeOptions={attributeOptions}
            />
            <ProductToolbar
              filters={filters}
              setFilters={updateFilters}
              clearAll={clearAll}
              resultCount={resultCount}
              filterMetadata={filterMetadata}
            />

            {showLoading ? (
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