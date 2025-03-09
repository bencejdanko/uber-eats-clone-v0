import { Link } from "react-router-dom";
import { SignUpForm } from "@/components/Customers";

import { useSignupCustomerMutation } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { LoadingSpinnerToCheck } from "@/components";
import { setCustomer } from "@/features/customers/auth";
import { useAppDispatch } from "@/app/hooks";

function SignUp() {
    const [signupCustomer, { isError, isLoading, isSuccess }] =
        useSignupCustomerMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    async function onSubmit(data: any) {
        const { error, data: customer } = await signupCustomer(data);

        if (error) {
            console.error(error);
            return;
        }

        dispatch(setCustomer(customer));
    }

    return (
        <div className="p-5 border shadow-lg m-5 mx-auto max-w-md rounded-lg">
            <a href="/">
                <div className="mb-2 text-sm">Return</div>
            </a>
            <h1 className="text-2xl mb-5 font-bold">Sign Up</h1>
            <SignUpForm onSubmit={onSubmit} />

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
                <Link to="/customers/login">Log in</Link>
            </div>
        </div>
    );
}

export { SignUp };
