import { useGetRestaurantListQuery } from "@/services/api";
import { Loader2, Mountain, Navigation } from "lucide-react";

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
        <div className="min-h-screen pt-30 p-5 w-full">
            <div className="text-4xl mb-5">Explore Local Restaurants</div>

            {isLoading && (
                <div className="h-full w-full flex justify-center items-center gap-2 text-lg">
                    Loading <Loader2 className="animate-spin" size={36} />
                </div>
            )}

            {error && <div>Error loading data</div>}
            <div className='flex flex-wrap flex-grow gap-5 overflow-y-auto overflow-y-hidden'>
                {data &&
                    data.rows.map((restaurant) => (
                        <Card className="max-w-xs min-w-xs">
                            <CardHeader>
                                <CardTitle>{restaurant.name}</CardTitle>
                                <CardDescription>
                                    {restaurant.description ||
                                        "No description available"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="w-full h-48 bg-gray-200 flex justify-center items-center">
                                <Mountain size={64} className="text-gray-500" />
                            </CardContent>
                            <CardFooter>
                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Navigation size={16} />
                                        {restaurant.location}
                                    </div>
                                    <div>
                                        {restaurant.contact_info ||
                                            "No contact info available"}
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
            </div>
        </div>
    );
}

export { Explore };
