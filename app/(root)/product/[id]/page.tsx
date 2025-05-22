import {notFound} from "next/navigation";
import prisma from "@/prisma/prisma-client";
import {ChoosePizzaForm, Container} from "@/components/shared";

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

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                name={product.name}
                items={product.items}
                ingredients={product.ingredients}
            />
        </Container>
    )
}