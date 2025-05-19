import {cn} from '@/lib/utils';
import React from 'react';
import {WhiteBlock} from './white-block';
import {Button} from '../ui/button';
import {ArrowRight, Package, Percent, Truck} from 'lucide-react';
import {Skeleton} from "@/components/ui";
import {CartSidebarDetails} from "@/components/shared/cart-sidebar-details";

interface Props {
    totalAmount: number;
    totalPrice: number;
    vatPrice: number;
    deliveryPrice: number;
    className?: string;
    submitting?: boolean;
    loading?: boolean
}

export const CartSidebar: React.FC<Props> = ({
                                                 totalAmount,
                                                 totalPrice,
                                                 vatPrice,
                                                 deliveryPrice,
                                                 className,
                                                 submitting,
                                                 loading
                                             }) => {

    return (
        <WhiteBlock className={cn('p-6 sticky top-4', className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                {loading ? (
                    <Skeleton className="h-11 w-48" />
                ) : (
                    <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
                )}
            </div>

            <CartSidebarDetails
                title={
                    <div className="flex items-center">
                        <Package size={18} className="mr-2 text-gray-400" />
                        Стоимость корзины:
                    </div>
                }
                value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} ₽`}
            />

            <CartSidebarDetails
                title={
                    <div className="flex items-center">
                        <Percent size={18} className="mr-2 text-gray-400" />
                        Налоги:
                    </div>
                }
                value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${vatPrice} ₽`}
            />

            <CartSidebarDetails
                title={
                    <div className="flex items-center">
                        <Truck size={18} className="mr-2 text-gray-400" />
                        Доставка:
                    </div>
                }
                value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${deliveryPrice} ₽`}
            />

            <Button
                disabled={!totalAmount}
                loading={submitting}
                type="submit"
                className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Перейти к оплате
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    );
};
