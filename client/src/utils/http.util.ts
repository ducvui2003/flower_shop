function normalizeParam(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function normalizeSingleParam(
  value: string | string[] | undefined,
  defaultValue: string,
): string {
  if (!value) return defaultValue;
  return Array.isArray(value) ? (value?.[0] ?? defaultValue) : value;
}

export { normalizeParam, normalizeSingleParam };
