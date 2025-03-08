import { Link } from "react-router-dom";
import { SignUpForm } from "@/components/Customers";

import { useSignupCustomerMutation } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { LoadingSpinnerToCheck } from "@/components";
import { setCustomer } from "@/features/auth";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";

function SignUp() {


    const [signupCustomer, { isError, isLoading, isSuccess }] = useSignupCustomerMutation();
    const customer = useAppSelector((state) => state.customer);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    async function onSubmit(data: any) {
        const { error, data: customer } = await signupCustomer(data);

        if (error) {
            console.error(error);
            return;
        }

        dispatch(setCustomer(customer))
    }

    useEffect(() => {
        if (customer.id && isSuccess) {
            const timer = setTimeout(() => {
                navigate("/customers");
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [customer, isSuccess, navigate]);

    return (
        <div className="p-5 border shadow-lg m-5 mx-auto max-w-md rounded-lg">
            <a href="/">
                <div className="mb-2 text-sm">Return</div>
            </a>
            <h1 className="text-2xl mb-5 font-bold">Sign Up</h1>
            <SignUpForm onSubmit={onSubmit} />

            {isError && <div>Error</div>}
            {isSuccess && <div>Success</div>}

            {isLoading && <LoadingSpinnerToCheck />}

            <div className="flex justify-end">
                <Link to="/customers/login">Log in</Link>
            </div>

        </div>
    );
}

export { SignUp };
