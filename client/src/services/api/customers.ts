import { base } from "./base";
import type { Customer } from "@/types";

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
    }),
});

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useSignupCustomerMutation,
    useLoginCustomerMutation,
    useLogoutCustomerMutation,
    useCheckCustomerSessionQuery,
} = extendedApi;
