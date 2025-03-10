import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FavoriteRestaurant } from '@/types';

const initialState: FavoriteRestaurant[] = []

export const favouriteRestaurantsSlice = createSlice({
    name: 'favoriteRestaurants',
    initialState,
    reducers: {
        setFavoriteRestaurants: (state, action: PayloadAction<FavoriteRestaurant[]>) => {
            return action.payload;
        },
        clearFavoriteRestaurants: (state) => {
            state = initialState;
        }
    }
})


export const { setFavoriteRestaurants, clearFavoriteRestaurants } = favouriteRestaurantsSlice.actions
export default favouriteRestaurantsSlice.reducer