"use client";

import React, { useEffect, useState } from "react";
import { SizeSelector } from "../size-selector/SizeSelector";
import { QuantitySelector } from "../quantity-selector/QuantitySelector";
import { Product, Size } from "@/interfaces";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    if (posted && size) setPosted(false);
  }, [size]);

  const addToCart = () => {
    if (!size) {
      setPosted(true);
      return;
    }
  };

  return (
    <>
      {/* mensaje de error */}
      {posted && <span className="mt-2 text-red-500 fade-in">Debe seleccionar una talla*</span>}

      {/* selector de tallas */}
      <SizeSelector selectedSize={size} availableSizes={product.sizes} onSizeChaged={setSize} />

      {/* selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
        maxQuantity={product.inStock}
      />

      {/* Button */}
      <button
        className="btn-primary my-5 disabled:opacity-50"
        onClick={addToCart}
        disabled={product.inStock === 0}
      >
        {product.inStock === 0 ? "No hay stock" : "Agregar al carrito"}
      </button>
    </>
  );
};
