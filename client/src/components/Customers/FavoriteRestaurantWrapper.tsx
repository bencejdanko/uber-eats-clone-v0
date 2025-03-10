import { useAddFavoriteRestaurantMutation } from "@/services/api";
import { useRemoveFavoriteRestaurantMutation } from "@/services/api";
import { useAppSelector } from "@/app/hooks";
import { useAppDispatch } from "@/app/hooks";
import { Heart } from "lucide-react";
import { setFavoriteRestaurants } from "@/features/customers/favorites/restaurants";
import { useEffect } from "react";

function FavoriteRestaurantWrapper({ restaurant_id }: { restaurant_id: string }) {
    const [addFavoriteRestaurant] = useAddFavoriteRestaurantMutation();
    const [removeFavoriteRestaurant] = useRemoveFavoriteRestaurantMutation();
    const favoriteRestaurants = useAppSelector((state) =>
        state.favoriteRestaurants
    );
    const customer = useAppSelector((state) => state.customer);

    const dispatch = useAppDispatch();

    // Check if the dish is already in favorites
    const isFavorite = favoriteRestaurants.some((fav) => {
        return fav.restaurant_id === restaurant_id;
    });

    useEffect(() => {
    }, [isFavorite]);

    async function addToFavorites() {
        if (!customer.name) {
            window.location.href = "/customers/login";
            return;
        }

        if (!isFavorite) {
            await addFavoriteRestaurant({
                customer_id: customer.id,
                restaurant_id,
            });

            const updatedRestaurants = favoriteRestaurants.concat({
                restaurant_id,
                customer_id: customer.id,
            });
            dispatch(setFavoriteRestaurants(updatedRestaurants));
        } else {
            removeFavoriteRestaurant({
                customer_id: customer.id,
                restaurant_id,
            });
            const updatedDishes = favoriteRestaurants.filter((fav) =>
                fav.restaurant_id !== restaurant_id
            );
            dispatch(setFavoriteRestaurants(updatedDishes));
        }
    }

    return (
        <button
            className="cursor-pointer hover:opacity-50"
            onClick={addToFavorites}
        >
            <div className="text-left w-full flex gap-2 items-center">
                <Heart fill={isFavorite ? "red" : "none"} className="w-5 h-5" />
                {isFavorite ? "Added to favorites" : "Add to favorites"}
            </div>
        </button>
    );
}

export { FavoriteRestaurantWrapper };
