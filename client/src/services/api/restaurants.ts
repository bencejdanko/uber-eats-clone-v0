import { base } from "./base";
import type { Restaurant } from "@/types";

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

    }),
});

export const {
    useSignupRestaurantMutation,
    useLoginRestaurantMutation,
    useLogoutRestaurantMutation,
    useCheckRestaurantSessionQuery,
    useGetRestaurantListQuery,
    useUpdateRestaurantMutation,
} = extendedApi;
