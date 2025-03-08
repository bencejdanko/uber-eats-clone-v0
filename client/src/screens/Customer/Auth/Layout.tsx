import { ReactNode } from "react";
import { SEO } from "@/components";

function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <SEO
                title="Sign in | San Jose Restaurants"
                description="San Jose Restaurants is a restaurant delivery service for the city of San Jose."
                favicon="/icon.svg"
            />
            <header>
                <div className="bg-black text-white p-5 font-bold">
                    Restaurants San Jose
                </div>
            </header>
            <main>{children}</main>
        </>
    );
}

export { Layout };
