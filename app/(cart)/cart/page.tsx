'use client';

import {
    CartItem,
    CartItemSkeleton,
    CartSidebar,
    Container, FormInput,
    orderFormSchema,
    TFormOrderData,
    Title,
    WhiteBlock
} from '@/components/shared';
import { useCart } from '@/hooks/useCart';
import React from "react";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddressInput} from "@/components/shared/address-input";
import {FormTextarea} from "@/components/shared/form";
import {createOrder} from "@/app/actions";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import {Api} from "@/services/api-client";
import {Ingredient} from "@prisma/client";

const VAT = 15;
const DELIVERY_PRICE = 250;

export default function CartPage() {
    const { totalAmount, items, loading, updateItemQuantity, removeCartItem } = useCart(true);
    const [submitting, setSubmitting] = React.useState(false);
    const { data: session } = useSession();

    const form = useForm<TFormOrderData>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    });

    React.useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();
            const [firstName, lastName] = data.fullName.split(' ');

            form.setValue('firstName', firstName);
            form.setValue('lastName', lastName);
            form.setValue('email', data.email);
        }

        if (session) {
            fetchUserInfo();
        }
    }, [session]);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const value = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, value);
    };

    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

    const onSubmit = async (data: TFormOrderData) => {
        try {
            setSubmitting(true);

            const url = await createOrder(data);

            toast.error('Заказ успешно оформлен! 📝', {
                icon: '✅',
            });

            if (url) {
                location.href = url;
            }
        } catch (error) {
            console.error('Order submission error:', error);
            return toast.error('Неверный E-Mail или пароль', {
                icon: '❌',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="mt-5">
            <Title text="Оформление заказа" size="xl" className="font-extrabold mb-8"/>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <WhiteBlock
                                title="1. Корзина"
                                // endAdornment={
                                //     totalAmount > 0 && (
                                //         <button
                                //             type="button"
                                //             className="flex items-center gap-3 text-gray-400 hover:text-gray-600"
                                //         >
                                //             <Trash2 size={16}/>
                                //             Очистить корзину
                                //         </button>
                                //     )
                                // }
                            >
                                <div className="flex flex-col gap-5">
                                    {loading
                                        ? [...Array(3)].map((_, index) => <CartItemSkeleton key={index}/>)
                                        : items.map((item) => (
                                            <CartItem
                                                key={item.id}
                                                name={item.name}
                                                imageUrl={item.imageUrl}
                                                price={item.price}
                                                ingredients={item.ingredients as Ingredient[]}
                                                quantity={item.quantity}
                                                onClickRemove={() => removeCartItem(item.id)}
                                                onClickCountButton={(type) =>
                                                    onClickCountButton(item.id, item.quantity, type)
                                                }
                                            />
                                        ))}
                                </div>

                                {!totalAmount && !loading && (
                                    <p className="text-center text-gray-400 p-10">Корзина пустая</p>
                                )}
                            </WhiteBlock>

                            <WhiteBlock
                                title="2. Персональная информация"
                                className={!totalAmount ? 'opacity-50 pointer-events-none' : ''}
                                contentClassName="p-8">
                                <div className="grid grid-cols-2 gap-5">
                                    <FormInput name="firstName" className="text-base" placeholder="Имя" />
                                    <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
                                    <FormInput name="email" className="text-base" placeholder="E-Mail" />
                                    <FormInput name="phone" className="text-base" placeholder="Телефон" />
                                </div>
                            </WhiteBlock>

                            <WhiteBlock
                                className={!totalAmount ? 'opacity-50 pointer-events-none' : ''}
                                title="3. Адрес доставки"
                                contentClassName="p-8">
                                <div className="flex flex-col gap-5">
                                    <Controller
                                        control={form.control}
                                        name="address"
                                        render={
                                            ({ field }) => <AddressInput onChange={field.onChange} />
                                        }
                                    />

                                    <FormTextarea
                                        name="comment"
                                        className="text-base"
                                        placeholder="Комментарий к заказу"
                                        rows={5}
                                    />
                                </div>
                            </WhiteBlock>
                        </div>
                        <div className="w-[450px]">
                            <CartSidebar
                                totalPrice={totalPrice}
                                totalAmount={totalAmount}
                                vatPrice={vatPrice}
                                deliveryPrice={DELIVERY_PRICE}
                                loading={loading}
                                submitting={submitting}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
