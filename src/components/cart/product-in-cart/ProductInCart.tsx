"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import Link from "next/link";

export const ProductInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded"
            style={{
              width: "100px",
              height: "100px",
            }}
          />

          <div>
            <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}>
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
              maxQuantity={10}
            />
            <button className="underline mt-3" onClick={() => removeProduct(product)}>
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
