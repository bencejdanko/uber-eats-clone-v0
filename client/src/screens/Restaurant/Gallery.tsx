import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/app/hooks";
import {
    uploadRestaurantImage,
    useGetRestaurantImagesQuery,
    useDeleteRestaurantImageMutation,
} from "@/services/api";
import { useState } from "react";

import { Trash2 } from "lucide-react";
import { LoadingSpinnerToCheck } from "@/components";

function Gallery() {
    const restaurant = useAppSelector((state) => state.restaurant);
    const [file, setFile] = useState<File | null>(null);

    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [isUploadError, setIsUploadError] = useState(false);
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);

    const { data: images, isLoading, isError, refetch } = useGetRestaurantImagesQuery(
        restaurant.id,
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploadLoading(true);
        setIsUploadError(false);
        setIsUploadSuccess(false);

        try {
            // Upload the image to the CDN
            const uploadResponse = await uploadRestaurantImage(file);
            console.log("Upload response:", uploadResponse);
            setIsUploadLoading(false);
            setIsUploadSuccess(true);

            refetch();
        } catch (error) {
            console.error("Error uploading image:", error);
            setIsUploadLoading(false);
            setIsUploadError(true);
        }
    };

    const [deleteImage] = useDeleteRestaurantImageMutation();

    const handleDelete = async (imageId: string) => {
        await deleteImage({ image_id: imageId, restaurant_id: restaurant.id });
        refetch();
    }

    return (
        <>
            <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
                <div className="text-2xl font-bold">
                    Restaurant Gallery
                </div>
                <div className="space-y-4">
                    <Input type="file" onChange={handleFileChange} />
                    <Button onClick={handleUpload}>Upload</Button>
                </div>

                <div className="flex justify-center text-center mt-4">
                    {(isUploadLoading || isUploadSuccess) && (
                        <LoadingSpinnerToCheck
                            isSuccess={isUploadSuccess}
                            successMessage="Uploaded!"
                            onComplete={() => {}}
                        />
                    )}
                    {isUploadError && (
                        <div className="text-red-500">
                            Oops, something went wrong. <br /> Please try again.
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-4 flex-col space-y-4">
                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Error fetching images</div>}
                    {images &&
                        images.map((image) => (
                            <div>
                            <img
                                src={image.image_url}
                                alt="restaurant"
                            />
                            <button onClick={() => handleDelete(image.id)} className='flex items-center gap-2 py-2 cursor-pointer'><Trash2 />Delete</button>
                            </div>

                        ))}

                    {images && images.length === 0 && (
                        <div>No images uploaded</div>
                    )}
                </div>
            </div>
        </>
    );
}

export { Gallery };
