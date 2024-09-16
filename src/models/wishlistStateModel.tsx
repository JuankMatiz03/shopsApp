import { ProductModel } from "./productModel";

export interface WishlistStateModel {
    items: ProductModel[];
    lastRemovedProduct: ProductModel | null
}