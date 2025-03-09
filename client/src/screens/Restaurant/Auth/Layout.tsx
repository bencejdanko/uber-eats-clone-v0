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
                <div className="bg-white text-black p-5 font-bold">
                    Restaurants San Jose
                </div>
            </header>
            <div className='-z-10 absolute w-screen h-screen bg-black'></div>
            <main>{children}</main>
        </>
    );
}

export { Layout };
