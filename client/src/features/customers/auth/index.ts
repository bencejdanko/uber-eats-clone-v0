import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Customer } from '@/types';

const initialState: Customer = {
    id: '',
    name: '',
    email: '',
    profile_picture: '',
    country: '',
    state: ''
}

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomer: (state, action: PayloadAction<Customer>) => {
            return { ...state, ...action.payload}
        },
        clearCustomer: (state) => {
            state = initialState;
        }
    }
})


export const { setCustomer, clearCustomer } = customerSlice.actions
export default customerSlice.reducer