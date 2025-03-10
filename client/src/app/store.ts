import { configureStore } from '@reduxjs/toolkit'
import customerReducer from '@/features/customers/auth'
import restaurantReducer from '@/features/restaurants/auth'
import cartReducer from '@/features/customers/cart'
import favoriteRestaurantsReducer from '@/features/customers/favorites/restaurants'
import favoriteDishesReducer from '@/features/customers/favorites/dishes'
import { base } from '@/services/api'

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    restaurant: restaurantReducer,
    favoriteRestaurants: favoriteRestaurantsReducer,
    favoriteDishes: favoriteDishesReducer,
    cart: cartReducer,
    [base.reducerPath]: base.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(base.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch