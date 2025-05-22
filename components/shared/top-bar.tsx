'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import {Category} from "@prisma/client";
import {CartButton} from "@/components/shared/cart-button";

interface Props {
    className?: string;
    items: Category[]
}

export const TopBar: React.FC<Props> = ({ className, items }) => {

    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
            <Container className="flex items-center justify-between ">
                <Categories items={items} />
                <div className="flex items-center">
                    {/*<SortPopup />*/}
                    <CartButton />
                </div>
            </Container>
        </div>
    );
};
