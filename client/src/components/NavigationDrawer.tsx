import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
    DrawerTitle,
} from "@/components/ui/drawer";

import { LogoutWrapper } from "./Customers";

import Icon from "/icon.svg";

import { Button } from "@/components/ui/button";
import { Customer } from "@/types";

function NavigationDrawer(
    { children, customer }: { children: React.ReactNode; customer: Customer },
) {
    return (
        <Drawer direction="left">
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="p-4 flex flex-col gap-4">
                <DrawerTitle tabIndex={-1} ref={(el) => el && el.focus()}>Menu</DrawerTitle>
                {!customer.name
                    ? (
                        <>
                            <a className="w-full" href="/customers/signup">
                                <Button className="w-full h-18">Sign up</Button>
                            </a>
                            <a className="w-full" href="/customers/login">
                                <Button
                                    variant="outline"
                                    className="w-full h-18"
                                >
                                    Log in
                                </Button>
                            </a>
                        </>
                    )
                    : (
                        <>
                        Welcome, {customer.name}
                        <LogoutWrapper className='w-full'>
                            <Button variant='destructive' className="w-full h-18">Log out</Button>
                        </LogoutWrapper>
                        </>
                    )}

                <a href="/restaurants/login">Add your restaurant</a>
                <DrawerFooter>
                    <img src={Icon} alt="Icon" className="h-56" />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export { NavigationDrawer };
