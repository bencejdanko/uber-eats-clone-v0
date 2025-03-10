import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { usePutDishMutation } from "@/services/api";
import { DishesForm } from "@/components/Restaurants";
import { LoadingSpinnerToCheck } from "@/components";
import { Dish } from "@/types";

function Dishes() {
    const dispatch = useAppDispatch();
    const restaurant = useAppSelector((state) => state.restaurant);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [
        updateDish,
        // {
        //     isLoading: isTimingLoading,
        //     isError: isTimingError,
        //     isSuccess: isTimingSuccess,
        //     error: timingError,
        // },
    ] = usePutDishMutation();

    async function onSubmit(data: any) {
        setIsSuccess(false);
        setIsError(false);
        setIsLoading(true);

        const dishes = data.dishes;

        for (const dish of dishes) {
            const { error } = await updateDish({
                ...dish,
                restaurant_id: restaurant.id,
            });
            if (error) {
                setIsLoading(false);
                setIsError(true);
                console.error("Failed to update dish:", error);
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
                    Change Restaurant Dishes
                </div>
                <DishesForm
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

export { Dishes };
