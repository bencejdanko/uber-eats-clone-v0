import { ReactNode } from "react";
import { SEO } from "@/components";
import { Navigation } from "@/components";
import { NavigationFooter } from "@/components";
import { LegalFooter } from "@/components";

function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <SEO
                title="DishDash | Restaurant Delivery"
                description="DishDash is a restaurant delivery service."
                favicon="/icon.svg"
            />
            <header><Navigation /></header>
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
