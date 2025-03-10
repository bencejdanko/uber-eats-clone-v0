import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { z } from "zod";
import { useGetDishesQuery } from "@/services/api";
import { Dish, Restaurant } from "@/types";
import { useEffect, useRef, useState } from "react";

import { Mountain } from "lucide-react";

import { useGetRestaurantImagesQuery } from "@/services/api";

// Define a Zod schema for an individual dish
const dishSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  description: z.string().optional(),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be non-negative"),
  category: z.string().min(1, "Category is required"),
  image: z.string().optional(),
});

// The form schema consists of an array of dishes
const formSchema = z.object({
  dishes: z.array(dishSchema),
});

type FormSchema = z.infer<typeof formSchema>;

// Assume this interface is defined somewhere in your codebase.
export interface RestaurantImage {
  id: string;
  restaurant_id: string;
  image_url: string;
}

function DishesForm({
  onSubmit,
  restaurant,
}: {
  onSubmit: (data: FormSchema) => void;
  restaurant: Restaurant;
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { dishes: [] },
  });

  const { data: images } = useGetRestaurantImagesQuery(restaurant.id);

  // Manage dynamic dish fields with useFieldArray
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dishes",
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // New state for image selection overlay
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [activeDishIndex, setActiveDishIndex] = useState<number | null>(null);

  // Load existing dishes with the restaurant.id prop
  const { data: dishes } = useGetDishesQuery(restaurant.id);

  // Keep track of initial values to determine unsaved changes
  const initialValuesRef = useRef<FormSchema | null>(null);

  useEffect(() => {
    setUnsavedChanges(false);
    if (dishes) {
      const initialValues = {
        dishes: dishes.map((dish: Dish) => ({
          name: dish.name,
          ingredients: dish.ingredients,
          description: dish.description ?? "",
          price: Number(dish.price),
          category: dish.category,
          image: dish.image ?? "",
        })),
      };
      initialValuesRef.current = initialValues;
      form.reset(initialValues);

      const subscription = form.watch((value) => {
        setUnsavedChanges(
          JSON.stringify(value) !== JSON.stringify(initialValues)
        );
      });
      return () => subscription.unsubscribe();
    }
  }, [dishes, form]);

  // Reset form to initial loaded values
  function handleCancel() {
    if (!initialValuesRef.current) return;
    form.reset(initialValuesRef.current);
    setUnsavedChanges(false);
  }

  // Append a new, empty dish to the array
  function handleAddDish() {
    append({
      name: "",
      ingredients: "",
      description: "",
      price: 0,
      category: "",
      image: "",
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Dish {index + 1}</h3>
              <FormField
                control={form.control}
                name={`dishes.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dish Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`dishes.${index}.ingredients`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingredients</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingredients" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`dishes.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`dishes.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : 0
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`dishes.${index}.category`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Image field with selection overlay */}
              <FormField
                control={form.control}
                name={`dishes.${index}.image`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <div className="flex items-center space-x-4">
                      {field.value ? (
                        <img
                          src={field.value}
                          alt="Selected dish"
                          className="h-16 w-16 object-cover rounded-md"
                        />
                      ) : (
                        <div className="h-16 w-16 bg-gray-200 flex items-center justify-center rounded-md text-gray-500">
                            <Mountain size={32} />
                        </div>
                      )}
                      <Button
                        type="button"
                        onClick={() => {
                          setActiveDishIndex(index);
                          setImageModalOpen(true);
                        }}
                      >
                        Select Image
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button variant="destructive" onClick={() => remove(index)}>
                  Remove Dish
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <Button type="button" onClick={handleAddDish}>
              Add Dish
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
      {unsavedChanges && (
        <div className="flex justify-end gap-2 items-center text-sm">
          <p className="text-red-500">You have unsaved changes</p>
          <div className="cursor-pointer" onClick={handleCancel}>
            Cancel
          </div>
        </div>
      )}
      {/* Image selection overlay */}
      {imageModalOpen && (
        <div className="fixed inset-0 bg-gray-200/80 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Select an Image</h2>
              <Button
                variant="destructive"
                onClick={() => {
                  setImageModalOpen(false);
                  setActiveDishIndex(null);
                }}
              >
                Close
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images &&
                images.map((img: RestaurantImage) => (
                  <img
                    key={img.id}
                    src={img.image_url}
                    alt="Restaurant"
                    className="cursor-pointer h-24 w-24 object-cover rounded-md"
                    onClick={() => {
                      if (activeDishIndex !== null) {
                        form.setValue(
                          `dishes.${activeDishIndex}.image`,
                          img.image_url
                        );
                      }
                      setImageModalOpen(false);
                      setActiveDishIndex(null);
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { DishesForm };
