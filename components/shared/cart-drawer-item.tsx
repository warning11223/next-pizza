import React from 'react';
import { cn } from '@/lib/utils';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { ICartItem } from '@/store/cart';
import { Trash2Icon } from 'lucide-react';
import * as CartItemDetails from './cart-item-details';
import {CountButton} from "@/components/shared/count-button";
import {useCart} from "@/hooks/useCart";
import toast from "react-hot-toast";

interface Props extends CartItemProps {
    id: number;
    ingredients?: ICartItem['ingredients'];
    pizzaSize?: number | null;
    type?: number | null;
    loading?: boolean;
}

export const DrawerCartItem: React.FC<Props> = ({
                                                    id,
                                                    imageUrl,
                                                    name,
                                                    price,
                                                    ingredients,
                                                    pizzaSize,
                                                    type,
                                                    quantity,
                                                    className,
                                                    loading
                                                }) => {
    const { updateItemQuantity, removeCartItem } = useCart();

    const onClickCountButton = (type: 'plus' | 'minus') => {
        updateItemQuantity(id, type === 'plus' ? quantity + 1 : quantity - 1);
    };

    const onRemoveCartItem = (id: number) => {
        removeCartItem(id);
        toast.success('Товар удален из корзины');
    }

    return (
        <div className={cn(
            'flex bg-white p-5 gap-6 transition-all',
            {'opacity-50 bg-orange-100 pointer-events-none': loading},
            className)}>
            <CartItemDetails.Image src={imageUrl} />

            <div className="flex-1">
                <CartItemDetails.Info name={name} ingredients={ingredients} pizzaSize={pizzaSize} type={type} />

                <hr className="my-3" />

                <div className="flex items-center justify-between">
                    <CountButton onClick={onClickCountButton} value={quantity} />

                    <div className="flex items-center gap-3">
                        <CartItemDetails.Price value={price} />
                        <Trash2Icon
                            onClick={() => onRemoveCartItem(id)}
                            className="text-gray-400 cursor-pointer hover:text-gray-600"
                            size={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
