import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useGetTimingsQuery } from "@/services/api";
import { Restaurant, RestaurantTiming } from "@/types";
import { useEffect } from "react";

const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
] as const;

const timeSchema = z.object({
    open_time: z.string().optional(),
    close_time: z.string().optional(),
    closed: z.boolean().optional(),
});

const formSchema = z.object({
    timings: z.record(z.enum(daysOfWeek), timeSchema),
});

type FormSchema = z.infer<typeof formSchema>;

function TimesForm({ onSubmit, restaurant }: { onSubmit: (data: FormSchema) => void; restaurant: Restaurant }) {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    const { data: timings, error: timingsError, isLoading } = useGetTimingsQuery(restaurant.id);

    useEffect(() => {
        if (timings) {
            form.reset({
                timings: Object.fromEntries(
                    timings.map((timing) => [
                        timing.day_of_week,
                        {
                            open_time: timing.open_time ?? "",
                            close_time: timing.close_time ?? "",
                            closed: timing.closed ?? false,
                        },
                    ])
                ),
            });
        }
    }, [timings]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {daysOfWeek.map((day) => (
                    <div
                        key={day}
                        className={`space-y-4 grid grid-cols-2 items-center border rounded-lg p-4 ${
                            form.watch(`timings.${day}.closed`) ? "opacity-50" : ""
                        }`}
                    >
                        <div className='space-y-4'>
                            <h3 className="text-lg font-medium">{day}</h3>
                            <FormField
                                control={form.control}
                                name={`timings.${day}.closed`}
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormLabel>Closed</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                id={`timings.${day}.closed`}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name={`timings.${day}.open_time`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Opening Time</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`timings.${day}.close_time`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Closing Time</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                ))}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export { TimesForm };
