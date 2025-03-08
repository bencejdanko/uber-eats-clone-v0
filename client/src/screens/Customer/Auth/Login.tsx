import { LoginForm } from "@/components/Customers";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCustomer } from "@/features/auth";
import { useLoginCustomerMutation } from "@/services/api";
import { useNavigate } from "react-router-dom";

import { LoadingSpinnerToCheck } from "@/components";

function Login() {
    const dispatch = useAppDispatch();

    const [loginCustomer, { isLoading, isError, isSuccess }] =
        useLoginCustomerMutation();
    const navigate = useNavigate();

    async function onSubmit(data: any) {
        const { error, data: customer } = await loginCustomer(data);

        if (error) {
            console.error(error);
            return;
        }

        dispatch(setCustomer(customer));
    }

    return (
        <>
            <div className="p-5 border shadow-lg m-5 mx-auto max-w-md rounded-lg">
                <a href="/">
                    <div className="mb-2 text-sm">Return</div>
                </a>
                <h1 className="text-2xl mb-5 font-bold">Login</h1>
                <LoginForm onSubmit={onSubmit} />


                <div className="flex justify-center text-center">
                    {(isLoading || isSuccess) && (
                        <LoadingSpinnerToCheck
                            isSuccess={isSuccess}
                            successMessage="Logged in"
                            onComplete={() => navigate("/customers")}
                        />
                    )}
                    {(isError) && (
                        <div className='text-red-500'>Oops, something went wrong. <br /> Please check your email and password.</div>
                    )}
                </div>

                <div className="flex justify-end">
                    <Link to="/customers/signup">Sign up</Link>
                </div>
            </div>
        </>
    );
}

export { Login };
