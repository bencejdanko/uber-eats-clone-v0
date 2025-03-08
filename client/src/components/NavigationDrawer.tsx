import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

function NavigationDrawer({ children }: { children: React.ReactNode }) {
    return (
        <Drawer direction="left">
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className='p-4 flex flex-col gap-4'>
                <a className='w-full' href='customers/signup'><Button className='w-full h-18'>Sign up</Button></a>
                <a className='w-full' href='customers/login'><Button variant="outline" className='w-full h-18'>Log in</Button></a>
                <a href='restaurants/login'>Add your restaurant</a>
            </DrawerContent>
        </Drawer>
    );
}

export { NavigationDrawer };
