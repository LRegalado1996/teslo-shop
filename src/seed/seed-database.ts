import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  //1. Borrar registros previos
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products } = initialData;

  //2. Agregar categorias
  const categoriesData = categories.map((name) => ({ name }));
  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  //3. Agregar Productos
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const ProductDB = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //Agregamos imagenes
    const imagesData = images.map((url) => ({ url, productId: ProductDB.id }));
    await prisma.productImage.createMany({ data: imagesData });
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
