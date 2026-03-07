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
export function mapperItems<T, R>(
  items: Array<T>,
  converter: (item: T) => R,
): Array<R> {
  return items.map((item) => converter(item));
}

export function cleanPatch<T extends object>(data: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined),
  ) as Partial<T>;
}

export function mergeObjects<T, U>(a?: T, b?: U): (T & U) | undefined {
  if (!a || !b) return undefined;
  return { ...a, ...b };
}

export function addDatetimePostfix(filename: string) {
  const dotIndex = filename.lastIndexOf('.');
  const name = dotIndex !== -1 ? filename.slice(0, dotIndex) : filename;
  const ext = dotIndex !== -1 ? filename.slice(dotIndex) : '';

  const now = new Date();

  const datetime =
    [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('') +
    '-' +
    [
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0'),
    ].join('');

  return `${name}-${datetime}${ext}`;
}
