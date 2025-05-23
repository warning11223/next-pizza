import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/prisma-client";
import crypto from "crypto";
import {CreateCartItemValues} from "@/services/dto/cart";
import {updateCartTotalAmount} from "@/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
    try {
        const cartToken = req.cookies.get('cartToken')?.value;
        //const currentUser = await getUserSession();
        //const userId = Number(currentUser?.id);

        if (!cartToken) {
            return NextResponse.json({ items: [] });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    // {
                    //     userId,
                    // },
                    {
                        tokenId: cartToken,
                    },
                ],
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

        return NextResponse.json(userCart);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: '[CART_GET] Server error' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        // Проверяем наличие ингредиентов
        const ingredientIds = data.ingredientsIds || [];

        // Находим все похожие элементы корзины (с тем же продуктом, размером и типом)
        const similarCartItems = await prisma.cartItem.findMany({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                pizzaSize: data.pizzaSize,
                type: data.type,
            },
            include: {
                ingredients: true
            }
        });

        let exactMatch = null;

        for (const item of similarCartItems) {
            const itemIngredientIds = item.ingredients.map(ing => ing.id);

            const sameLength = itemIngredientIds.length === ingredientIds.length;

            const allIngredientsMatch = ingredientIds.every(id =>
                itemIngredientIds.includes(id)
            );

            const allCartIngredientsInRequest = itemIngredientIds.every(id =>
                ingredientIds.includes(id)
            );

            if (sameLength && allIngredientsMatch && allCartIngredientsInRequest) {
                exactMatch = item;
                break;
            }
        }

        // Если найден точно такой же элемент, увеличиваем его количество
        if (exactMatch) {
            await prisma.cartItem.update({
                where: {
                    id: exactMatch.id,
                },
                data: {
                    quantity: exactMatch.quantity + (data.quantity || 1),
                },
            });
        } else {
            // Создаем новый элемент с ингредиентами
            const newCartItem = await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: data.quantity || 1,
                    pizzaSize: data.pizzaSize,
                    type: data.type,
                },
            });

            if (ingredientIds.length > 0) {
                await prisma.cartItem.update({
                    where: { id: newCartItem.id },
                    data: {
                        ingredients: {
                            connect: ingredientIds.map(id => ({ id }))
                        }
                    }
                });
            }
        }

        // Получаем обновленную корзину со всеми связями
        const updatedUserCart = await updateCartTotalAmount(token);

        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set('cartToken', token);
        return resp;
    } catch (err) {
        console.log('Ошибка при добавлении в корзину:', err);
        return NextResponse.json({ message: '[CART_POST] Server error' }, { status: 500 });
    }
}

async function findOrCreateCart(cartToken: string | undefined) {
    let userCart = await prisma.cart.findFirst({
        where: {
            OR: [
                // {
                //     userId,
                // },
                {
                    tokenId: cartToken,
                },
            ],
        },
    });

    if (!userCart) {
        userCart = await prisma.cart.create({
            data: {
                //userId,
                tokenId: cartToken,
            },
        });
    }

    return userCart;
}