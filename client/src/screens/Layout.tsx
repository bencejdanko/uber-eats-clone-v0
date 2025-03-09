import { ReactNode } from "react";
import { SEO } from "@/components";
import { Navigation } from "@/components";
import { NavigationFooter } from "@/components";
import { LegalFooter } from "@/components";
import { useAppSelector } from "@/app/hooks";

function Layout({ children }: { children: ReactNode }) {

    const customer = useAppSelector((state) => state.customer)
    const restaurant = useAppSelector((state) => state.restaurant)
    return (
        <>
            <SEO
                title="San Jose Restaurants | Restaurant Delivery in San Jose"
                description="DishDash is a restaurant delivery service."
                favicon="/icon.svg"
            />
            <header><Navigation customer={customer} restaurant={restaurant} /></header>
            <main>{children}</main>
            <hr className='my-2' />
            <footer>
                <NavigationFooter />
                <hr className='my-2' />
                <LegalFooter />
            </footer>
        </>
    );
}

export { Layout };
