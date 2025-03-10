import { useParams } from "react-router-dom";
import {
  useGetRestaurantQuery,
  useGetTimingsQuery,
  useGetRestaurantImagesQuery,
  useGetDishesQuery,
} from "@/services/api";
import { RestaurantTiming } from "@/types";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Heart } from "lucide-react";

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

  // Compact status function for timings
  const getCurrentStatus = (timing: RestaurantTiming) => {
    if (timing.closed) return "Closed";
    const now = dayjs();
    const openTime = dayjs(timing.open_time, "HH:mm");
    const closeTime = dayjs(timing.close_time, "HH:mm");
    return now.isAfter(openTime) && now.isBefore(closeTime) ? "Open" : "Closed";
  };

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
    return <div>Error loading restaurant</div>;
  }

  return (
    <div className="mt-4 min-h-screen max-w-md mx-auto flex flex-col gap-10 py-30 px-4">
      {/* Restaurant Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">{restaurant.name}</h1>
        <p className="text-lg mt-2">{restaurant.description}</p>
      </div>

      {/* Restaurant Images Carousel */}
      <div className="mt-6">
        {imagesLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin" size={36} />
          </div>
        ) : imagesError || !images || images.length === 0 ? (
          <div className="text-center text-gray-500">No images available</div>
        ) : (
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
              className={`flex-shrink-0 p-2 border rounded text-center min-h-[70px] min-w-[60px] ${timing.closed ? "opacity-50" : ""}`}
            >
              <div className="text-sm font-bold">
                {timing.day_of_week.substring(0, 3)}
              </div>
              <div className="text-xs">
                {timing.closed
                  ? "Closed"
                  : timing.open_time && timing.close_time
                  ? `${timing.open_time}-${timing.close_time}`
                  : "not set"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dish Items Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Menu</h2>
        {dishesLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin" size={36} />
          </div>
        ) : dishesError || !dishes || dishes.length === 0 ? (
          <div className="text-center text-gray-500">No dishes available</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {dishes.map((dish) => (
              <Card key={dish.name} className="relative flex flex-col">
                <CardHeader>
                    <div className='absolute right-10'>{dish.category}</div>
                  <CardTitle className="text-lg">{dish.name}</CardTitle>
                  <CardDescription>{dish.description}</CardDescription>
                </CardHeader>
                {dish.image && (
                  <CardContent>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="object-cover w-full h-40 rounded-md"
                    />
                  </CardContent>
                )}
                <CardContent className="flex-1">
                  <CardDescription className="text-sm">
                    <span className="font-semibold">Ingredients: </span>
                    {dish.ingredients}
                  </CardDescription>
                  <div className="mt-2 font-semibold">
                    ${dish.price}
                  </div>
                </CardContent>
                <CardFooter className='flex-col gap-5'>
                  <Button
                    onClick={() => handleAddToCart(dish)}
                    className="w-full py-1 rounded-md text-sm text-black bg-yellow-300 hover:bg-yellow-400"
                  >
                    Place order
                  </Button>
                  <div className='text-left w-full flex gap-2'><Heart />Add to favourites</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { Restaurant };
