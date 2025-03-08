import { LoginForm } from "@/components/Restaurants";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className='p-5 border shadow-lg m-5 mx-auto max-w-md rounded-lg'>
            <Link to='/'><div className='mb-2 text-sm'>Return</div></Link>
            <h1 className='text-2xl mb-5 font-bold'>Login</h1>
            <LoginForm />
            <div className='flex justify-end'>
                <Link to='/restaurants/signup'>Sign up</Link>
            </div>
        </div>
    );
}

export { Login };