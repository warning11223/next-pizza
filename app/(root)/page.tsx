import {getCategories} from "@/lib/get-categories";
import {Container, Filters, ProductsGroupList, Stories, Title, TopBar} from "@/components/shared";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    sizes?: string;
    pizzaTypes?: string;
    ingredients?: string;
    priceFrom?: string;
    priceTo?: string;
    limit?: string;
    page?: string;
}

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
    const categories = await getCategories(searchParams);

    return (
        <h1>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold"/>
            </Container>

            <TopBar items={categories.filter(category => category.products.length > 0)}/>

            <Stories />

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
                    </div>
                </div>
            </Container>

        </h1>
    );
}
