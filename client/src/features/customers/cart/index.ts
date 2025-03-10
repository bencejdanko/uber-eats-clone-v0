import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CartItem } from '@/types';

const initialState: CartItem[] = []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            return action.payload;
        },
        clearCart: (state) => {
            state = initialState;
        }
    }
})


export const { setCart, clearCart } = cartSlice.actions
export default cartSlice.reducer