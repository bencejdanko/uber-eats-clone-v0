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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import { setCustomer } from "@/features/auth";

import { useUpdateUserMutation } from "@/services/api";
import { Customer } from "@/types";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    country: z.string().min(2).max(50).optional(),
    state: z.string().min(2).max(50).optional(),
});

function ProfileForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [updateUser, { isLoading, isError, isSuccess, error }] = useUpdateUserMutation();

    const user = useAppSelector((state) => state.customer);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name || "",
            country: user.country || "",
            state: user.state || "",
        },
    });

    const countries = [
        { value: "US", label: "United States" },
        { value: "CA", label: "Canada" },
        { value: "MX", label: "Mexico" },
    ];

    async function onSubmit(data: z.infer<typeof formSchema>) {

        const updatedData: Customer = { ...data, id: user.id, email: user.email };

        const { error } = await updateUser(updatedData);

        if (error) {
            console.error(error);
            return;
        }

        dispatch(setCustomer(updatedData));
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 justify-end flex flex-col">
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
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Select 
                                onValueChange={field.onChange}
                                
                                {...field}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a country..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup >
                                            {countries.map((country) => (
                                                <SelectItem key={country.value} value={country.value}>
                                                    <SelectLabel>{country.label}</SelectLabel>
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                This is your country.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your state..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your state.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
                {isError && <p className="text-red-500">Error: {"An error occurred"}</p>}
                {isSuccess && <p className="text-green-500">Profile updated successfully!</p>}
            </form>
        </Form>
    );
}

export { ProfileForm };
