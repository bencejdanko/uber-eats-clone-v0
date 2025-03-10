import { base } from "./base";

const extendedApi = base.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<string, Blob>({
            query: (body) => {
                const formData = new FormData();
                formData.append('file', body);
                return {
                    url: "cdn/upload",
                    method: "POST",
                    body: formData,
                };
            },
        }),
    })
})

export const {
    useUploadFileMutation,
} = extendedApi;

export const uploadFile = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('file', blob);

    const result = await fetch('/api/cdn/uploadAvatar', {
        method: 'POST',
        body: formData
    });

    const data = await result.json();
    console.log('Upload response:', data);
    return data;
};

export const uploadRestaurantImage = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('file', blob);

    try {
        const result = await fetch('/api/cdn/uploadRestaurantImage', {
            method: 'POST',
            body: formData
        });
    
        const data = await result.json();
        console.log('Upload response:', data);
        return data;
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}