import { base } from "./base";
import type {
    Dish,
    RestarauntImage,
    Restaurant,
    RestaurantTiming,
    OrderItem
} from "@/types";

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
        getDishes: builder.query<Dish[], string>({
            query: (restaurant_id) => `restaurants/${restaurant_id}/dishes`,
            providesTags: ["Dish"],
        }),
        putDishes: builder.mutation<
            Dish[],
            { restaurant_id: string; dishes: Partial<Dish>[] }
        >({
            query: ({ restaurant_id, dishes }) => ({
                url: `restaurants/${restaurant_id}/dishes`,
                method: "PUT",
                body: { dishes },
            }),
            invalidatesTags: ["Dish"],
        }),
        getDish: builder.query<Dish, { dish_id: string }>({
            query: ({ dish_id }) => `restaurants/dishes/${dish_id}`,
            providesTags: ["Dish"],
        }),
        getRestaurantImages: builder.query<RestarauntImage[], string>({
            query: (restaurant_id) => `restaurants/${restaurant_id}/images`,
            providesTags: ["RestarauntImage"],
        }),
        deleteRestaurantImage: builder.mutation<
            void,
            { restaurant_id: string; image_id: string }
        >({
            query: ({ restaurant_id, image_id }) => ({
                url: `restaurants/${restaurant_id}/images/${image_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["RestarauntImage"],
        }),
        getRestaurant: builder.query<Restaurant, string>({
            query: (restaurant_id) => `restaurants/${restaurant_id}`,
            providesTags: ["Restaurant"],
        }),
        getOrderItemsByRestaurantId: builder.query<
            OrderItem[],
            { restaurant_id: string }
        >({
            query: (body) => `restaurants/${body.restaurant_id}/orders/items/special`,
            providesTags: ["Customer"],
        }),
        updateOrderItem: builder.mutation<OrderItem, { id: string; orderItemId: string; order_status: string }>({
            query: ({ id, orderItemId, order_status }) => ({
                url: `restaurants/${id}/orders/items/${orderItemId}`,
                method: "PATCH",
                body: { order_status },
            }),
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
    useGetDishesQuery,
    useGetDishQuery,
    usePutDishesMutation,
    useGetRestaurantImagesQuery,
    useDeleteRestaurantImageMutation,
    useGetRestaurantQuery,
    useGetOrderItemsByRestaurantIdQuery,
    useUpdateOrderItemMutation

} = extendedApi;
