export enum WooProductAttributeOrderBy {
  MENU_ORDER = "menu_order",
  NAME = "name",
  NAME_NUM = "name_num",
  ID = "id",
}

export type WooProductAttribute = {
  id: number;
  name: string;
  slug: string;
  type: string;
  order_by: WooProductAttributeOrderBy;
  has_archives: boolean;
};

export type WooAttributeTerm = {
  id: number;
  name: string;
  slug: string;
  description: string;
  menu_order: number;
  count: number;
};

/** Flattened term with parent attribute metadata for filters. */
export type AttributeFilterOption = {
  key: string;
  attributeId: number;
  attributeSlug: string;
  attributeName: string;
  termId: number;
  termSlug: string;
  termName: string;
};
