import { base } from "./base";
import type { User } from "@/types";

const extendedApi = base.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: (id) => `customers/${id}`,
            providesTags: ["User"],
        }),
        updateUser: builder.mutation<User, Partial<User>>(
            {
                query: (body) => ({
                    url: `/customers/${body.id}`,
                    method: "PATCH",
                    body,
                }),
                invalidatesTags: ["User"],
            },
        ),
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
            query: () => ({
                url: "customers/logout",
                method: "POST",
            }),
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
} = extendedApi;
