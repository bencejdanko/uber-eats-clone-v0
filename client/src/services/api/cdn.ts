import { base } from "./base";

const extendedApi = base.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<string, FormData>({
            query: (body) => ({
                url: "cdn/upload",
                method: "POST",
                body,
            }),
        }),
    })
})

export const {
    useUploadFileMutation,
} = extendedApi;