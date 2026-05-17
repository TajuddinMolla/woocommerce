import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "./products.server";
import {
  WooProduct,
  WooProductStatus,
  WooProductStockStatus,
  WooProductTaxClass,
  WooProductType,
} from "./product.type";

export type FilterState = {
  search: string;
  minPrice: number;
  maxPrice: number;
  orderby: string;
  page: number;
  order: string;
  categories: string[];
  attributes: string[];
  availability: WooProductStockStatus | undefined;
  onSale: boolean;
  view: string;
};

export type ProductFilters = {
  context?: "view" | "edit";
  page?: number;
  per_page?: number;

  search?: string;
  search_fields?: Array<
    "name" | "sku" | "global_unique_id" | "description" | "short_description"
  >;

  after?: string;
  before?: string;
  modified_after?: string;
  modified_before?: string;
  dates_are_gmt?: boolean;

  exclude?: number[];
  include?: number[];
  offset?: number;

  order?: "asc" | "desc";
  orderby?: string;

  parent?: number[];
  parent_exclude?: number[];

  slug?: string;
  status?: WooProductStatus | undefined;
  include_status?: string;
  exclude_status?: string;

  type?: WooProductType | undefined;
  include_types?: string;
  exclude_types?: string;

  sku?: string;
  featured?: boolean;

  category?: string;
  tag?: string;
  shipping_class?: string;

  attribute?: string;
  attribute_term?: string;

  tax_class?: WooProductTaxClass | undefined;

  on_sale?: boolean;

  min_price?: string;
  max_price?: string;

  stock_status?: WooProductStockStatus | undefined;

  virtual?: boolean;
  downloadable?: boolean;
};

export function useProducts(
  filters: ProductFilters = {},
  options?: { enabled?: boolean },
) {
  const query = useQuery({
    queryKey: ["products", filters],

    queryFn: async () => {
      const response = await getProducts(filters);

      if (!response.success) {
        throw new Error("Failed to fetch products");
      }

      return response.data;
    },

    enabled: options?.enabled !== false,
    placeholderData: (previousData) => previousData,
  });

  return {
    products: query.data?.products || [],
    pagination: query.data?.pagination,

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,

    refetch: query.refetch,
  };
}

export function useProduct(slug: string) {
  const query = useQuery({
    queryKey: ["product", slug],
    queryFn: async (): Promise<WooProduct> => {
      const response = await getProduct(slug);
      if (!response.success || !("data" in response) || !response.data) {
        throw new Error(
          "message" in response ? response.message : "Failed to fetch product",
        );
      }
      return response.data;
    },
    enabled: !!slug,
  });

  return {
    product: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,

    refetch: query.refetch,
  };
}
