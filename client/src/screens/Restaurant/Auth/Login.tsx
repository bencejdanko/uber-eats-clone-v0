import { LoginForm } from "@/components/Restaurants";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setRestaurant } from "@/features/restaurants/auth";
import { useLoginRestaurantMutation } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { LoadingSpinnerToCheck } from "@/components";

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loginRestaurant, { isLoading, isError, isSuccess }] =
        useLoginRestaurantMutation();

    async function onSubmit(data: any) {
        const { error, data: restaurant } = await loginRestaurant(data);

        if (error) {
            console.error(error);
            return;
        }

        dispatch(setRestaurant(restaurant));
    }

    return (
        <div className="p-5 border shadow-lg m-5 mx-auto max-w-md rounded-lg bg-white">
            <Link to="/">
                <div className="mb-2 text-sm">Return</div>
            </Link>
            <h1 className="text-2xl mb-5 font-bold">Login</h1>
            <LoginForm onSubmit={onSubmit} />
            <div className="flex justify-center">
                {(isLoading || isSuccess) && (
                    <LoadingSpinnerToCheck
                        isSuccess={isSuccess}
                        onComplete={() => navigate("/explore")}
                    />
                )}
                {isError && (
                    <div className="text-red-500">
                        Oops, something went wrong. <br />{" "}
                        Please check your email and password.
                    </div>
                )}
            </div>
            <div className="flex justify-end">
                <Link to="/restaurants/signup">Sign up</Link>
            </div>
        </div>
    );
}

export { Login };
