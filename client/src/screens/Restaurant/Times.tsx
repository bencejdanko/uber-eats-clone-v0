import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useUpdateTimingMutation } from "@/services/api";
import { TimesForm } from "@/components/Restaurants";
import { LoadingSpinnerToCheck } from "@/components";

function Times() {
    const dispatch = useAppDispatch();
    const restaurant = useAppSelector((state) => state.restaurant);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [
        updateTiming,
        // {
        //     isLoading: isTimingLoading,
        //     isError: isTimingError,
        //     isSuccess: isTimingSuccess,
        //     error: timingError,
        // },
    ] = useUpdateTimingMutation();

    async function onSubmit(data: any) {
        setIsSuccess(false);
        setIsError(false);
        setIsLoading(true);
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
                setIsLoading(false);
                setIsError(true);
                return;
            }
        }
        setIsLoading(false);
        setIsSuccess(true);
    }

    return (
        <>
            <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
                <div className="text-2xl font-bold">
                    Change Restaurant Times
                </div>
                <TimesForm
                    restaurant={restaurant}
                    onSubmit={onSubmit}
                />
                <div className="flex justify-center text-center mt-4">
                    {(isLoading || isSuccess) && (
                        <LoadingSpinnerToCheck
                            isSuccess={isSuccess}
                            successMessage="Updated!"
                            onComplete={() => {}}
                        />
                    )}
                    {isError && (
                        <div className="text-red-500">
                            Oops, something went wrong. <br /> Please try again.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export { Times };
