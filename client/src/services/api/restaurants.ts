import { base } from "./base";
import type { Restaurant, RestaurantTiming, Dish } from "@/types";

const extendedApi = base.injectEndpoints({
    endpoints: (builder) => ({
        signupRestaurant: builder.mutation<Restaurant, Partial<Restaurant>>({
            query: (body) => ({
                url: "restaurants/signup",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Restaurant"],
        }),
        loginRestaurant: builder.mutation<Restaurant, Partial<Restaurant>>({
            query: (body) => ({
                url: "restaurants/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Restaurant"],
        }),
        logoutRestaurant: builder.mutation<void, void>({
            query: () => ({
                url: "restaurants/logout",
                method: "POST",
            }),
            invalidatesTags: ["Restaurant"],
        }),
        checkRestaurantSession: builder.query<Restaurant, void>({
            query: () => "restaurants/session",
            providesTags: ["Restaurant"],
        }),
        getRestaurantList: builder.query<Restaurant[], void>({
            query: () => "restaurants",
            providesTags: ["Restaurant"],
        }),
        updateRestaurant: builder.mutation<Restaurant, Partial<Restaurant>>({
            query: (body) => ({
                url: `restaurants/${body.id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Restaurant"],
        }),
        updateTiming: builder.mutation<Restaurant, Partial<RestaurantTiming>>({
            query: (body) => ({
                url: `restaurants/${body.restaurant_id}/timings`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["RestaurantTiming"],
        }),
        getTimings: builder.query<RestaurantTiming[], string>({
            query: (restaurant_id) => `restaurants/${restaurant_id}/timings`,
            providesTags: ["RestaurantTiming"],
        }),
        getDishes: builder.query<Dishes[], string>({
            query: (restaurant_id) => `restaurants/${restaurant_id}/dishes`,
            providesTags: ["Dishes"],
        }),
        addDish: builder.mutation<Dishes, Partial<Dishes>>({
            query: (body) => ({
                url: `restaurants/${body.restaurant_id}/dishes`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Dishes"],
        }),
        updateDish: builder.mutation<Dishes, Partial<Dishes>>({
            query: (body) => ({
                url: `restaurants/${body.restaurant_id}/dishes/${body.id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Dishes"],
        }),
    }),
});

export const {
    useSignupRestaurantMutation,
    useLoginRestaurantMutation,
    useLogoutRestaurantMutation,
    useCheckRestaurantSessionQuery,
    useGetRestaurantListQuery,
    useUpdateRestaurantMutation,
    useUpdateTimingMutation,
    useGetTimingsQuery,
} = extendedApi;
