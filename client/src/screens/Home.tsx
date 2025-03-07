import { Link } from "react-router-dom";

import { useAppSelector } from "@/app/hooks";

function Home() {

    const user = useAppSelector(state => state.user);

    return (
        <div className='flex flex-col'>
            <h1>Welcome to Delivery Eats</h1>
            <p>
                {user.name ? (
                    <>
                        Welcome, {user.name}. <Link to='/customers'>Go to Dashboard</Link>
                    </>
                ) : (
                    'Please sign up or login'
                )}
            </p>
            <p className='font-bold'>Customers</p>
            <Link to='/customers/signup'>Sign up</Link>
            <Link to='/customers/login'>Login</Link>
            <p className='font-bold'>Restaurants</p>
            <Link to='/restaurants/signup'>Sign up</Link>
            <Link to='/restaurants/login'>Login</Link>
        </div>
    );
}

export { Home };
