import { useAddFavoriteDishMutation } from "@/services/api";
import { useRemoveFavoriteDishMutation } from "@/services/api";
import { useAppSelector } from "@/app/hooks";
import { useAppDispatch } from "@/app/hooks";
import { Heart } from "lucide-react";
import { setFavoriteDishes } from "@/features/customers/favorites/dishes";
import { useEffect } from "react";

function FavoriteDishWrapper({ dish_id }: { dish_id: string }) {
    const [addFavoriteDish] =
        useAddFavoriteDishMutation();
    const [removeFavoriteDish] = useRemoveFavoriteDishMutation();
    const favoriteDishes = useAppSelector((state) => state.favoriteDishes);
    const customer = useAppSelector((state) => state.customer);

    const dispatch = useAppDispatch();

    // Check if the dish is already in favorites
    const isFavorite = favoriteDishes.some((fav) => {
        return fav.dish_id === dish_id;
    });
 
    useEffect(() => {

    }, [isFavorite]);

    async function addToFavorites() {
        if (!customer.name) {
            window.location.href = "/customers/login";
            return;
        }

        if (!isFavorite) {
            await addFavoriteDish({ customer_id: customer.id, dish_id });
            const updatedDishes = favoriteDishes.concat({ dish_id, customer_id: customer.id });
            dispatch(setFavoriteDishes(updatedDishes));

        } else {
            removeFavoriteDish({ customer_id: customer.id, dish_id });
            const updatedDishes = favoriteDishes.filter((fav) => fav.dish_id !== dish_id);
            dispatch(setFavoriteDishes(updatedDishes));
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

export { FavoriteDishWrapper };
