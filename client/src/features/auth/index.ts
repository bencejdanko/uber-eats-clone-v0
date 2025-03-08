import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Customer } from '@/types';

const initialState: Customer = {
    id: '',
    name: '',
    email: '',
}

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomer: (state, action: PayloadAction<Customer>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.id = action.payload.id;

            if (action.payload.profilePicture) {
                state.profilePicture = action.payload.profilePicture;
            }

            if (action.payload.country) {
                state.country = action.payload.country;
            }

            if (action.payload.state) {
                state.state = action.payload.state;
            }
        },
        clearCustomer: (state) => {
            state.id = '';
            state.name = '';
            state.email = '';
            state.profilePicture = '';
            state.country = '';
            state.state = '';
        }
    }
})


export const { setCustomer, clearCustomer } = customerSlice.actions
export default customerSlice.reducer