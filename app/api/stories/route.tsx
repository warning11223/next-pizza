import prisma from '@/prisma/prisma-client';
import {NextResponse} from 'next/server';

export async function GET() {
    const products = await prisma.story.findMany({
        include: {
            items: true,
        },
    });

    return NextResponse.json(products);
}
