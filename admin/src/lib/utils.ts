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
