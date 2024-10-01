import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";
import { prisma } from "@/prisma/prismaClient";

export default async function Client() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          variants: true,
          ingredients: true,
        }
      },
    },
  });

  return (
    <>
      <Container className="mt-10">
        <Title
          text="Все пиццы"
          size="lg"
          className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)}/>

      <Container className="my-10">
        <div className="flex gap-[80px]">

          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) => (
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    items={category.products}
                  />
                )
              ))}
            </div>
          </div>

        </div>
      </Container>

    </>
  );
}
