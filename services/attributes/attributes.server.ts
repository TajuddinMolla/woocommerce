"use server";

import { api } from "@/lib/http/woocommerce";
import { handleServerError } from "@/lib/http/handleServerError";

export async function getAttributes() {
  try {
    const response = await api.get("products/attributes");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleServerError(error, "Failed to fetch attributes");
  }
}

export async function getAttributeTerms(attributeId: number) {
  try {
    const response = await api.get(
      `products/attributes/${attributeId}/terms`,
      { per_page: 100 },
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleServerError(error, "Failed to fetch attribute terms");
  }
}
