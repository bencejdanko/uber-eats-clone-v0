import { useAppSelector } from "@/app/hooks";
import { useGetOrdersByCustomerIdQuery, useGetOrderItemsByOrderIdQuery } from "@/services/api";
import { useEffect } from "react";

function Order({ orderId, customerId }: { orderId: string, customerId: string }) {
    const { data: orderItems, error } = useGetOrderItemsByOrderIdQuery({ order_id: orderId, customer_id: customerId });

    useEffect(() => {
        if (orderItems) {
            console.log("Order items:", orderItems);
        } else if (error) {
            console.error("No order items:", error);
        }
    }, [orderItems, error]);

    return (
        <div className="p-4 space-y-3">
            <div className="text-xl font-bold border-b border-b-2 mb-2 pb-2">Order ID: {orderId}</div>
            {orderItems ? (
                <div className=''>
                    {orderItems.map((item: any) => (
                        <div key={item.id} className="py-2 ">
                            <div><strong>Dish ID:</strong> {item.dish_id}</div>
                            <div><strong>Quantity:</strong> {item.quantity}</div>
                            <div><strong>Price:</strong> ${item.price}</div>
                            <div><strong>Status:</strong> {item.order_status}</div>
                            <div><strong>Ordered At:</strong> {new Date(item.createdAt).toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading order items...</div>
            )}
        </div>
    );
}

function Orders() {
    const customer = useAppSelector((state) => state.customer);
    const { data: orders, error } = useGetOrdersByCustomerIdQuery({ customer_id: customer.id });

    useEffect(() => {
        if (orders) {
            console.log("Orders active:", orders);
        } else if (error) {
            console.error("No orders active:", error);
        }
    }, [orders, error]);

    return (
        <div>
            <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
                <div className="text-4xl font-bold">Orders</div>
                {orders ? (
                    orders.map((order: any) => (
                        <Order key={order.id} orderId={order.id} customerId={customer.id} />
                    ))
                ) : (
                    <div className="shadow-md p-4 space-y-3">
                        <div className="text-xl font-bold">Your orders will be displayed here</div>
                        <a href='/explore'>Start shopping</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export { Orders };
