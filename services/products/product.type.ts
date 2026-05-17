import { WooProductAttribute } from "../attributes/attributes.type";
import { WooCategory } from "../categories/categories.type";

export type WooProductImage = {
  id: number;
  src: string;
  name: string;
  alt: string;
};

export type WooProductDefaultAttribute = {
  id: number;
  name: string;
  option: string;
};

export type WooProductDownload = {
  id: number;
  name: string;
  file: string;
};
export type WooProductTag = {
  id: number;
  name: string;
  slug: string;
};

export type WooProductBrand = {
  id: number;
  name: string;
  slug: string;
};

export enum WooProductCatalogVisibility {
  VISIBLE = "visible",
  CATALOG = "catalog",
  SEARCH = "search",
  HIDDEN = "hidden",
}

export enum WooProductStatus {
  DRAFT = "draft",
  PENDING = "pending",
  PRIVATE = "private",
  PUBLISH = "publish",
}

export enum WooProductType {
  SIMPLE = "simple",
  GROUPED = "grouped",
  EXTERNAL = "external",
  VARIABLE = "variable",
}

export enum WooProductStockStatus {
  INSTOCK = "instock",
  OUTOFSTOCK = "outofstock",
  ONBACKORDER = "onbackorder",
}

export enum WooProductBackorders {
  NO = "no",
  NOTIFY = "notify",
  YES = "yes",
}

export enum WooProductTaxStatus {
  TAXABLE = "taxable",
  SHIPPING = "shipping",
  NONE = "none",
}

export enum WooProductTaxClass {
  STANDARD = "standard",
  REDUCED_RATE = "reduced-rate",
  ZERO_RATE = "zero-rate",
}

export type WooProductMetaData = {
  id: number;
  key: string;
  value: string;
};
export type WooProductDimensions = {
  length: string | null;
  width: string | null;
  height: string | null;
};

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;

  type: WooProductType;
  status: WooProductStatus;

  featured: boolean;
  catalog_visibility: WooProductCatalogVisibility;

  description: string;
  short_description?: string;

  sku: string;

  price: string;
  regular_price: string;
  sale_price: string;

  on_sale: boolean;
  purchasable: boolean;

  stock_status: WooProductStockStatus;

  categories: WooCategory[];
  images: WooProductImage[];

  average_rating: string;
  rating_count: number;

  related_ids: number[];

  meta_data: WooProductMetaData[];

  date_created: string | null;
  date_modified: string | null;
  date_created_gmt: string | null;
  date_modified_gmt: string | null;

  variations: number[];
  grouped_products: number[];
  parent_id: number | null;
  purchase_note: string | null;
  tags: WooProductTag[];
  attributes: WooProductAttribute[];
  default_attributes: WooProductDefaultAttribute[];
  downloads: WooProductDownload[];
  download_limit: number;
  download_expiry: number;
  external_url: string | null;
  button_text: string | null;
  tax_status: WooProductTaxStatus;
  tax_class: WooProductTaxClass | null;
  manage_stock: boolean;
  stock_quantity: number | null;
  backorders: WooProductBackorders;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string | null;
  dimensions: WooProductDimensions | null;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string | null;
  shipping_class_id: number | null;
  menu_order: number;
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
