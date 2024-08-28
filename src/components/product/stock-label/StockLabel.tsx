"use client";

import { getStockBySlug } from "@/actions/product/get-stock-by-slug";
import { titleFont } from "@/config/fonts";
import React, { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoanding, setIsLoanding] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);

    setStock(inStock);
    setIsLoanding(false);
  };

  if (isLoanding) return "cargando...";

  return <h1 className={`${titleFont.className} antialiased text-md`}>Stock: {stock}</h1>;
};
