import { useAppSelector } from "@/app/hooks";
import * as RestaurantCardComponents from "@/components/Restaurants/CardViews";
import * as DishComponents from "@/components/Dishes";
import { useGetRestaurantQuery } from "@/services/api";
import { FavoriteDish, FavoriteRestaurant } from "@/types";
import { useGetDishQuery } from "@/services/api";

// A dedicated component to fetch and render a restaurant's header
function RestaurantFavorite({ restaurantId }: { restaurantId: string }) {
    const { data: restaurant, isLoading, error } = useGetRestaurantQuery(
        restaurantId,
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading restaurant</div>;
    console.log(restaurant);
    return <RestaurantCardComponents.Header restaurant={restaurant} />;
}

function DishFavourite({ dishId }: { dishId: string }) {
    const { data: dish, isLoading, error } = useGetDishQuery({
        dish_id: dishId,
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading dish</div>;

    // Render dish
    // return <DishComponents.Dish dish={dish} />;
    return <DishComponents.CardViews.Base dish={dish} />;
}

function Favorites() {
    // Assuming favoriteRestaurants is an array of FavoriteRestaurant objects
    const favoriteRestaurants = useAppSelector(
        (state) => state.favoriteRestaurants,
    ) as FavoriteRestaurant[];

    const favoriteDishes = useAppSelector(
        (state) => state.favoriteDishes,
    ) as FavoriteDish[];

    // Extract unique restaurant IDs (if there might be duplicates)
    const uniqueRestaurantIds = Array.from(
        new Set(favoriteRestaurants.map((fav) => fav.restaurant_id)),
    );

    // Extract unique dish IDs (if there might be duplicates)
    const uniqueDishIds = Array.from(
        new Set(favoriteDishes.map((fav) => fav.dish_id)),
    );

    return (
        <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
            <div className="text-4xl font-bold">Favorites</div>
            <div className="text-2xl">Restaurants</div>
            <div className="space-y-4">
                {uniqueRestaurantIds.map((restaurantId) => (
                    <div className="border rounded p-5">
                        <RestaurantFavorite
                            key={restaurantId}
                            restaurantId={restaurantId}
                        />
                    </div>
                ))}
            </div>
            <div className="text-2xl">Dishes</div>
            {uniqueDishIds.map((dishId) => (
                <div className="border rounded p-5">
                    <DishFavourite
                        key={dishId}
                        dishId={dishId}
                    />
                </div>
            ))}
        </div>
    );
}

export { Favorites };
