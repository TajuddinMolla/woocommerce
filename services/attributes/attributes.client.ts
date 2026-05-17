import { useQuery } from "@tanstack/react-query";
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

async function fetchAttributeFilterOptions(): Promise<AttributeFilterOption[]> {
  const attributesResponse = await getAttributes();
  if (!attributesResponse.success) {
    throw new Error("Failed to fetch attributes");
  }

  const attributes = Array.isArray(attributesResponse.data)
    ? (attributesResponse.data as WooProductAttribute[])
    : [];

  const termsByAttribute = await Promise.all(
    attributes.map(async (attribute) => {
      const termsResponse = await getAttributeTerms(attribute.id);
      if (!termsResponse.success) return [];

      const terms = Array.isArray(termsResponse.data)
        ? (termsResponse.data as WooAttributeTerm[])
        : [];

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
    }),
  );

  return termsByAttribute.flat();
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
  const query = useQuery({
    queryKey: ["attribute-filter-options"],
    queryFn: fetchAttributeFilterOptions,
    placeholderData: (previousData) => previousData,
  });

  const options = query.data ?? [];
  const attributes = [...new Map(
    options.map((o) => [
      o.attributeSlug,
      { slug: o.attributeSlug, name: o.attributeName },
    ]),
  ).values()];

  return {
    options,
    attributes,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
