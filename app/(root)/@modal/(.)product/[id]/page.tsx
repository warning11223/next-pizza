import { notFound } from 'next/navigation';
import prisma from "@/prisma/prisma-client";
import {ChooseProductModal} from "@/components/shared";

export default async function PhotoModal({ params: { id } }: { params: { id: string } }) {
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

    return <ChooseProductModal product={product} />;
}
