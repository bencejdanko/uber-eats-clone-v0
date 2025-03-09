
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Restaurant } from '@/types';

const initialState: Restaurant = {
    id: '',
    name: '',
    email: '',
    location: '',
    contact_info: '',
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurant: (state, action: PayloadAction<Restaurant>) => {
            return { ...state, ...action.payload}
        },
        clearRestaurant: (state) => {
            state = initialState;
        }
    }
})


export const { setRestaurant, clearRestaurant } = restaurantSlice.actions
export default restaurantSlice.reducer