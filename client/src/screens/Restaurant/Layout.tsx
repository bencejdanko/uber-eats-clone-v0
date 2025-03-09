import { ReactNode } from "react";
import { useAppSelector } from "@/app/hooks";
import { Navigation } from "@/components/Restaurants";

function Layout({ children }: { children: ReactNode }) {

    const restaurant = useAppSelector((state) => state.restaurant)

    return (
        <>
            <header><Navigation restaurant={restaurant} /></header>
            <main>{children}</main>
        </>
    );
}

export { Layout };
