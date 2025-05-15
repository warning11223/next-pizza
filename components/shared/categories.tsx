'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import {useCategoryStore} from "@/store/category";

interface Props {
    className?: string;
}

const arr = [
    { id: 0, category: "Пиццы" },
    { id: 1, category: "Комбо" },
    { id: 2, category: "Закуски" },
    { id: 3, category: "Коктейли" },
    { id: 4, category: "Кофе" },
    { id: 5, category: "Напитки" }
]

export const Categories: React.FC<Props> = ({ className }) => {
    const activeId = useCategoryStore((state) => state.activeId);

    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {arr.map(({category, id}) => (
                <a
                    key={id}
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        activeId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
                    )}
                    href={`/#${category}`}>
                    {category}
                </a>
            ))}
        </div>
    );
};
