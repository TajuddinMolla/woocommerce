"use server";

import { api } from "@/lib/http/woocommerce";
import { ProductFilters } from "./products.client";
import { handleServerError } from "@/lib/http/handleServerError";
import { WooProduct } from "./product.type";

export async function getProducts(filters: ProductFilters = {}) {
  try {
    const response = await api.get("products", {
      search: filters.search,
      page: filters.page || 1,
      per_page: filters.per_page,
      category: filters.category || undefined,
      tag: filters.tag || undefined,
      attribute: filters.attribute || undefined,
      attribute_term: filters.attribute_term || undefined,
      min_price: filters.min_price || undefined,
      max_price: filters.max_price || undefined,
      stock_status: filters.stock_status || undefined,
      order: filters.order || undefined,
      orderby: filters.orderby || undefined,
      featured: filters.featured || undefined,
      on_sale: filters.on_sale || undefined,
    });

    return {
      success: true,
      data: {
        products: response.data as WooProduct[],
        pagination: {
          total: Number(response.headers["x-wp-total"] || 0),
          totalPages: Number(response.headers["x-wp-totalpages"] || 0),
          page: Number(filters.page || 1),
          perPage: Number(filters.per_page || 10),
        },
      },
    };
  } catch (error) {
    return handleServerError(error, "Failed to fetch products");
  }
}

export async function getProduct(slug: string) {
  try {
    const response = await api.get("products", { slug });
    const products = response.data as WooProduct[];

    if (!products?.length) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    return {
      success: true,
      data: products[0],
    };
  } catch (error) {
    return handleServerError(error, "Failed to fetch product");
  }
}
