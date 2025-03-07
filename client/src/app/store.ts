import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/features/auth'
import { base } from '@/services/api'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [base.reducerPath]: base.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(base.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch