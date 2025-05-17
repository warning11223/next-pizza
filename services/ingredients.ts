import { Ingredient } from '@prisma/client';
import { axiosInstance } from './instance';
import {ApiRoutes} from "@/services/constants";

export const getIngredients = async () => {
    const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

    return data;
};
