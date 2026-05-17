"use server";

import { api } from "@/lib/http/woocommerce";
import { handleServerError } from "@/lib/http/handleServerError";

export async function getCategories() {
  try {
    const response = await api.get("products/categories");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleServerError(error, "Failed to fetch products");
  }
}
