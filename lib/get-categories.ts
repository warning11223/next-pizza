import { GetSearchParams } from "@/app/(root)/page";
import prisma from "@/prisma/prisma-client";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

//const DEFAULT_LIMIT = 12;
//const DEFAULT_PAGE = 1;

export const getCategories = async (params: GetSearchParams) => {
    const ingredientsIdArr = params.ingredients?.split(',').map(Number);
    const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
    const sizes = params.sizes?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    //const limit = Number(params.limit || DEFAULT_LIMIT);
    //const page = Number(params.page || DEFAULT_PAGE);

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc',
                },
                where: {
                    ingredients: ingredientsIdArr
                        ? {
                            some: {
                                id: {
                                    in: ingredientsIdArr,
                                },
                            },
                        }
                        : undefined,
                    items: {
                        some: {
                            size: {
                                in: sizes,
                            },
                            pizzaType: {
                                in: pizzaTypes,
                            },
                            price: {
                                gte: minPrice, // >=
                                lte: maxPrice, // <=
                            },
                        },
                    },
                },
                include: {
                    ingredients: true,
                    items: {
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                        orderBy: {
                            price: 'asc',
                        },
                    },
                },
            },
        },
    });

    return categories;
}