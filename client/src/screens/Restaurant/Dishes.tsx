import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { usePutDishesMutation } from "@/services/api";
import { DishesForm } from "@/components/Restaurants";
import { LoadingSpinnerToCheck } from "@/components";

function Dishes() {
    const dispatch = useAppDispatch();
    const restaurant = useAppSelector((state) => state.restaurant);


    const [
        updateDishes,
        {
            isLoading,
            isError,
            isSuccess,
            error,
        },
    ] = usePutDishesMutation();

    async function onSubmit(data: any) {
        const dishes = data.dishes;
        updateDishes({ restaurant_id: restaurant.id, dishes });
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
