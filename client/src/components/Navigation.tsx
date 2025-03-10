import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationDrawer } from "./NavigationDrawer";
import Banner from "/banner.svg";
import { ShoppingCart } from "lucide-react";
import { Customer, Restaurant } from "@/types";
import { useAppSelector } from "@/app/hooks";

function Navigation(
    { customer, restaurant }: { customer: Customer; restaurant: Restaurant },
) {
    const [isScrolled, setIsScrolled] = useState(false);

    const cart = useAppSelector((state) => state.cart);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

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
                        <NavigationDrawer customer={customer}>
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
                                <div className=" rounded">
                                    <span className="text-sm">Manage</span>{" "}
                                    <br />
                                    <span className='text-lg font-bold'>{restaurant.name}</span>
                                </div>
                            </Link>
                        </li>
                    )}
                </div>
                <div className="flex gap-10 pr-10 items-center">
                    {!customer.name
                        ? (
                            <>
                                <li>
                                    <a href="/customers/login">
                                        <Button variant="outline">
                                            Login
                                        </Button>
                                    </a>
                                </li>
                                <li>
                                    <a href="/customers/signup">
                                        <Button>
                                            Sign up
                                        </Button>
                                    </a>
                                </li>
                            </>
                        )
                        : (
                            <>
                                <li>
                                    <Link to="/customers">
                                        <div className="block rounded-lg bg-white p-2 border-2 border-transparent hover:border-black">
                                            <div className="text-xs">
                                                Hello, {customer.name}
                                            </div>
                                            <div className="font-bold">
                                                Account
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/customers/favorites">
                                        <div className="block rounded-lg bg-white p-2 border-2 border-transparent hover:border-black">
                                            <div className="text-xs">
                                                Save
                                            </div>
                                            <div className="font-bold">
                                                Favorites
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/customers/orders">
                                        <div className="block rounded-lg bg-white p-2 border-2 border-transparent hover:border-black">
                                            <div className="text-xs">
                                                Payments
                                            </div>
                                            <div className="font-bold">
                                                & Orders
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/customers/cart">
                                        <div className="bg-white p-2 rounded-lg flex gap-2 items-center border-2 border-transparent hover:border-black relative">
                                            <ShoppingCart size={36} />
                                            <div className="font-bold">
                                                Cart
                                            </div>
                                            <div className="absolute top-0 left-8 border-black border-2 bg-white font-bold text-orange-700 w-6 h-6 rounded-full flex justify-center items-center">
                                                {cartCount}
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            </>
                        )}
                </div>
            </ul>
        </nav>
    );
}

export { Navigation };
