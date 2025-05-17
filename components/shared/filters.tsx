'use client';

import React, {useEffect} from 'react';

import { Input } from '@/components/ui/input';
import { Title } from './title';
import {RangeSlider} from "@/components/ui";
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import {useFilterIngredients} from "@/hooks/useFilterIngredients";
import {useMap, useSet } from 'react-use';
import debounce from 'lodash.debounce';
import {useRouter} from "next/navigation";
import qs from "qs"
import {useSearchParams} from "next/navigation";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const searchParams = useSearchParams();
    const {ingredients, loading} = useFilterIngredients();
    const router = useRouter();

    const [filters, { set }] = useMap(Object.fromEntries(searchParams.entries()));
    const [selectedIngredientsIds, { toggle }] = useSet(new Set<string>(
        searchParams.get("ingredients") ? searchParams.get("ingredients")?.split(",") : []
    ));
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(
        searchParams.get("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(",") : []
    ));
    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(
        searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
    ));

    const updateQueryParams = React.useMemo(
        () =>
            debounce((params) => {
                router.push(
                    `?${qs.stringify(params, {
                        arrayFormat: 'comma',
                    })}`,
                    { scroll: false },
                );
            }, 300),
        [],
    );

    useEffect(() => {
        updateQueryParams({
            ...filters,
            ingredients: Array.from(selectedIngredientsIds),
            sizes: Array.from(sizes),
            pizzaTypes: Array.from(pizzaTypes),
        });
    }, [filters, selectedIngredientsIds, pizzaTypes, sizes]);

    const defaultIngredients = ingredients
        ?.slice(0, 6)
        .map((o) => ({ text: o.name, value: o.id.toString() }));

    return (
        <div className={className}>
            <Title
                text="Фильтрация"
                size="sm"
                className="mb-5 font-bold pb-4 border-b border-b-neutral-100"
            />

            <CheckboxFiltersGroup
                selectedIds={pizzaTypes}
                name="pizzaTypes"
                className="mb-5"
                title="Тип теста"
                onClickCheckbox={togglePizzaTypes}
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Традиционное', value: '2' },
                ]}
            />

            <CheckboxFiltersGroup
                selectedIds={sizes}
                name="sizes"
                className="mb-5"
                title="Размеры"
                onClickCheckbox={toggleSizes}
                items={[
                    { text: '20 см', value: '20' },
                    { text: '30 см', value: '30' },
                    { text: '40 см', value: '40' },
                ]}
            />

            <div className="mt-10 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={30000}
                        onChange={(e) => set('priceFrom', e.target.value)}
                        value={String(filters.priceFrom || 0)}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={30000}
                        placeholder="30000"
                        onChange={(e) => set('priceTo', e.target.value)}
                        value={String(filters.priceTo || 0)}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[+filters.priceFrom || 0, +filters.priceTo || 1000]}
                    onValueChange={([priceFrom, priceTo]) => {
                       set('priceFrom', String(priceFrom || 0));
                       set('priceTo', String(priceTo || 0));
                    }}
                />
            </div>

            <CheckboxFiltersGroup
                selectedIds={selectedIngredientsIds}
                name="ingredients"
                loading={loading}
                className="mt-5"
                title="Ингредиенты"
                limit={6}
                onClickCheckbox={toggle}
                defaultItems={defaultIngredients}
                items={ingredients?.map((o) => ({ text: o.name, value: o.id.toString() })) || []}
            />
        </div>
    );
};
