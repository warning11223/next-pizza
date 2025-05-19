import type {Category, Ingredient, Product, ProductItem} from '@prisma/client';

type CategoryProducts = Category & {
    products: Array<Product & { items: ProductItem[] } & { ingredients: Ingredient[] }>;
};
