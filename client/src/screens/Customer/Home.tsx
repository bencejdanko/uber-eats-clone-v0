import { ProfilePictureChangeWrapper } from "@/components/Customers";
import { ProfileForm } from "@/components/Customers";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { LoadingSpinnerToCheck } from "@/components";
import { useUpdateUserMutation } from "@/services/api";
import { Customer } from "@/types";
import { setCustomer } from "@/features/customers/auth";
import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
    const dispatch = useAppDispatch();
    const [updateCustomer, { isLoading, isError, isSuccess, error }] =
        useUpdateUserMutation();

    const customer = useAppSelector((state) => state.customer);

    async function onSubmit(data: any) {
        const updatedData: Customer = {
            ...data,
            id: customer.id,
            email: customer.email,
        };

        const { error } = await updateCustomer(updatedData);

        if (error) {
            console.error(error);
            return;
        }

        dispatch(setCustomer(updatedData));
    }

    return (
        <div>
            <div className="mt-4 max-w-md mx-auto flex flex-col gap-10 py-20">
                {customer.name
                    ? (
                        <>
                            <div className="text-4xl font-bold">
                                Change user settings
                            </div>
                            <div className="flex justify-center">
                                <ProfilePictureChangeWrapper
                                    customer={customer}
                                >
                                    {customer.profile_picture
                                        ? (
                                            <div>
                                                <img
                                                    src={customer
                                                        .profile_picture}
                                                    alt={customer
                                                        .profile_picture}
                                                    className="rounded-full w-30 h-30"
                                                />
                                            </div>
                                        )
                                        : (
                                            <div className="w-30 h-30 bg-gray-100 rounded-full flex justify-center items-center">
                                                <UserRound className="w-20 h-20" />
                                            </div>
                                        )}
                                </ProfilePictureChangeWrapper>
                            </div>

                            <ProfileForm
                                customer={customer}
                                onSubmit={onSubmit}
                            />
                            {(isLoading || isSuccess) && (
                                <LoadingSpinnerToCheck
                                    isSuccess={isSuccess}
                                    successMessage="Updated!"
                                    onComplete={() => {}}
                                />
                            )}
                        </>
                    )
                    : (
                        <div className="text-center">
                            <div className="text-3xl font-bold">
                                No account?
                            </div>
                            <Link to="/customers/signup" className='text-2xl'>
                                Sign up
                            </Link>
                        </div>
                    )}
            </div>
        </div>
    );
}

export { Home };
