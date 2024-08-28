import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";

interface Props {
  params: {
    gender: Category;
  };
  searchParams: {
    page?: string;
    take?: string;
  };
}

const titlesLabels: Record<Category, string> = {
  kid: "para niños",
  men: "para hombres",
  women: "para mujeres",
  unisex: "para todos",
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 12;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    take,
    gender,
  });

  return (
    <>
      <Title title={`Articulos ${titlesLabels[gender]}`} />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
