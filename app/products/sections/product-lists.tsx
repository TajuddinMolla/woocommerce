"use client";
import { useState } from "react";
import { Product, PRODUCTS } from "@/data/products";
import { useQueryParams } from "@/hooks/useQueryParams";
import { filterAndSortProducts } from "@/utils/filterProducts";
import { EmptyState } from "./empty-state";
import { FilterSidebar } from "./filter-sidebar";
import { Pagination } from "./pagination";
import { FilterChips } from "./filter-chips";
import { ProductToolbar } from "./product-toolbar";
import { ProductCard } from "./product-card";

const PAGE_SIZE = 12;

export default function ProductLists() {
  const { filters, setFilters, clearAll } = useQueryParams();
  const [_quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  const filtered = filterAndSortProducts(PRODUCTS, filters);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    (filters.rating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-[105px]">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                clearAll={clearAll}
              />
            </div>
          </aside>

          {/* Product area */}
          <div className="flex-1 min-w-0">
            <FilterChips
              filters={filters}
              setFilters={setFilters}
              clearAll={clearAll}
              total={PRODUCTS.length}
            />
            <ProductToolbar
              filters={filters}
              setFilters={setFilters}
              total={PRODUCTS.length}
              filtered={filtered.length}
            />

            {paged.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : (
              <>
                <div
                  className={
                    filters.view === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
                      : "flex flex-col gap-3 mt-4"
                  }
                >
                  {paged.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      view={filters.view}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={(p) => setFilters({ page: p })}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
