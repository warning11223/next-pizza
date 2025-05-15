'use client';

import React from 'react';

import { Input } from '@/components/ui/input';
import { Title } from './title';
import {RangeSlider} from "@/components/ui";
import { CheckboxFiltersGroup } from './checkbox-filters-group';

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const [ingredients, setIngredients] = React.useState([]);





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
                name="pizzaTypes"
                className="mb-5"
                title="Тип теста"
                //onClickCheckbox={togglePizzaTypes}
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Традиционное', value: '2' },
                ]}
            />

            <CheckboxFiltersGroup
                name="sizes"
                className="mb-5"
                title="Размеры"
               // onClickCheckbox={toggleSizes}
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
                        //onChange={(e) => set('priceFrom', e.target.value)}
                        //value={String(filters.priceFrom || 0)}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={30000}
                        placeholder="30000"
                       // onChange={(e) => set('priceTo', e.target.value)}
                        //value={String(filters.priceTo || 0)}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[0, 1000]}
                    onValueChange={([priceFrom, priceTo]) => {
                       // set('priceFrom', String(priceFrom || 0));
                        //set('priceTo', String(priceTo || 0));
                    }}
                />
            </div>

            <CheckboxFiltersGroup
                name="ingredients"
                //loading={ingredients.length === 0}
                className="mt-5"
                title="Ингредиенты"
                limit={6}
                //onClickCheckbox={toggle}
                defaultItems={[
                    {text: "Сыр", value: "1"},
                    {text: "Чеснок", value: "2"},
                    {text: "Моцарелла", value: "3"},
                    {text: "Сыр", value: "4"},
                    {text: "Чеснок", value: "5"},
                    {text: "Моцарелла", value: "6"},
                ]}
                //items={ingredients?.map((o) => ({ text: o.name, value: o.id.toString() })) || []}
                items={[
                    {text: "Сыр", value: "1"},
                    {text: "Чеснок", value: "2"},
                    {text: "Моцарелла", value: "3"},
                    {text: "Сыр", value: "4"},
                    {text: "Чеснок", value: "5"},
                    {text: "Моцарелла", value: "6"},
                    {text: "Сыр", value: "7"},
                    {text: "Чеснок", value: "8"},
                    {text: "Моцарелла", value: "9"},
                    {text: "Сыр", value: "11"},
                    {text: "Чеснок", value: "22"},
                    {text: "Моцарелла", value: "33"},
                    {text: "Сыр", value: "44"},
                    {text: "Чеснок", value: "55"},
                    {text: "Моцарелла", value: "66"},
                    {text: "Сыр", value: "76"},
                    {text: "Чеснок", value: "87"},
                    {text: "Моцарелла", value: "89"},
                ]}
            />
        </div>
    );
};
