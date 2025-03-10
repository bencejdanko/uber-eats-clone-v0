export interface Customer {
    id: string;
    name: string;
    email: string;
    profile_picture?: string;
    country?: string;
    state?: string;
}

export interface Restaurant {
    id: string;
    name: string;
    email: string;
    location: string;
    description?: string;
    contact_info: string;
}

export interface RestaurantTiming {
    restaurant_id: string;
    day_of_week: string;
    open_time?: string;
    close_time?: string;
    closed?: boolean;
}

export interface Dish {
    id: string;
    restaurant_id: string;
    name: string;
    ingredients: string;
    description?: string;
    price: number;
    category: string;
    image?: string;
}

export interface RestarauntImage {
    id: string;
    restaurant_id: string;
    image_url: string;
}

export interface CartItem {
    id: string;
    cart_id: string;
    dish_id: string;
    quantity: number;
    price: number;
}

export interface FavoriteRestaurant {
    customer_id: string;
    restaurant_id: string;
}

export interface FavoriteDish {
    customer_id: string;
    dish_id: string;
}

export interface Order {
    id: string;
    customer_id: string;
    order_date: string;
    total_amount: number;
}

export interface OrderItem {
    order_id: string;
    restaurant_id: string;
    dish_id: string;
    quantity: number;
    price: number;
    order_status: string;
}