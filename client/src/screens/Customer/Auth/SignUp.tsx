import { Link } from "react-router-dom";
import { SignUpForm } from "@/components/Customers";

function SignUp() {
    return (
        <div className='p-5 border shadow-lg m-5 mx-auto max-w-md rounded-lg'>
            <a href='/'><div className='mb-2 text-sm'>Return</div></a>
            <h1 className='text-2xl mb-5 font-bold'>Sign Up</h1>
            <SignUpForm />
            <div className='flex justify-end'>
                <Link to='/customers/login'>Log in</Link>
            </div>
        </div>
    );
}

export { SignUp };