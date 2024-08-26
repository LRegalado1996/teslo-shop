import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  };
}

const correctsIds = ["kid", "men", "women"];

const titlesLabels: Record<Category, string> = {
  kid: "para niños",
  men: "para hombres",
  women: "para mujeres",
  unisex: "para todos",
};

const seedProducts = initialData.products;

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  if (!correctsIds.includes(id)) {
    notFound();
  }

  const products = seedProducts.filter((product) => product.gender === id);

  return (
    <>
      <Title title={`Articulos ${titlesLabels[id]}`} />

      <ProductGrid products={products} />
    </>
  );
}
