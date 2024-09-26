import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
  const pizzaItems = [
    {
      id: 1,
      name: "Пепперони",
      imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
      price: 500,
      items: [{price: 500}],
    },
    {
      id: 2,
      name: "Маргарита",
      imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
      price: 500,
      items: [{price: 500}],
    },
    {
      id: 3,
      name: "Мексиканская",
      imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
      price: 500,
      items: [{price: 500}],
    },
    {
      id: 4,
      name: "Гавайская",
      imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
      price: 500,
      items: [{price: 500}],
    }
  ];

  return (
    <>
      <Container className="mt-10">
        <Title
          text="Все пиццы"
          size="lg"
          className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="my-10">
        <div className="flex gap-[80px]">

          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList 
                title="Пиццы"
                categoryId={0}
                items={pizzaItems}
              />
            </div>
          </div>

        </div>
      </Container>

    </>
  );
}
