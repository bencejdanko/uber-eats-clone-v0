import { get } from "http";
import { base } from "./base";
import type { Customer, CartItem, FavoriteRestaurant, FavoriteDish, Order, OrderItem } from "@/types";
import { create } from "domain";

const extendedApi = base.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<Customer, void>({
            query: (id) => `customers/${id}`,
            providesTags: ["Customer"],
        }),
        updateUser: builder.mutation<Customer, Partial<Customer>>(
            {
                query: (body) => ({
                    url: `/customers/${body.id}`,
                    method: "PATCH",
                    body,
                }),
                invalidatesTags: ["Customer"],
            },
        ),
        signupCustomer: builder.mutation<Customer, Partial<Customer>>({
            query: (body) => ({
                url: "customers/signup",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Customer"],
        }),
        loginCustomer: builder.mutation<Customer, Partial<Customer>>({
            query: (body) => ({
                url: "customers/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Customer"],
        }),
        logoutCustomer: builder.mutation<void, void>({
            query: () => ({
                url: "customers/logout",
                method: "POST",
            }),
            invalidatesTags: ["Customer"],
        }),
        checkCustomerSession: builder.query<Customer, void>({
            query: () => "customers/session",
            providesTags: ["Customer"],
        }),
        updateCustomer: builder.mutation<Customer, Partial<Customer>>({
            query: (body) => ({
                url: "customers",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Customer"],
        }),
        getCustomerCart: builder.query<CartItem[], Partial<Customer>>({
            query: (body) => `customers/${body.id}/cart`,
            providesTags: ["Customer"],
        }),
        addToCart: builder.mutation<CartItem, { customer_id: string, dish_id: string }>({
            query: (body) => ({
                url: `customers/${body.customer_id}/cart/items`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Customer"],
        }),
        updateCartItem: builder.mutation<CartItem, { customer_id: string, dish_id: string, quantity: number }>({
            query: (body) => ({
                url: `customers/${body.customer_id}/cart/items/${body.dish_id}`,
                method: "PATCH",
                body: { quantity: body.quantity },
            }),
            invalidatesTags: ["Customer"],
        }),
        removeCartItem: builder.mutation<CartItem, { customer_id: string, item_id: string }>({
            query: (body) => ({
                url: `customers/${body.customer_id}/cart/items/${body.item_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Customer"],
        }),

        getFavoriteRestaurants: builder.query<FavoriteRestaurant[], { customer_id: string } >({
            query: (body) => `customers/${body.customer_id}/favorites/restaurants`,
            providesTags: ["Customer"],
        }),
        addFavoriteRestaurant: builder.mutation<FavoriteRestaurant, { customer_id: string, restaurant_id: string }>({
            query: (body) => ({
                url: `customers/${body.customer_id}/favorites/restaurants/${body.restaurant_id}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Customer"],
        }),
        removeFavoriteRestaurant: builder.mutation<FavoriteRestaurant, { customer_id: string, restaurant_id: string }>({
            query: (body) => ({
                url: `customers/${body.customer_id}/favorites/restaurants/${body.restaurant_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Customer"],
        }),

        getFavoriteDishes: builder.query<FavoriteDish[], { customer_id: string } >({
            query: (body) => `customers/${body.customer_id}/favorites/dishes`,
            providesTags: ["Customer"],
        }),
        addFavoriteDish: builder.mutation<FavoriteDish, { customer_id: string, dish_id: string }>({
            query: (body) => ({
                url: `customers/${body.customer_id}/favorites/dishes/${body.dish_id}`,
                method: "POST",
            })
        }),
        removeFavoriteDish: builder.mutation<FavoriteDish, { customer_id: string, dish_id: string }>({
            query: (body) => ({
                url: `customers/${body.customer_id}/favorites/dishes/${body.dish_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Customer"],
        }),

        createOrder: builder.mutation<Order, { customer_id: string }>({
            query: (body) => ({
                url: `customers/${body.customer_id}/orders`,
                method: "POST",
            }),
            invalidatesTags: ["Customer"],
        }),
        getOrdersByCustomerId: builder.query<Order[], { customer_id: string }>({
            query: (body) => `customers/${body.customer_id}/orders`,
            providesTags: ["Customer"],
        }),
        getOrderItemsByOrderId: builder.query<OrderItem[], { order_id: string, customer_id: string }>({
            query: (body) => `customers/${body.customer_id}/orders/${body.order_id}/items`,
            providesTags: ["Customer"],
        }),
        getCustomerById: builder.query<Customer, { customer_id: string }>({
            query: (body) => `customers/${body.customer_id}`,
            providesTags: ["Customer"],
        }),
        
    }),
});

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useSignupCustomerMutation,
    useLoginCustomerMutation,
    useLogoutCustomerMutation,
    useCheckCustomerSessionQuery,

    useGetCustomerByIdQuery,
    
    useGetCustomerCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation,

    useGetFavoriteRestaurantsQuery,
    useAddFavoriteRestaurantMutation,
    useRemoveFavoriteRestaurantMutation,

    useCreateOrderMutation,
    useGetOrdersByCustomerIdQuery,
    useGetOrderItemsByOrderIdQuery,

    useGetFavoriteDishesQuery,
    useAddFavoriteDishMutation,
    useRemoveFavoriteDishMutation,
} = extendedApi;
