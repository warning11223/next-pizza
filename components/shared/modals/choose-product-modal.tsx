'use client';

import React from 'react';
import {Dialog, DialogContent} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import {ChoosePizzaForm} from "@/components/shared/choose-pizza-form";
import {ChooseProductForm} from "@/components/shared";
import {IProduct} from "@/hooks/useChoosePiza";

interface Props {
    product: IProduct;
}

export const ChooseProductModal: React.FC<Props> = ({ product }) => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType);

    const onCloseModal = () => {
        router.back();
    };

    return (
        <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
            <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">

                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        items={product.items}
                        onCloseModal={onCloseModal}
                        ingredients={product.ingredients}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        items={product.items}
                        onCloseModal={onCloseModal}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
