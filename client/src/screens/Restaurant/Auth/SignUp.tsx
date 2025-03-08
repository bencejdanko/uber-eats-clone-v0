import { Link } from "react-router-dom";
import { SignUpForm } from "@/components/Restaurants";

function SignUp() {
    return (
        <div className='p-5 border shadow-lg m-5 mx-auto max-w-md rounded-lg'>
            <Link to='/'><div className='mb-2 text-sm'>Return</div></Link>
            <h1 className='text-2xl mb-5 font-bold'>Sign Up</h1>
            <SignUpForm />
            <div className='flex justify-end'>
                <Link to='/restaurants/login'>Log in</Link>
            </div>
        </div>
    );
}

export { SignUp };