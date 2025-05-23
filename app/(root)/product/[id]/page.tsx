import {notFound} from "next/navigation";
import prisma from "@/prisma/prisma-client";
import {ChoosePizzaForm, ChooseProductForm, Container} from "@/components/shared";
import React from "react";

type Params = Promise<{ slug: string[] }> & { id: string };

export default async function ProductPage({ params: { id } }: { params: Params}) {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            ingredients: true,
            items: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    product: {
                        include: {
                            items: true,
                        },
                    },
                },
            },
        },
    });

    const isPizzaForm = Boolean(product?.items[0].pizzaType);

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            {isPizzaForm ? (
                <ChoosePizzaForm
                    imageUrl={product.imageUrl}
                    name={product.name}
                    items={product.items}
                    ingredients={product.ingredients}
                />
            ) : (
                <ChooseProductForm
                    imageUrl={product.imageUrl}
                    name={product.name}
                    items={product.items}
                />
            )}
        </Container>
    )
}