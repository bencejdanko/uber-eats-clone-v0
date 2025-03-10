import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { CartItem } from "@/types";
import { useGetDishQuery } from "@/services/api";
import {
    useCreateOrderMutation,
    useRemoveCartItemMutation,
    useUpdateCartItemMutation,
} from "@/services/api";
import { setCart } from "@/features/customers/cart";
import { LoadingSpinnerToCheck } from "@/components";

// Assuming the Select components are exported from your UI library:
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// A subcomponent for each cart item row.
function CartItemRow({ cartItem }: { cartItem: CartItem }) {
    const { data: dish, isLoading, isError, error } = useGetDishQuery({
        dish_id: cartItem.dish_id,
    });
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);
    const customer = useAppSelector((state) => state.customer);
    const [updateCartItem] = useUpdateCartItemMutation();
    const [removeCartItem] = useRemoveCartItemMutation();
    const [quantity, setQuantity] = useState(cartItem.quantity);

    useEffect(() => {
        if (error) {
            if (error.status == 404) {
                // Automatically remove the item from the cart if the dish is not found.
                handleRemove();
            }
        }
    });

    const handleQuantityChange = async (newQuantity: number) => {
        setQuantity(newQuantity);
        const updateCart = cart.map((item) =>
            item.id === cartItem.id ? { ...item, quantity: newQuantity } : item
        );
        dispatch(setCart(updateCart));
        await updateCartItem({
            customer_id: customer.id,
            dish_id: cartItem.dish_id,
            quantity: newQuantity,
        });
    };

    const handleRemove = async () => {
        const newCart = cart.filter((item) => item.id !== cartItem.id);
        dispatch(setCart(newCart));
        await removeCartItem({
            customer_id: customer.id,
            item_id: cartItem.id,
        });
    };

    return (
        <div className="flex items-center justify-between p-4 border rounded mb-2">
            {((isLoading || !dish) && !isError)
                ? <div>Loading...</div>
                : isError
                ? <div>Error: {error.data.message}</div>
                : (
                    <>
                        <div>
                            <div className="font-bold">{dish.name}</div>
                            <div className="text-sm text-gray-600">
                                ${dish.price}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Select
                                value={String(quantity)}
                                onValueChange={(val) =>
                                    handleQuantityChange(parseInt(val))}
                            >
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
                                                <SelectItem
                                                    key={i + 1}
                                                    value={(i + 1).toString()}
                                                >
                                                    {i + 1}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <button
                                onClick={handleRemove}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    </>
                )}
        </div>
    );
}

export function Cart() {
    const cart = useAppSelector((state) => state.cart);
    const customer = useAppSelector((state) => state.customer);

    if (!cart) {
        return (
            <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
                <div>Loading...</div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
                <div className="shadow-md p-4 space-y-3">
                    <div className="text-xl font-bold">Your cart is empty</div>
                    <a href="/explore">Continue shopping</a>
                </div>
            </div>
        );
    }

    const [
        createOrder,
        { isSuccess, isError, isLoading },
    ] = useCreateOrderMutation();

    // Calculate subtotal and total items.
    // Here we assume each cart item includes a "price" property.
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce(
        (acc, item) => acc + item.quantity * (item.price || 0),
        0,
    );

    async function handlePurchase() {
        // Handle purchase logic here
        const { error } = await createOrder({ customer_id: customer.id });
        if (error) {
            console.error(error);
        }
    }

    return (
        <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
            <div className="text-4xl font-bold">Cart</div>
            <div>
                {cart.map((cartItem) => (
                    <CartItemRow key={cartItem.id} cartItem={cartItem} />
                ))}
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between font-bold text-xl">
                    <span>Subtotal ({totalItems} items):</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <button
                    onClick={handlePurchase}
                    className="w-full bg-yellow-500 rounded-full p-2 rounded hover:opacity-50"
                >
                    Place Order
                </button>
            </div>
            <div className="flex justify-center text-center mt-4">
                {(isLoading || isSuccess) && (
                    <LoadingSpinnerToCheck
                        isSuccess={isSuccess}
                        successMessage="Order sent!"
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
    );
}
