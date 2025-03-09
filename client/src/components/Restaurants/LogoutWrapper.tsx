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

    const [logoutRestaurant, { isError, isLoading, isSuccess }] =
        useLogoutRestaurantMutation();

    async function logout() {
        const { error } = await logoutRestaurant();
        dispatch(clearRestaurant());
        if (error) {
            console.error(error);
            return
        }
    }

    useEffect(() => {
        if (isSuccess) {
            window.location.href = "/";
        }
    }, [isSuccess]);

    return (
        <div className="flex items-center p-2 gap-2">
            <div className={className} onClick={logout}>{children}</div>
            {" "}
            {isLoading && <Loader2 className="animate-spin" />}
        </div>
    );
}

export { LogoutWrapper };
