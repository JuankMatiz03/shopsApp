import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './reducers/productsSlice';
import wishlistReducer from './reducers/wishlistSlice';
import { getWishlist } from '../utils/apiUtils';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['products', 'wishlist'], 
};

const rootReducer = combineReducers({
    products: productsReducer,
    wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

persistStore(store, null, async () => {
    const initialWishlist = await getWishlist();
    store.dispatch({
        type: 'wishlist/setWishlist',
        payload: initialWishlist || []
    });
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
