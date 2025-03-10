import { Badge } from "@/components/ui/badge";
import { FavoriteRestaurantWrapper } from "@/components/Customers/FavoriteRestaurantWrapper";
import { Restaurant } from "@/types";

function Header({ restaurant }: { restaurant: Restaurant }) {
    return (
        <div className="space-y-4">
            <div className="text-sm space-y-2">
                <div className="flex justify-between">
                    <Badge>LOCATION</Badge> {restaurant.location}
                </div>
                <div className="flex justify-between">
                    <Badge>CONTACT</Badge> {restaurant.contact_info}
                </div>
                <FavoriteRestaurantWrapper restaurant_id={restaurant.id} />
            </div>
            <div className="text-center">
                <h1 className="text-4xl font-bold">{restaurant.name}</h1>
                <p className="text-lg mt-2">{restaurant.description}</p>
            </div>
        </div>
    );
}

export { Header };
