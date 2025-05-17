import {Container, Filters, ProductsGroupList, Title, TopBar} from "@/components/shared";
import prisma from "@/prisma/prisma-client";

export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    items: true,
                    ingredients: true
                }
            }
        }
    })

    return (
        <h1>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold"/>
            </Container>

            <TopBar items={categories.filter(category => category.products.length > 0)}/>

            <Container className="pb-14">
                <div className="flex gap-[60px]">
                    <div className="w-[250px]">
                        <Filters/>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-16 ">
                            {categories.map(
                                (category) =>
                                    category.products.length > 0 && (
                                        <ProductsGroupList
                                            key={category.id}
                                            title={category.name}
                                            products={category.products}
                                            categoryId={category.id}
                                        />
                                    ),
                            )}
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
