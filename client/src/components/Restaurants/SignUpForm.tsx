import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useSignupRestaurantMutation } from "@/services/api";

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
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(8).max(50),
    location: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
});

function SignUpForm() {
    // const user = useAppSelector((state) => state.user);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            location: "",
        },
    });

    const [signupRestaurant] = useSignupRestaurantMutation();
    const navigate = useNavigate();
    async function onSubmit(data: z.infer<typeof formSchema>) {
        const { error } = await signupRestaurant(data);

        if (error) {
            console.error(error);
            return;
        }

        navigate("restaurants/login");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your name..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is the public display name of your Restaurant.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="example@example.com"
                                    {...field}
                                />
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
                                <Input
                                    type="password"
                                    placeholder="Enter your name..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This will be the password for your account.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your location..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is the location of your Restaurant.
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

export { SignUpForm };
