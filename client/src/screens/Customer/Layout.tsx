import { ReactNode } from "react";
import { SEO } from "@/components";

function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <SEO
                title="Customer Portal | DishDash"
                description="DishDash is a restaurant delivery service."
                favicon="/icon.svg"
            />
            <main>{children}</main>
        </>
    );
}

export { Layout };
