export type WooCategoryImage = {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
};

export enum WooCategoryDisplay {
  DEFAULT = "default",
  PRODUCTS = "products",
  SUBCATEGORIES = "subcategories",
  BOTH = "both",
}

export type WooCategory = {
  id: number;
  name: string;
  slug: string;
  parent?: number;
  description?: string;
  display: WooCategoryDisplay;
  image?: WooCategoryImage;
  menu_order?: number;
  count?: number;
};
