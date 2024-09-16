import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistStateModel } from '../../models/wishlistStateModel';
import { saveWishlist } from '../../utils/apiUtils';
import { ProductModel } from '../../models/productModel';

const initialState: WishlistStateModel = {
    items: [],
    lastRemovedProduct: null,
};

/**
 * wishlistSlice
 */
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductModel>) => {
            const product = action.payload;
            const productExists = state.items.some(item => item.id === product.id);

            if (!productExists) {
                state.items.push(product);
                saveWishlist(state.items);
            }
        },
        removeProduct: (state, action: PayloadAction<{ id: number }>) => {
            const removedProduct = state.items.find(product => product.id === action.payload.id);
            state.items = state.items.filter((product) => product.id !== action.payload.id);
            saveWishlist(state.items);
            state.lastRemovedProduct = removedProduct || null;
        },
        addProductBack: (state, action: PayloadAction<ProductModel>) => {
            const product = action.payload;
            const productExists = state.items.some(item => item.id === product.id);

            if (!productExists && product) {
                state.items.push(product);
                saveWishlist(state.items);
            }
            state.lastRemovedProduct = null; 
        },
        setWishlist: (state, action: PayloadAction<ProductModel[]>) => {
            state.items = action.payload;
            saveWishlist(state.items);
        },
    },
});

export const { addProduct, removeProduct, addProductBack } = wishlistSlice.actions;
export default wishlistSlice.reducer;
