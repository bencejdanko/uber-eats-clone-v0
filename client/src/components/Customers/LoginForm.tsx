import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setUser } from "@/features/auth";

import { useLoginCustomerMutation } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const formSchema = z.object({
    email: z.string().min(8).max(50),
    password: z.string().min(8).max(50),
});
function LoginForm() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const user = useAppSelector((state) => state.user);
    const [loginCustomer, { isError, isLoading, isSuccess}] = useLoginCustomerMutation();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        
        const { error, data: user } = await loginCustomer(data);

        if (error) {
            console.error(error);
            return;
        }


        dispatch(setUser(user));
    }

    useEffect(() => {
        if (user.id && isSuccess) {
            navigate("/customers");
        }
    }, [user, isSuccess, navigate]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder="example@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your email that we can contact.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder="Enter your name..." {...field} />
                            </FormControl>
                            <FormDescription>
                                This will be the password for your account.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export { LoginForm };
