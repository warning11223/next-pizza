import React from 'react';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Title} from './title';
import Link from 'next/link';
import {Ingredient} from "@prisma/client";

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
    ingredients?: Ingredient[]
}

export const ProductCard: React.FC<Props> = ({id, name, price, imageUrl, className, ingredients}) => {
    const onAddProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    const ingredientsString = ingredients?.map(ingredient => ingredient.name).join(', ')

    return (
        <div className={cn(className)}>
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-[215px] h-[215px]" src={imageUrl} alt="Logo"/>
                </div>

                <Title text={name} size="sm" className="mb-1 mt-3 font-bold"/>

                <p className="text-sm text-gray-400">
                    {ingredientsString}
                </p>

                <div className="flex justify-between items-center mt-4">
                     <span className="text-[20px]">
                        от <b>{price} ₽</b>
                    </span>

                    <Button
                        variant="secondary"
                        className="text-base font-bold"
                        onClick={onAddProduct}
                    >
                        <Plus className="w-5 h-5 mr-1"/>
                        Добавить
                    </Button>
                </div>
            </Link>
        </div>
    );
};
