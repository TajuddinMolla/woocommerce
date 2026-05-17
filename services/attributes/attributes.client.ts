import { useQueries, useQuery } from "@tanstack/react-query";
import { getAttributeTerms, getAttributes } from "./attributes.server";
import {
  AttributeFilterOption,
  WooAttributeTerm,
  WooProductAttribute,
} from "./attributes.type";

export function attributeFilterKey(attributeSlug: string, termSlug: string) {
  return `${attributeSlug}:${termSlug}`;
}

export function toAttributeTaxonomySlug(slug: string) {
  return slug.startsWith("pa_") ? slug : `pa_${slug}`;
}

export function selectedAttributeKeysToApiParams(
  keys: string[],
  options: AttributeFilterOption[],
): { attribute?: string; attribute_term?: string } {
  if (!keys.length || !options.length) return {};

  const selected = keys
    .map((key) => options.find((o) => o.key === key))
    .filter((o): o is AttributeFilterOption => o !== undefined);

  if (!selected.length) return {};

  const byAttribute = new Map<string, AttributeFilterOption[]>();
  for (const option of selected) {
    const list = byAttribute.get(option.attributeSlug) ?? [];
    list.push(option);
    byAttribute.set(option.attributeSlug, list);
  }

  const [firstSlug, firstTerms] = [...byAttribute.entries()][0];
  return {
    attribute: toAttributeTaxonomySlug(firstSlug),
    attribute_term: firstTerms.map((t) => t.termId).join(","),
  };
}

async function fetchAttributeTerms(
  attributeId: number,
): Promise<WooAttributeTerm[]> {
  const response = await getAttributeTerms(attributeId);
  if (!response.success) {
    throw new Error("Failed to fetch attribute terms");
  }
  return Array.isArray(response.data)
    ? (response.data as WooAttributeTerm[])
    : [];
}

export function useAttributeTerms(
  attributeId: number,
  options?: { enabled?: boolean },
) {
  const query = useQuery({
    queryKey: ["attribute-terms", attributeId],
    queryFn: () => fetchAttributeTerms(attributeId),
    enabled: options?.enabled !== false && attributeId > 0,
  });

  return {
    terms: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useAttributes() {
  const query = useQuery({
    queryKey: ["attributes"],
    queryFn: async () => {
      const response = await getAttributes();
      if (!response.success) {
        throw new Error("Failed to fetch attributes");
      }
      const data = response.data;
      return Array.isArray(data) ? (data as WooProductAttribute[]) : [];
    },
    placeholderData: (previousData) => previousData,
  });

  return {
    attributes: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useAttributeFilterOptions() {
  const {
    attributes: wooAttributes,
    isLoading: attributesListLoading,
    isFetching: attributesListFetching,
    isError: attributesListError,
  } = useAttributes();

  const termQueries = useQueries({
    queries: wooAttributes.map((attribute) => ({
      queryKey: ["attribute-terms", attribute.id],
      queryFn: () => fetchAttributeTerms(attribute.id),
      enabled: wooAttributes.length > 0,
    })),
  });

  const options = wooAttributes.flatMap((attribute, index) => {
    const terms = termQueries[index]?.data ?? [];
    return terms.map(
      (term): AttributeFilterOption => ({
        key: attributeFilterKey(attribute.slug, term.slug),
        attributeId: attribute.id,
        attributeSlug: attribute.slug,
        attributeName: attribute.name,
        termId: term.id,
        termSlug: term.slug,
        termName: term.name,
      }),
    );
  });

  const filterAttributes = wooAttributes.map((attr) => ({
    slug: attr.slug,
    name: attr.name,
  }));

  const termsLoading = termQueries.some((q) => q.isLoading);
  const termsFetching = termQueries.some((q) => q.isFetching);
  const termsError = termQueries.some((q) => q.isError);

  return {
    options,
    attributes: filterAttributes,
    isLoading: attributesListLoading || termsLoading,
    isFetching: attributesListFetching || termsFetching,
    isError: attributesListError || termsError,
    error: termQueries.find((q) => q.error)?.error,
    refetch: () => {
      termQueries.forEach((q) => void q.refetch());
    },
  };
}
