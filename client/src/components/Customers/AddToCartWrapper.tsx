import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useGetDishQuery } from "@/services/api";

import { useAppSelector } from "@/app/hooks";
import { useAddToCartMutation } from "@/services/api";
import { LoadingSpinnerToCheck } from "../LoadingSpinnerToCheck";

import { useState } from "react";
import { CartItem } from "@/types";

function AddToCartWrapper(
    { children, dish_id }: {
        children: React.ReactNode;
        dish_id: string;
    },
) {
    const [addToCart, { isError, isLoading, isSuccess }] =
        useAddToCartMutation();

    const { data: dish } = useGetDishQuery({ dish_id });

    async function addToCartHandler() {

        if (!dish) {
            console.log("Dish not loaded")
            return;
        }

        if (!customer.name) {
            window.location.href = "/customers/login";
            return;
        }

        const cartItem = {
            customer_id: customer.id,
            dish_id,
            price: dish?.price,
            quantity,
        };

        console.log("Adding to cart: ", cartItem);

        const {error} = await addToCart(cartItem);
        console.log("Error: ", error);
    }

    const customer = useAppSelector((state) => state.customer);

    const [quantity, setQuantity] = useState(1);
    return (
        <>
            <Select value={quantity} onValueChange={setQuantity}>
                <SelectTrigger className="w-full hover:bg-gray-200 border-muted-foreground">
                    <div className="flex gap-5 items-center">
                        Quantity: <SelectValue />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Quantity</SelectLabel>
                        {Array.from(
                            { length: 10 },
                            (_, i) => (
                                <SelectItem key={i + 1} value={i + 1}>
                                    {i + 1}
                                </SelectItem>
                            ),
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <button
                className="w-full cursor-pointer hover:opacity-50"
                onClick={addToCartHandler}
            >
                {children}
            </button>
            {(isLoading || isSuccess) && (
                <LoadingSpinnerToCheck
                    isSuccess={isSuccess}
                    successMessage="Added!"
                    onComplete={() => {}}
                />
            )}
            {isError && (
                <div className="text-red-500">
                    Oops, something went wrong. <br /> Please try again.
                </div>
            )}
        </>
    );
}

export { AddToCartWrapper };
