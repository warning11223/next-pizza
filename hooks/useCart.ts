import {useEffect} from 'react';
import { ICartItem, useCartStore } from '@/store/cart';
import { CreateCartItemValues } from '@/services/dto/cart';

type ReturnProps = {
    totalAmount: number;
    items: ICartItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (runFetch?: boolean): ReturnProps => {
    const fetchCartItems = useCartStore(state => state.fetchCartItems);
    const totalAmount = useCartStore(state => state.totalAmount);
    const items = useCartStore(state => state.items);
    const loading = useCartStore(state => state.loading);
    const addCartItem = useCartStore(state => state.addCartItem);
    const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
    const removeCartItem = useCartStore(state => state.removeCartItem);

    useEffect(() => {
        if (runFetch) {
            fetchCartItems();
        }
    }, [fetchCartItems, runFetch]);

    return {
        totalAmount,
        items,
        loading,
        addCartItem,
        updateItemQuantity,
        removeCartItem,
    };
};
