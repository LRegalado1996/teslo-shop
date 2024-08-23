import { titleFont } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[500px] w-full justify-center items-center">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Whoops! Lo sentimos mucho.</p>
        <p className="font-light">
          <span>Puedes regresar al </span>
          <Link className="font-normal hover:underline transition-all" href="/">
            Inicio
          </Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman | Not found image"
          className="p-5 sm:p-0"
          width={450}
          height={450}
        />
      </div>
    </div>
  );
};
