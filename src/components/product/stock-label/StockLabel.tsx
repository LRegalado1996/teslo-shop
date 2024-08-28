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

  return (
    <>
      {isLoanding ? (
        <div
          className={`${titleFont.className} w-full antialiased text-md bg-gray-200 animate-pulse`}
        >
          &nbsp;
        </div>
      ) : (
        <span className={`${titleFont.className} antialiased text-md`}>Stock: {stock}</span>
      )}
    </>
  );
};
