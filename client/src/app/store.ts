import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/features/auth'
import { deliveryEatsApi } from '@/services/deliveryEats'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [deliveryEatsApi.reducerPath]: deliveryEatsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deliveryEatsApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch