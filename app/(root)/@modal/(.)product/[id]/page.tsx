import { notFound } from 'next/navigation';
import prisma from "@/prisma/prisma-client";
import {ChooseProductModal} from "@/components/shared";

type Params = Promise<{ slug: string[] }> & { id: string };

export default async function ProductModal({ params }: { params: Params })  {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(params.id),
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

    return <ChooseProductModal product={product} />;
}
