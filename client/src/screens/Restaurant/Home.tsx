import { ProfileForm } from "@/components/Restaurants/ProfileForm";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useUpdateRestaurantMutation } from "@/services/api";
import { setRestaurant } from "@/features/restaurants/auth";
import { Restaurant } from "@/types";
import { LoadingSpinnerToCheck } from "@/components";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                <Tabs defaultValue="profile">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="dishes">Dishes</TabsTrigger>
                        <TabsTrigger value="images">Images</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <div className="text-2xl my-4 font-bold">
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
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export { Home };
