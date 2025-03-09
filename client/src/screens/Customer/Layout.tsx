import { ReactNode } from "react";
import { SEO } from "@/components";
import { useAppSelector } from "@/app/hooks";
import { Navigation } from "@/components";

function Layout({ children }: { children: ReactNode }) {

    const customer = useAppSelector((state) => state.customer)
    const restaurant = useAppSelector((state) => state.restaurant)
    

    return (
        <>
            <SEO
                title="Customer Portal | DishDash"
                description="DishDash is a restaurant delivery service."
                favicon="/icon.svg"
            />
            <header><Navigation customer={customer} restaurant={restaurant} /></header>
            <main>{children}</main>
        </>
    );
}

export { Layout };
