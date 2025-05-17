import React, {useEffect} from 'react';
import {Api} from "@/services/api-client";
import {Ingredient} from "@prisma/client";

export const useFilterIngredients = () => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true);
                const ingredients = await Api.ingredients.getIngredients();
                setIngredients(ingredients);
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false);
            }
        }

        fetchIngredients();
    }, []);

    return {ingredients, loading};
};
