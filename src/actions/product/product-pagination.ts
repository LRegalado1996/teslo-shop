"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(take))) take = 12;
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    //1. Obtener los productos
    let products = [];
    let totalCount = 0;

    if (gender) {
      products = await prisma.product.findMany({
        take,
        skip: (page - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
        where: { gender },
      });

      totalCount = await prisma.product.count({ where: { gender } });
    } else {
      products = await prisma.product.findMany({
        take,
        skip: (page - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
      });

      totalCount = await prisma.product.count();
    }

    //2. Obtener El total de paginas
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};
