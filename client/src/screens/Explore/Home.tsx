import * as React from "react";
import { useGetRestaurantImagesQuery, useGetRestaurantListQuery } from "@/services/api";
import { Loader2, Mountain, Navigation } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Restaurant } from "@/types";

// Separate component for each restaurant card
function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  // Calling hook at the top level of RestaurantCard
  const { data: images, isLoading: isImagesLoading, isError: isImagesError } =
    useGetRestaurantImagesQuery(restaurant.id);

  return (
    <Card className="max-w-xs min-w-xs">
      <CardHeader>
        <a href={`/explore/restaurants/${restaurant.id}`} className="space-y-2">
          <CardTitle>{restaurant.name}</CardTitle>
          <CardDescription>
            {restaurant.description || "No description available"}
          </CardDescription>
        </a>
      </CardHeader>
      <CardContent className="w-full h-48">
        {isImagesLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin" size={36} />
          </div>
        ) : isImagesError ? (
          <div>Error loading images</div>
        ) : images && images.length > 0 ? (
          <Carousel className="w-full h-full flex justify-center items-center">
            <CarouselContent>
                
              {images.map((image) => (
                <CarouselItem key={image.id}>
                  <img
                    src={image.image_url}
                    alt={`${restaurant.name} image`}
                    className="object-cover w-full h-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex justify-center items-center h-full">
            <Mountain size={64} className="text-gray-500" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Navigation size={16} />
            {restaurant.location}
          </div>
          <div>
            {restaurant.contact_info || "No contact info available"}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function Home() {
  const { data, error, isLoading } = useGetRestaurantListQuery();

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center gap-2 text-lg">
        Loading <Loader2 className="animate-spin" size={36} />
      </div>
    );
  }

  if (error) return <div>Error loading data</div>;

  return (
    <div className="min-h-screen pt-30 p-5 w-full">
      <div className="text-4xl mb-5">Explore Local Restaurants</div>
      <div className="flex flex-wrap flex-grow gap-5 overflow-y-auto">
        {data &&
          data.rows.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
      </div>
    </div>
  );
}

export { Home };
