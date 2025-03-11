import { useAppSelector } from "@/app/hooks";
import {
    useGetCustomerByIdQuery,
    useGetOrderItemsByRestaurantIdQuery,
    useUpdateOrderItemMutation,
} from "@/services/api";
import { OrderItem } from "@/types";
import { useEffect, useState } from "react";
import { LoadingSpinnerToCheck } from "@/components";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function Order({ orderItem }: { orderItem: OrderItem }) {
    const { data: customer, error } = useGetCustomerByIdQuery({
        customer_id: orderItem.customer_id,
    });

    const [updateOrderItem, { isLoading, isError, isSuccess }] =
        useUpdateOrderItemMutation();
    const [orderStatus, setOrderStatus] = useState(orderItem.order_status);

    if (error) {
        return <div className="text-red-500">Error loading customer data</div>;
    }

    return (
        <div className="p-4 space-y-3 border rounded shadow-md">
            {customer
                ? (
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col space-y-2">
                            <div className="text-lg font-bold">
                                Customer Information
                            </div>
                            <div>Name: {customer.name}</div>
                            <div>Email: {customer.email}</div>
                            <div>Country: {customer.country}</div>
                            <div>State: {customer.state}</div>
                        </div>
                        <img
                            src={customer.profile_picture}
                            alt="Customer"
                            className="w-20 h-20 rounded-full"
                        />
                    </div>
                )
                : <div>Loading customer information...</div>}
            <div className="flex flex-col space-y-2">
                <div className="text-lg font-bold">Order Details</div>
                <div>Dish ID: {orderItem.dish_id}</div>
                <div>Quantity: {orderItem.quantity}</div>
                <div>Price: ${orderItem.price}</div>
                <Select
                    value={orderStatus}
                    onValueChange={(value) => {
                        setOrderStatus(value);
                        updateOrderItem({
                            id: orderItem.restaurant_id,
                            order_status: value,
                            orderItemId: orderItem.id,
                        });
                    }}
                >
                    <SelectTrigger className="w-full">
                        <div>
                            <b>Order Status: {" "}</b>
                            <SelectValue placeholder="Select a status" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Order Received">
                                Order Received
                            </SelectItem>
                            <SelectItem value="Preparing">Preparing</SelectItem>
                            <SelectItem value="On the Way">
                                On the Way
                            </SelectItem>
                            <SelectItem value="Pick-up Ready">
                                Pick-up Ready
                            </SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Picked Up">Picked Up</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex justify-center">
                    {(isLoading || isSuccess) && (
                        <LoadingSpinnerToCheck
                            isSuccess={isSuccess}
                            onComplete={() => {}}
                        />
                    )}
                    {isError && (
                        <div className="text-red-500">
                            Oops, something went wrong.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Orders() {
    const restaurant = useAppSelector((state) => state.restaurant);
    const { data: orders, error } = useGetOrderItemsByRestaurantIdQuery({
        restaurant_id: restaurant.id,
    });

    const [filter, setFilter] = useState("All");

    useEffect(() => {
        if (orders) {
            console.log("Orders active:", orders);
        } else if (error) {
            console.error("No orders active:", error);
        }
    }, [orders, error]);

    const filteredOrders = orders?.filter((order: OrderItem) => {
        if (filter === "All") return true;
        return order.order_status === filter;
    });

    return (
        <div>
            <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
                <div className="text-4xl font-bold">Orders</div>
                <Select
                    value={filter}
                    onValueChange={(value) => setFilter(value)}
                >
                    <SelectTrigger className="w-full">
                        <div>
                            <b>Filter Orders: {" "}</b>
                            <SelectValue placeholder="Select a filter" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Filter</SelectLabel>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {filteredOrders
                    ? (
                        filteredOrders.map((order: any) => (
                            <Order key={order.id} orderItem={order} />
                        ))
                    )
                    : (
                        <div className="shadow-md p-4 space-y-3">
                            <div className="text-xl font-bold">
                                You have no pending orders
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export { Orders };
