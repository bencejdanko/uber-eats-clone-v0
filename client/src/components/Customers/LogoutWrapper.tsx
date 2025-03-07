import { useAppDispatch } from "@/app/hooks";
import { clearUser } from "@/features/auth";
import { useNavigate } from "react-router-dom";

import { useLogoutCustomerMutation } from "@/services/deliveryEats";

interface LogoutWrapperProps {
    className: string;
    children: React.ReactNode;
}

function LogoutWrapper({ className, children }: LogoutWrapperProps) {

    const dispatch = useAppDispatch();
    const [logoutCustomer] = useLogoutCustomerMutation();

    const navigate = useNavigate();

    async function logout() {
        const { error } = await logoutCustomer();
        dispatch(clearUser());

        if (error) {
            console.error(error);
        }
        navigate("/");
    }

    return <button className={className} onClick={logout}>{children}</button>;
}

export { LogoutWrapper };