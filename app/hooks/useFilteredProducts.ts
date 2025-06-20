import { useMemo } from "react";
import type { ProductType } from "./types";

export function useFilteredProducts(
  products: ProductType[],
  query: string
): ProductType[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    const tokens = q.split(/\s+/);
    return products.filter((p) => {
      const haystack = (p.name + " " + p.cars.join(" ")).toLowerCase();
      return tokens.every((t) => haystack.includes(t));
    });
  }, [products, query]);
}
