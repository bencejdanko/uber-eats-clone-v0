import { z } from "zod";

const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
});

function Login() {
    return <h1>Login Page</h1>;
}

export { Login };
