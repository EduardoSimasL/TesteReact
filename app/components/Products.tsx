"use client";

import React, { useState, ChangeEvent } from "react";
import { useProducts } from "../hooks/useProducts";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import type { ProductType } from "../hooks/types";

const SPEC_FIELDS: Array<{
  key: keyof ProductType;
  label: string;
}> = [
    { key: "treadwear", label: "Durabilidade" },
    { key: "traction", label: "Tração" },
    { key: "temperature", label: "Temperatura" },
    { key: "speedRating", label: "Índice de velocidade" },
    { key: "loadIndex", label: "Capacidade de Carga" },
    { key: "pattern", label: "Desenho" },
  ];

function ProductCard({ product }: { product: ProductType }) {
  return (
    <article
      tabIndex={0}
      className="
        group flex flex-col sm:flex-row items-center
        bg-white dark:bg-gray-800
        rounded-2xl shadow-card p-4
        space-y-4 sm:space-y-0 sm:space-x-4
        text-gray-900 dark:text-gray-100
        cursor-pointer transform transition duration-150
        hover:scale-105 hover:shadow-lg
      "
    >
      <figure className="flex-shrink-0 text-center sm:text-left">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-contain mx-auto sm:mx-0"
        />
        <figcaption className="mt-2 font-semibold">
          {product.model}
        </figcaption>
      </figure>

      <div className="flex-1 sm:border-l-[3px] sm:pl-4 sm:border-gray-900 dark:border-gray-200">
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          {SPEC_FIELDS.map(({ key, label }) => (
            <div key={String(key)}>
              <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
              <dd className="font-semibold text-gray-800 dark:text-gray-200">
                {product[key]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export default function Products() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const filtered = useFilteredProducts(products, search);

  return (
    <div className="px-4 py-6">
      <div className="max-w-md mx-auto mb-6">
        <label htmlFor="search" className="sr-only">
          Pesquisar produtos
        </label>
        <input
          id="search"
          type="text"
          placeholder="Pesquisar produtos"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="
            w-full border border-gray-300 dark:border-gray-600
            rounded px-4 py-2 focus:outline-none 
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
          "
        />
      </div>

      {error && (
        <p className="text-red-500 text-center mb-6">
          Erro ao carregar produtos
        </p>
      )}

      {!loading && !error && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
        </p>
      )}

      <ul
        role="list"
        data-testid="products"
        className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2"
      >
        {loading ? (
          <li className="col-span-full text-center">Carregando…</li>
        ) : filtered.length > 0 ? (
          filtered.map((p) => (
            <li key={p.name} data-testid="product">
              <ProductCard product={p} />
            </li>
          ))
        ) : (
          !error && (
            <li className="col-span-full text-center">
              Nenhum produto encontrado
            </li>
          )
        )}
      </ul>
    </div>
  );
}