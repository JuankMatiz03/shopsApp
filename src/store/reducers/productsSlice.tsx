import { createSlice } from '@reduxjs/toolkit';
import { ProductsStateModel } from '../../models/productsStateModel';
import { fetchProducts } from '../../services/api';

const initialState: ProductsStateModel = {
    products: [],
    status: 'idle',
    error: null,
};

/**
 * productsSlice
 */
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            });
        },
    });

export default productsSlice.reducer;
