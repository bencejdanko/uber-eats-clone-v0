import { useParams } from "react-router-dom";
import {
    useGetDishesQuery,
    useGetRestaurantImagesQuery,
    useGetRestaurantQuery,
    useGetTimingsQuery,
} from "@/services/api";

import * as DishComponents from "@/components/Dishes";
import * as RestaurantCardComponents from "@/components/Restaurants/CardViews";

import { Loader2 } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

function Restaurant() {
    const { id } = useParams<{ id: string }>();

    const {
        data: restaurant,
        isLoading: restaurantLoading,
        isError: restaurantError,
    } = useGetRestaurantQuery(id || "nan");
    const { data: timings } = useGetTimingsQuery(id || "nan");
    const {
        data: images,
        isLoading: imagesLoading,
        isError: imagesError,
    } = useGetRestaurantImagesQuery(id || "nan");
    const {
        data: dishes,
        isLoading: dishesLoading,
        isError: dishesError,
    } = useGetDishesQuery(id || "nan");

    // Placeholder for cart functionality
    const handleAddToCart = (dish: any) => {
        console.log("Added to cart:", dish);
    };

    if (restaurantLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin" size={36} />
            </div>
        );
    }

    if (restaurantError || !restaurant) {
        return (
            <div className="mt-4 min-h-screen max-w-md mx-auto flex flex-col gap-10 py-30 px-4">
                <div className="text-center text-gray-500 flex-col flex gap-2">
                    Restaurant not found
                    <a href="/explore" className="text-primary">
                        Back to restaurants
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 min-h-screen max-w-md mx-auto flex flex-col gap-10 py-30 px-4">
            {/* Restaurant Header */}

            <RestaurantCardComponents.Header restaurant={restaurant} />

            {/* Restaurant Images Carousel */}
            <div className="mt-6">
                {imagesLoading
                    ? (
                        <div className="flex justify-center items-center">
                            <Loader2 className="animate-spin" size={36} />
                        </div>
                    )
                    : imagesError || !images || images.length === 0
                    ? (
                        <div className="text-center text-gray-500">
                            No images available
                        </div>
                    )
                    : (
                        <Carousel className="w-full">
                            <CarouselContent>
                                {images.map((image) => (
                                    <CarouselItem key={image.id}>
                                        <img
                                            src={image.image_url}
                                            alt={`${restaurant.name} image`}
                                            className="object-cover w-full h-64 rounded-md"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    )}
            </div>

            {/* Compact Timings Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Operating Hours</h2>
                <div className="flex overflow-x-auto space-x-1">
                    {timings?.map((timing) => (
                        <div
                            key={timing.day_of_week}
                            className={`flex-shrink-0 p-2 border rounded text-center min-h-[70px] min-w-[60px] ${
                                timing.closed ? "opacity-50" : ""
                            }`}
                        >
                            <div className="text-sm font-bold">
                                {timing.day_of_week.substring(0, 3)}
                            </div>
                            <div className="text-xs">
                                {timing.closed
                                    ? "Closed"
                                    : timing.open_time && timing.close_time
                                    ? `${
                                        new Date(
                                            `1970-01-01T${timing.open_time}Z`,
                                        ).toLocaleTimeString([], {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })
                                    } - 
           ${
                                        new Date(
                                            `1970-01-01T${timing.close_time}Z`,
                                        ).toLocaleTimeString([], {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })
                                    }`
                                    : "Not set"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dish Items Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Menu</h2>
                {dishesLoading
                    ? (
                        <div className="flex justify-center items-center">
                            <Loader2 className="animate-spin" size={36} />
                        </div>
                    )
                    : dishesError || !dishes || dishes.length === 0
                    ? (
                        <div className="text-center text-gray-500">
                            No dishes available
                        </div>
                    )
                    : (
                        <div className="grid grid-cols-1 gap-4">
                            {dishes.map((dish) => (
                                <DishComponents.CardViews.Base
                                    key={dish.id}
                                    dish={dish}
                                />
                            ))}
                        </div>
                    )}
            </div>
        </div>
    );
}

export { Restaurant };
