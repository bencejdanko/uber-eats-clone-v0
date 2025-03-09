import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
    DrawerTitle,
} from "@/components/ui/drawer";

import { LogoutWrapper } from ".";

import Icon from "/icon.svg";

import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";

function NavigationDrawer(
    { children, restaurant }: { children: React.ReactNode; restaurant: Restaurant },
) {
    return (
        <Drawer direction="left">
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="p-4 flex flex-col gap-4">
                <DrawerTitle tabIndex={-1} ref={(el) => el && el.focus()}>Restaurant Portal</DrawerTitle>
                {!restaurant.name
                    ? (
                        <>
                            <a className="w-full" href="customers/signup">
                                <Button className="w-full h-18">Sign up</Button>
                            </a>
                            <a className="w-full" href="customers/login">
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
                        Welcome, {restaurant.name}
                        <LogoutWrapper className='w-full'>
                            <Button variant='destructive' className="w-full h-18">Log out</Button>
                        </LogoutWrapper>
                        </>
                    )}

                <DrawerFooter>
                    <img src={Icon} alt="Icon" className="h-56" />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export { NavigationDrawer };
