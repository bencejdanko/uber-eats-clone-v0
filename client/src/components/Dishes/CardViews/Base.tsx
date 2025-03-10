import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToCartWrapper } from "@/components/Customers/AddToCartWrapper";
import { FavoriteDishWrapper } from "@/components/Customers/FavoriteDishWrapper";
import { Dish } from "@/types";

function Base({ dish }: { dish: Dish }) {
    return (
        <Card
            key={dish.name}
            className="relative flex flex-col"
        >
            <CardHeader>
                <div className="absolute right-10">
                    <Badge>
                        {dish.category}
                    </Badge>
                </div>
                <CardTitle className="text-lg">
                    {dish.name}
                </CardTitle>
                <CardDescription>
                    {dish.description}
                </CardDescription>
            </CardHeader>
            {dish.image && (
                <CardContent>
                    <img
                        src={dish.image}
                        alt={dish.name}
                        className="object-cover w-full h-40 rounded-md"
                    />
                </CardContent>
            )}
            <CardContent className="flex-1">
                <CardDescription className="text-sm">
                    <span className="font-semibold">
                        Ingredients: {" "}
                    </span>
                    {dish.ingredients}
                </CardDescription>
                <div className="mt-2 font-semibold">
                    ${dish.price}
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-5">
                <AddToCartWrapper
                    dish_id={dish.id}
                >
                    <div className="font-semibold w-full py-2 rounded-md text-sm text-black bg-yellow-300">
                        Add to cart
                    </div>
                </AddToCartWrapper>

                <FavoriteDishWrapper
                    dish_id={dish.id}
                />
            </CardFooter>
        </Card>
    );
}

export { Base };