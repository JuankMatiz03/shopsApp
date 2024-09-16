import { ProductModel } from "./productModel";

export interface WishlistItemProps {
    item: ProductModel;
    onRemove: () => void;
}