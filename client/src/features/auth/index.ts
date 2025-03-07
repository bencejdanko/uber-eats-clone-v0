import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types';
import { clear } from 'console';

const initialState: User = {
    id: '',
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
        clearUser: (state) => {
            state.id = '';
            state.name = '';
            state.email = '';
            state.profilePicture = '';
            state.country = '';
            state.state = '';
        }
    }
})


export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer