import { useAppSelector } from "@/app/hooks";
import { CartItem } from "@/types";

function Favorites() {
    const favoriteRestaurants = useAppSelector((state) => state.favoriteRestaurants);
    const favoriteDishes = useAppSelector((state) => state.favoriteDishes);



    function CartItems({ cart }: { cart: CartItem[] }) {

        if (!cart) {
            return <div>Loading...</div>;
        }

        if (cart.length === 0) {
            return (
                <div className="shadow-md p-4 space-y-3">
                    <div className="text-xl font-bold">Your cart is empty</div>
                    <a href='/explore'>Continue shopping</a>
                </div>
            );
        }

        return (
            <div>
                {cart.map((cartItem) => (
                    <div key={cartItem.id}>
                        {cartItem.quantity} x {cartItem.dish_id}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
            <div className="text-4xl font-bold">
                Cart
            </div>
            <CartItems cart={cart} />
        </div>
    );
}

export { Favorites };