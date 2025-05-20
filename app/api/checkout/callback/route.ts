import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma/prisma-client";
import { CartItemDTO } from '@/services/dto/cart';
import {sendEmail} from "@/lib/send-email";
import {OrderSuccessTemplate} from "@/components/shared/email-templates";

type PaymentCallbackData = {
    type: string;
    event: string;
    object: {
        id: string;
        status: string;
        amount: { value: string; currency: 'RUB' };
        income_amount: { value: string; currency: 'RUB' };
        description: string;
        recipient: { account_id: string; gateway_id: string };
        payment_method: {
            type: string;
            id: string;
            saved: boolean;
            title: string;
        };
        captured_at: string;
        created_at: string;
        test: boolean;
        refunded_amount: { value: string; currency: 'RUB' };
        paid: boolean;
        refundable: true;
        metadata: { order_id: string };
        authorization_details: {
            rrn: string;
            auth_code: string;
        };
    };
};

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as PaymentCallbackData;

        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id),
            },
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' });
        }

        const isSucceeded = body.object.status === 'succeeded';

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
            },
        });

        const items = JSON.parse(order?.items as string) as CartItemDTO[];

        if (isSucceeded) {
            await sendEmail(
                order.email,
                'Next Pizza / Ваш заказ успешно оформлен 🎉',
                OrderSuccessTemplate({ orderId: order.id, items }),
            );
        } else {
            // Письмо о неуспешной оплате
        }
    } catch (error) {
        console.log('[Checkout Callback] Error:', error);
        return NextResponse.json({ error: 'Server error' });
    }
}
