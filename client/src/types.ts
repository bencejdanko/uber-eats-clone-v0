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