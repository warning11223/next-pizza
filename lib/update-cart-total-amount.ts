import prisma from "@/prisma/prisma-client";
import {CartItemDTO} from "@/services/dto/cart";

export const updateCartTotalAmount = async (tokenId: string) => {
    const userCart = await prisma.cart.findFirst({
        where: {
            tokenId,
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    });

    if (!userCart) {
        return;
    }

    const totalAmount = userCart.items.reduce((acc, item) => {
        return acc + calcCartItemTotalPrice(item as CartItemDTO);
    }, 0);

    return prisma.cart.update({
        where: {
            id: userCart.id,
        },
        data: {
            totalAmount,
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    });
};

const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    return (ingredientsPrice + item.productItem.price) * item.quantity;
};