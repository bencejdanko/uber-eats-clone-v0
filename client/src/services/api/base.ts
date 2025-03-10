import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initQuery = async (args: any, api: any, extraOptions: any) => {

    // development load delay simulation
    // await delay(1000);

    const base = fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
        credentials: "include",
    })

    return base(args, api, extraOptions);

}

export const base = createApi({
    baseQuery: initQuery,
    tagTypes: ["Customer", "Restaurant", "RestaurantTiming", "Dishes"],
    endpoints: () => ({}),
});