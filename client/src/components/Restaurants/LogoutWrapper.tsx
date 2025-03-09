import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { useLogoutRestaurantMutation } from "@/services/api";
import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import { clearRestaurant } from "@/features/restaurants/auth";

interface LogoutWrapperProps {
    className: string;
    children: React.ReactNode;
}

function LogoutWrapper({ className, children }: LogoutWrapperProps) {
    const dispatch = useAppDispatch();
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    const [logoutRestaurant, { isError, isLoading, isSuccess }] =
        useLogoutRestaurantMutation();

    async function logout() {
        const { error } = await logoutRestaurant();
        dispatch(clearRestaurant());
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
        <div className="flex items-center p-2 gap-2">
            <button className={className} onClick={logout}>{children}</button>
            {" "}
            {isLoading && <Loader2 className="animate-spin" />}
        </div>
    );
}

export { LogoutWrapper };
