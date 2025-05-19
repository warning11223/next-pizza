'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui/button';
import { IProduct } from '@/hooks/useChoosePiza';
import toast from 'react-hot-toast';
import {DialogTitle} from "@/components/ui/dialog";
import {useCart} from "@/hooks/useCart";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    items?: IProduct['items'];
    onCloseModal?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
                                                       name,
                                                       items,
                                                       imageUrl,
                                                       onCloseModal,
                                                       className,
                                                   }) => {
    const { addCartItem, loading } = useCart();

    const productItem = items?.[0];

    if (!productItem) {
        throw new Error('Продукт не найден');
    }

    const productPrice = productItem.price;

    const handleClickAdd = async () => {
        try {
            addCartItem({
                productItemId: productItem.id,
                quantity: 1,
            });
            toast.success('Товар добавлен в корзину');
        } catch (error) {
            console.error(error);
            toast.error('Произошла ошибка при добавлении в корзину');
        }

        onCloseModal?.();
    };

    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img
                    src={imageUrl}
                    alt={name}
                    className="relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]"
                />
            </div>

            <div className="flex flex-col justify-between w-[490px] bg-[#F7F6F5] p-7">
                <DialogTitle className="font-extrabold mb-1 text-3xl">{name}</DialogTitle>

                <Button
                    loading={loading}
                    onClick={handleClickAdd}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5">
                    Добавить в корзину за {productPrice} ₽
                </Button>
            </div>
        </div>
    );
};
