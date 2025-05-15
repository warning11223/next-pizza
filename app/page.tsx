import {Container, Filters, ProductsGroupList, Title, TopBar} from "@/components/shared";

const categoryProducts = [
    {
        id: 1,
        name: "Пиццы",
        products: [
            {
                id: 1,
                name: "Пицца 1",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                items: [
                    {price: 550}
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Пиццы",
        products: [
            {
                id: 1,
                name: "Пицца 1",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                items: [
                    {price: 550}
                ]
            }
        ]
    },
    {
        id: 3,
        name: "Пиццы",
        products: [
            {
                id: 1,
                name: "Пицца 1",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                items: [
                    {price: 550}
                ]
            }
        ]
    },
    {
        id: 4,
        name: "Пиццы",
        products: [
            {
                id: 1,
                name: "Пицца 1",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                items: [
                    {price: 550}
                ]
            }
        ]
    },
    {
        id: 5,
        name: "Пиццы",
        products: [
            {
                id: 1,
                name: "Пицца 1",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                items: [
                    {price: 550}
                ]
            }
        ]
    },
    {
        id: 6,
        name: "Пиццы",
        products: [
            {
                id: 1,
                name: "Пицца 1",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                items: [
                    {price: 550}
                ]
            }
        ]
    }

]

export default function Home() {
  return (
      <h1>
          <Container className="mt-10">
              <Title text="Все пиццы" size="lg" className="font-extrabold"/>
          </Container>

          <TopBar />

          <Container className="pb-14">
              <div className="flex gap-[60px]">
                  <div className="w-[250px]">
                      <Filters />
                  </div>
                  <div className="flex-1">
                      <div className="flex flex-col gap-16 ">
                          {/*{categoryProducts.map(*/}
                          {/*    (category) =>*/}
                          {/*        category.products.length > 0 && (*/}
                          {/*            <ProductsGroupList*/}
                          {/*                key={category.id}*/}
                          {/*                title={category.name}*/}
                          {/*                products={category.products}*/}
                          {/*                categoryId={category.id}*/}
                          {/*            />*/}
                          {/*        ),*/}
                          {/*)}*/}
                          <ProductsGroupList
                              key={0}
                              title="Пиццы"
                              products={categoryProducts}
                              categoryId={0}
                              items={categoryProducts}
                          />

                          <ProductsGroupList
                              key={1}
                              title="Комбо"
                              products={categoryProducts}
                                  categoryId={1}
                              items={categoryProducts}
                          />
                      </div>

                      {/*<div className="flex items-center gap-6 mt-12">
                          <Pagination pageCount={meta.pageCount} currentPage={meta.currentPage} />
                          <span className="text-sm text-gray-400">5 из 65</span>
                      </div>*/}
                  </div>
              </div>
          </Container>

      </h1>
  );
}
