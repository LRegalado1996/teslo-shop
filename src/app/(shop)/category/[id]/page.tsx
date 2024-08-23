import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const correctsIds = ["kids", "men", "women"];

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  if (!correctsIds.includes(id)) {
    notFound();
  }

  return (
    <div className="">
      <h1>Hola CategoryPage! {id}</h1>
    </div>
  );
}
