import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./categories.server";
import { WooCategory } from "./categories.type";

/** Map category slugs to WooCommerce API category IDs (comma-separated). */
export function categorySlugsToIds(
  slugs: string[],
  categories: WooCategory[],
): string {
  return slugs
    .map((slug) => categories.find((c) => c.slug === slug)?.id)
    .filter((id): id is number => id !== undefined)
    .join(",");
}

export function useCategories() {
  const query = useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const response = await getCategories();

      if (!response.success) {
        throw new Error("Failed to fetch categories");
      }

      const data = response.data;
      return Array.isArray(data) ? (data as WooCategory[]) : [];
    },

    placeholderData: (previousData) => previousData,
  });

  return {
    categories: query.data ?? [],

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,

    refetch: query.refetch,
  };
}
