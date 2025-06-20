import { useState, useEffect } from "react";
import type { ProductType } from "./types";

export function useProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch("/api/products")
      .then((res) => res.json())            
      .then((data: ProductType[]) => {
        setProducts(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}
