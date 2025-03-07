import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types';
import { clear } from 'console';

const initialState: User = {
    name: '',
    email: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;

            if (action.payload.profilePicture) {
                state.profilePicture = action.payload.profilePicture;
            }

            if (action.payload.country) {
                state.country = action.payload.country;
            }

            if (action.payload.city) {
                state.city = action.payload.city;
            }
        },
        clearUser: (state) => {
            state.name = '';
            state.email = '';
            state.profilePicture = '';
            state.country = '';
            state.city = '';
        }
    }
})


export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer