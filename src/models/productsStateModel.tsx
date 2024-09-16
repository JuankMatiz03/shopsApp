import { ProductModel } from "./productModel";

export interface ProductsStateModel {
    products: ProductModel[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}