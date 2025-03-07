import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types";

export const deliveryEatsApi = createApi({
    reducerPath: "deliveryEatsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
        credentials: "include",
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: (id) => `customers/${id}`,
            providesTags: ["User"],
        }),
        updateUser: builder.mutation<User, Partial<User>>({
            query: (body) => ({
                url: "user",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        signupCustomer: builder.mutation<User, Partial<User>>({
            query: (body) => ({
                url: "customers/signup",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        loginCustomer: builder.mutation<User, Partial<User>>({
            query: (body) => ({
                url: "customers/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        logoutCustomer: builder.mutation<void, void>({
            query: () => "customers/logout",
            invalidatesTags: ["User"],
        }),
        checkSession: builder.query<User, void>({
            query: () => "customers/session",
            providesTags: ["User"],
        }),
        updateCustomer: builder.mutation<User, Partial<User>>({
            query: (body) => ({
                url: "customers",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useSignupCustomerMutation,
    useLoginCustomerMutation,
    useLogoutCustomerMutation,
    useCheckSessionQuery,
} = deliveryEatsApi;
