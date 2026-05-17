import { AttributeFilterOption } from "@/services/attributes/attributes.type";
import { categorySlugsToIds } from "@/services/categories/categories.client";
import { WooCategory } from "@/services/categories/categories.type";
import { WooProductStockStatus } from "@/services/products/product.type";
import {
  FilterState,
  ProductFilters,
} from "@/services/products/products.client";
import { selectedAttributeKeysToApiParams } from "@/services/attributes/attributes.client";
import { isPriceFilterActive } from "@/utils/filterProducts";

export function areFilterMetadataReady(
  filters: FilterState,
  categories: WooCategory[],
  attributeOptions: AttributeFilterOption[],
) {
  if (filters.categories.length > 0 && categories.length === 0) return false;
  if (filters.attributes.length > 0 && attributeOptions.length === 0) {
    return false;
  }
  return true;
}

export function buildProductQueryParams({
  filters,
  debouncedSearch,
  debouncedMinPrice,
  debouncedMaxPrice,
  categories,
  attributeOptions,
  pageSize,
}: {
  filters: FilterState;
  debouncedSearch: string;
  debouncedMinPrice: number;
  debouncedMaxPrice: number;
  categories: WooCategory[];
  attributeOptions: AttributeFilterOption[];
  pageSize: number;
}): ProductFilters {
  const priceFilterActive = isPriceFilterActive(
    debouncedMinPrice,
    debouncedMaxPrice,
  );
  const attributeParams = selectedAttributeKeysToApiParams(
    filters.attributes,
    attributeOptions,
  );

  return {
    search: debouncedSearch || undefined,
    min_price:
      priceFilterActive && debouncedMinPrice > 0
        ? debouncedMinPrice.toString()
        : undefined,
    max_price:
      priceFilterActive && debouncedMaxPrice > 0
        ? debouncedMaxPrice.toString()
        : undefined,
    orderby: filters.orderby || undefined,
    page: filters.page,
    per_page: pageSize,
    order: filters.order as "asc" | "desc",
    category: categorySlugsToIds(filters.categories, categories) || undefined,
    attribute: attributeParams.attribute,
    attribute_term: attributeParams.attribute_term,
    stock_status: filters.availability
      ? (filters.availability as
          | WooProductStockStatus.INSTOCK
          | WooProductStockStatus.OUTOFSTOCK
          | WooProductStockStatus.ONBACKORDER)
      : undefined,
    on_sale: filters.onSale || undefined,
  };
}
