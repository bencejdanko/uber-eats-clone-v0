import { LogoutWrapper } from "@/components/Customers/LogoutWrapper";

function Home() {
    return (
        <div>
            <h1>Dashboard</h1>
            <LogoutWrapper className='bg-red-500 text-white'>Logout</LogoutWrapper>
        </div>
    );
}

export { Home };