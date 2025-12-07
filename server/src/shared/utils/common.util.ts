import { Page } from '@/types/app';

export function applyPlaceholders(
  pattern: string,
  params: Record<string, string>,
): string {
  return pattern.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    return params[key] ?? '';
  });
}
export function applyPlaceholder(pattern: string, value: string): string {
  return pattern.replace(/:([a-zA-Z0-9_]+)/, value);
}
export function mapperItemsForPage<T, R>(
  page: Page<T>,
  converter: (item: T) => R,
): Page<R> {
  return {
    ...page,
    items: page.items.map((item) => converter(item)),
  };
}
