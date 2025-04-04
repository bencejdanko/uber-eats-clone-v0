import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { useLogoutCustomerMutation } from "@/services/api";
import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import { clearCustomer } from "@/features/customers/auth";

interface LogoutWrapperProps {
    className: string;
    children: React.ReactNode;
}

function LogoutWrapper({ className, children }: LogoutWrapperProps) {
    const dispatch = useAppDispatch();
    const [logoutSuccess, setLogoutSuccess] = useState(false);


    const [logoutCustomer, { isError, isLoading, isSuccess }] =
        useLogoutCustomerMutation();


    async function logout() {
        const { error } = await logoutCustomer();
        dispatch(clearCustomer());
        if (error) {
            console.error(error);
        }
        setLogoutSuccess(true);
    }

    useEffect(() => {
        if (logoutSuccess) {
            window.location.href = "/";
        }
    }, [logoutSuccess]);

    return (
        <div className='flex items-center p-2 gap-2'>
            <button className={className} onClick={logout}>{children}</button>
            {" "}
            {isLoading && <Loader2 className="animate-spin" />}
        </div>
    );
}

export { LogoutWrapper };
