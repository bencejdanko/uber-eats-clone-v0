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
import { Textarea } from "@/components/ui/textarea";

import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(255),
    location: z.string().max(255),
    contact_info: z.string().max(255),
});

function ProfileForm(
    { restaurant, onSubmit }: {
        restaurant: Restaurant;
        onSubmit: (data: any) => void;
    },
) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: restaurant.name || "",
            description: restaurant.description || "",
            location: restaurant.location || "",
            contact_info: restaurant.contact_info || "",
        },
    });

    useEffect(() => {
        form.reset({
            name: restaurant.name || "",
            description: restaurant.description || "",
            location: restaurant.location || "",
            contact_info: restaurant.contact_info || "",
        });
    }, [restaurant]);

    const countries = [
        { value: "US", label: "United States" },
        { value: "CA", label: "Canada" },
        { value: "MX", label: "Mexico" },
    ];

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 justify-end flex flex-col"
            >
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
                                This is the display name of your business.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your description..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Describe your restaurants to potential customers.
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
                                <Textarea
                                    placeholder="Enter your location..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This the location of your business.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="contact_info"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Information</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your contact information..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This how customers can contact you.
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

export { ProfileForm };
