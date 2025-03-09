import { ProfileForm } from "@/components/Restaurants/ProfileForm";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
    useUpdateRestaurantMutation,
    useUpdateTimingMutation,
} from "@/services/api";
import { setRestaurant } from "@/features/restaurants/auth";
import { Restaurant } from "@/types";
import { LoadingSpinnerToCheck } from "@/components";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimesForm } from "@/components/Restaurants";

import { useState } from "react";
import { set } from "zod";

function Home() {
    const dispatch = useAppDispatch();
    const restaurant = useAppSelector((state) => state.restaurant);

    const [timesLoading, setTimesLoading] = useState(false);
    const [timesError, setTimesError] = useState(false);
    const [timesSuccess, setTimesSuccess] = useState(false);

    const [updateRestaurant, { isLoading, isError, isSuccess, error }] =
        useUpdateRestaurantMutation();

    const [
        updateTiming,
        {
            isLoading: isTimingLoading,
            isError: isTimingError,
            isSuccess: isTimingSuccess,
            error: timingError,
        },
    ] = useUpdateTimingMutation();

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

    async function onTimesSubmit(data: any) {
        setTimesError(false);
        setTimesSuccess(false);
        setTimesLoading(true);
        const timings = data.timings;
        for (let key in timings) {
            const { error } = await updateTiming({
                restaurant_id: restaurant.id,
                day_of_week: key,
                open_time: timings[key].open_time,
                close_time: timings[key].close_time,
                closed: timings[key].closed,
            });

            if (error) {
                console.error(error);
                setTimesLoading(false);
                setTimesError(true);
                return;
            }
        }
        setTimesLoading(false);
        setTimesSuccess(true);
    }

    return (
        <div>
            <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
                <div className="text-4xl font-bold">{restaurant.name}</div>
                <Tabs defaultValue="profile">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="times">Times</TabsTrigger>
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
                    <TabsContent value="times">
                        <div className="text-2xl my-4 font-bold">
                            Change Restaurant Times
                        </div>
                        <TimesForm restaurant={restaurant} onSubmit={onTimesSubmit} />
                        <div className='flex justify-center text-center'>
                        {(timesLoading || timesSuccess) && (
                            <LoadingSpinnerToCheck
                                isSuccess={isTimingSuccess}
                                successMessage="Updated!"
                                onComplete={() => {}}
                            />
                        )}
                        {timesError && (
                            <div className="text-red-500">
                                Oops, something went wrong. <br />{" "}
                                Please try again.
                            </div>
                        )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export { Home };
