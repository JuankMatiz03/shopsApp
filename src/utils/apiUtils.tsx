import { Preferences } from '@capacitor/preferences';

/**
 * saveWishlist
 * @param wishlist 
 */
export const saveWishlist = async (wishlist: any) => {
    await Preferences.set({ key: 'wishlist', value: JSON.stringify(wishlist) });
};

/**
 * getWishlist
 * @returns wish list
 */
export const getWishlist = async () => {
    const { value } = await Preferences.get({ key: 'wishlist' });
    return value ? JSON.parse(value) : [];
};
