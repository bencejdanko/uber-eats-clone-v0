import { LogoutWrapper } from "@/components/Customers";
import { ProfileForm } from "@/components/Customers";
import { SEO } from "@/components";

function Home() {
    return (
        <div>
            <SEO
                title="Customer Portal | DishDash"
                description="DishDash is a restaurant delivery service."
                favicon="/icon.svg"
            />
            <h1>Dashboard</h1>
            <LogoutWrapper className="bg-red-500 text-white">
                Logout
            </LogoutWrapper>

            <div className="mt-4 max-w-md mx-auto">
                <ProfileForm />
            </div>
        </div>
    );
}

export { Home };
