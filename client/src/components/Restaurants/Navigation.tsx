import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationDrawer } from "./NavigationDrawer";
import Banner from "/banner.svg";
import { ShoppingCart } from "lucide-react";
import { Customer, Restaurant } from "@/types";

function Navigation(
    { restaurant }: { restaurant: Restaurant },
) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`z-10 fixed top-0 left-0 w-full transition-colors duration-300 ${
                isScrolled ? "bg-white" : "bg-transparent"
            }`}
        >
            <ul className="flex justify-between p-5 items-center">
                <div className="flex gap-5 items-center">
                    <li>
                        <NavigationDrawer restaurant={restaurant}>
                            <div className="relative group">
                                <Menu className="relative z-10" size={32} />
                                <div className="absolute inset-0 rounded-full bg-[#f3f3f3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150">
                                </div>
                            </div>
                        </NavigationDrawer>
                    </li>
                    <li>
                        <a href="/">
                            <img src={Banner} alt="Banner" className="h-8" />
                        </a>
                    </li>
                    {restaurant.name && (
                        <li>
                            <Link to="/restaurants">
                                <span className="text-sm">Manage</span> <br />
                                <span className="text-lg font-bold">
                                    {restaurant.name}
                                </span>
                            </Link>
                        </li>
                    )}
                </div>
                <div className="flex gap-10 pr-10 items-center">
                    <>
                        <li>
                            <Link to="/restaurants">
                                <div className="block rounded-lg bg-white p-2 border-2 border-transparent hover:border-black">
                                    <div className="text-xs">
                                        {restaurant.name}
                                    </div>
                                    <div className="font-bold">
                                        Account
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/customers">
                                <div className="block rounded-lg bg-white p-2 border-2 border-transparent hover:border-black">
                                    <div className="text-xs">
                                        Customers
                                    </div>
                                    <div className="font-bold">
                                        & Orders
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </>
                </div>
            </ul>
        </nav>
    );
}

export { Navigation };
