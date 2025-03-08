import { Link } from "react-router-dom";

import Hero from "/hero2.jpg";
import { Helmet } from "react-helmet-async";

import { SEO } from "@/components";

function Home() {
    return (
        <div>
            <SEO
                title="DishDash | Restaurant Delivery"
                description="DishDash is a restaurant delivery service."
                favicon="/icon.svg"
            />
            <div className="flex flex-col w-screen h-screen">
                <img
                    src={Hero}
                    alt="Hero"
                    className="absolute -z-10 object-cover w-full h-full"
                />

                <div>
                    
                </div>
                <h1>DishDash</h1>
                <p className="font-bold">Customers</p>
                <Link to="/customers/signup">Sign up</Link>
                <Link to="/customers/login">Login</Link>
                <p className="font-bold">Restaurants</p>
                <Link to="/restaurants/signup">Sign up</Link>
                <Link to="/restaurants/login">Login</Link>
            </div>
            <div>Section 2</div>
        </div>
    );
}

export { Home };
