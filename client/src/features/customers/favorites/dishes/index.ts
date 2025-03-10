import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FavoriteDish } from '@/types';

const initialState: FavoriteDish[] = []

export const favouriteDishesSlice = createSlice({
    name: 'FavoriteDishes',
    initialState,
    reducers: {
        setFavoriteDishes: (state, action: PayloadAction<FavoriteDish[]>) => {
            return action.payload;
        },
        clearFavoriteDishes: (state) => {
            state = initialState;
        }
    }
})


export const { setFavoriteDishes, clearFavoriteDishes } = favouriteDishesSlice.actions
export default favouriteDishesSlice.reducer