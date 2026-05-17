export type WooImage = {
  id: number;
  src: string;
  name: string;
  alt: string;
};

export type WooCategory = {
  id: number;
  name: string;
  slug: string;
};

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;

  type: "simple" | "grouped" | "external" | "variable";
  status: "draft" | "pending" | "private" | "publish";

  featured: boolean;
  catalog_visibility: "visible" | "catalog" | "search" | "hidden";

  description: string;
  short_description?: string;

  sku: string;

  price: string;
  regular_price: string;
  sale_price: string;

  on_sale: boolean;
  purchasable: boolean;

  stock_status: "instock" | "outofstock" | "onbackorder";

  categories: WooCategory[];
  images: WooImage[];

  average_rating: string;
  rating_count: number;

  related_ids: number[];

  meta_data: {
    id: number;
    key: string;
    value: string;
  }[];

  date_created: string | null;
  date_modified: string | null;
};

export type ProductPagination = {
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
};

export type ProductsResponse = {
  success: boolean;
  data: {
    products: WooProduct[];
    pagination: ProductPagination;
  };
  message?: string;
};
