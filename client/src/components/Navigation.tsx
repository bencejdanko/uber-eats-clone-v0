import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationDrawer } from "./NavigationDrawer";

function Navigation() {
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
            <ul className="flex justify-between p-5">
                <div className="flex gap-5">
                    <li>
                        <NavigationDrawer>
                            <div className="relative group">
                                <Menu className="relative z-10" size={32} />
                                <div className="absolute inset-0 rounded-full bg-[#f3f3f3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
                            </div>
                        </NavigationDrawer>
                    </li>
                    <li>
                        <a href="/">
                            <span className="text-xl font-bold">Restaurants San Jose</span>
                        </a>
                    </li>
                </div>
                <div className="flex gap-5">
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
                </div>
            </ul>
        </nav>
    );
}

export { Navigation };
