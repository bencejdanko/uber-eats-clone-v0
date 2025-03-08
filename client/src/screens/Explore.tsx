import { useGetRestaurantListQuery } from "@/services/api";
import { LoadingSpinner } from "@/components";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function Explore() {
    const { data, error, isLoading } = useGetRestaurantListQuery();

    return (
        <div className="h-screen pt-20 p-5 w-full">
            <div className='text-4xl mb-5'>Explore Local Restaurants</div>

            {isLoading && <div className='h-full w-full flex justify-center items-center'><LoadingSpinner /></div>}


            {error && <div>Error loading data</div>}
            {data &&
                data.rows.map((restaurant) => (
                    <Card className='max-w-sm'>
                        <CardHeader>
                            <CardTitle>{restaurant.name}</CardTitle>
                            <CardDescription>
                                {restaurant.description ||
                                    "No description available"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {restaurant.contact_info ||
                                "No contact info available"}
                        </CardContent>
                        <CardFooter>{restaurant.location}</CardFooter>
                    </Card>
                ))}
        </div>
    );
}

export { Explore };
