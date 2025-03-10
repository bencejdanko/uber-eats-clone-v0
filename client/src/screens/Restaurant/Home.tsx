import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useUpdateRestaurantMutation } from "@/services/api";
import { setRestaurant } from "@/features/restaurants/auth";
import { Restaurant } from "@/types";
import { LoadingSpinnerToCheck } from "@/components";

import { ProfileForm } from "@/components/Restaurants";


function Home() {
    const dispatch = useAppDispatch();
    const restaurant = useAppSelector((state) => state.restaurant);

    const [updateRestaurant, { isLoading, isError, isSuccess, error }] =
        useUpdateRestaurantMutation();

    async function onSubmit(data: any) {
        const updatedData: Restaurant = {
            ...data,
            id: restaurant.id,
            email: restaurant.email,
        };

        const { error } = await updateRestaurant(updatedData);

        if (error) {
            console.error(error);
            return;
        }

        dispatch(setRestaurant(updatedData));
    }

    return (
        <div>
            <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
                <div className="text-4xl font-bold">{restaurant.name}</div>
                        <div className="text-2xl font-bold">
                            Change Restaurant Profile
                        </div>

                        <ProfileForm
                            restaurant={restaurant}
                            onSubmit={onSubmit}
                        />
                        {(isLoading || isSuccess) && (
                            <LoadingSpinnerToCheck
                                isSuccess={isSuccess}
                                successMessage="Updated!"
                                onComplete={() => {}}
                            />
                        )}
                        {isError && (
                            <div className="text-red-500">
                                Oops, something went wrong. <br />{" "}
                                Please try again.
                            </div>
                        )}
            </div>
        </div>
    );
}

export { Home };
