import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  date: Date,
  pattern: "SHORT" | "LONG" | string = "SHORT"
) => {
  const patterns: Record<"SHORT" | "LONG", string> = {
    SHORT: "dd/MM/yyyy",
    LONG: "HH:mm dd/MM/yyyy",
  };

  const resolvedPattern =
    pattern === "SHORT" || pattern === "LONG" ? patterns[pattern] : pattern;

  return format(date, resolvedPattern, { locale: vi });
};

export const diffObjects = (
  current: any,
  original: any
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in current) {
    const cur = current[key];
    const orig = original?.[key];

    if (Array.isArray(cur)) {
      if (JSON.stringify(cur) !== JSON.stringify(orig)) {
        result[key] = cur;
      }
    } else if (
      typeof cur === "object" &&
      cur !== null &&
      typeof orig === "object"
    ) {
      const nested = diffObjects(cur, orig);
      if (Object.keys(nested).length > 0) {
        result[key] = nested;
      }
    } else if (cur !== orig) {
      result[key] = cur;
    }
  }

  return result;
};
