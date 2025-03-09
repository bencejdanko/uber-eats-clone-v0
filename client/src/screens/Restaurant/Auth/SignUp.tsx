import { Link } from "react-router-dom";
import { SignUpForm } from "@/components/Restaurants";

import { useSignupRestaurantMutation } from "@/services/api";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/app/hooks";
import { setRestaurant } from "@/features/restaurants/auth";
import { LoadingSpinnerToCheck } from "@/components";

function SignUp() {
    const [signupRestaurant, { isError, isLoading, isSuccess }] =
        useSignupRestaurantMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    async function onSubmit(data: any) {
        const { error, data: restaurant } = await signupRestaurant(data);

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
            <h1 className="text-2xl mb-5 font-bold">
                Register your Restaurant
            </h1>
            <SignUpForm onSubmit={onSubmit} />

            <div className="flex justify-center">
                {(isLoading || isSuccess) && (
                    <LoadingSpinnerToCheck
                        isSuccess={isSuccess}
                        onComplete={() => navigate("/restaurants")}
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
                <Link to="/restaurants/login">Log in</Link>
            </div>
        </div>
    );
}

export { SignUp };
