'use client';

import {cn} from '@/lib/utils';
import React from 'react';
import {PizzaImage} from './pizza-image';
import {Button} from '../ui/button';
import {IProduct, useChoosePizza} from '@/hooks/useChoosePiza';
import toast from 'react-hot-toast';
import {DialogTitle} from "@/components/ui/dialog";
import {PizzaSelector} from "@/components/shared/pizza-selector";
import {IngredientsList} from "@/components/shared/ingredient-list";
import {Title} from "@/components/shared/title";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: IProduct['ingredients'];
    items?: IProduct['items'];
    onCloseModal?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
                                                     name,
                                                     items,
                                                     imageUrl,
                                                     ingredients,
                                                     onCloseModal,
                                                     className,
                                                 }) => {
    const {
        size,
        type,
        availablePizzaSizes,
        setPizzaSize,
        setPizzaType,
        textDetaills,
        loading,
        addPizza,
        selectedIngredientsIds,
        toggleAddIngredient,
    } = useChoosePizza(items);

    const totalIngredientPrice: number =
        ingredients
            ?.filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
            ?.reduce((acc, item) => acc + item.price, 0) || 0;

    const pizzaPrice: number = items?.find((item) => item.pizzaType === type)?.price || 0;
    const totalPrice: number = totalIngredientPrice + pizzaPrice;

    const handleClickAdd = async () => {
        try {
            await addPizza().then(() => onCloseModal?.());
        } catch (error) {
            toast.error('Произошла ошибка при добавлении в корзину');
            console.error(error);
        }
    };

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size}/>

            <div className="w-[490px] bg-[#F7F6F5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetaills}</p>

                <PizzaSelector
                    pizzaSizes={availablePizzaSizes}
                    selectedSize={String(size)}
                    selectedPizzaType={String(type)}
                    onClickSize={setPizzaSize}
                    onClickPizzaType={setPizzaType}
                />

                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
                    <IngredientsList
                        ingredients={ingredients}
                        onClickAdd={toggleAddIngredient}
                        selectedIds={selectedIngredientsIds}
                    />
                </div>

                <Button
                    loading={loading}
                    onClick={handleClickAdd}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
