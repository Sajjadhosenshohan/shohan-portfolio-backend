"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/dashboard/shared/image-upload"; // Ensure this path is correct

// Define the schema for form values
const skillSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  image: z.instanceof(File).nullable().optional(), // Expects a File object or null/undefined
});

export type SkillFormValues = z.infer<typeof skillSchema>;

interface SkillFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: SkillFormValues) => void;
  initialData?: Partial<SkillFormValues & { imageUrl?: string | null }>; // For editing: allow initial image URL
}

const categories = ["Frontend", "Backend", "Database", "Tools", "Other"];

export function SkillForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: SkillFormProps) {
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      image: null, // Image field will hold File object, or null initially.
      // initialData.image is for File objects, initialData.imageUrl for URLs.
    },
  });

  // Reset form when dialog opens/closes or initialData changes (if needed for editing)
  // useEffect(() => {
  //   if (open) {
  //     form.reset({
  //       name: initialData?.name || "",
  //       category: initialData?.category || "",
  //       image: null, // Always reset file input, initial preview handled by ImageUpload's value prop
  //     });
  //   }
  // }, [open, initialData, form]);

  const handleFormSubmit = (values: SkillFormValues) => {
    console.log("Form submitted with values:", values);
    onSubmit(values);
    // form.reset(); // Reset form fields
    // onOpenChange(false); // Close the dialog
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) {
          form.reset(); // Reset form when dialog is closed via 'x' or overlay click
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData?.name ? "Edit Skill" : "Add New Skill"}
          </DialogTitle>
          <DialogDescription>
            {initialData?.name
              ? "Update the details of your skill."
              : "Add a new skill to showcase in your portfolio."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="React" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={(
                { field } // field.value will be File | null
              ) => (
                <FormItem>
                  <FormLabel>Skill Icon</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={initialData?.imageUrl || null} // Pass initial image URL if editing
                      onChange={(file: File) => {
                        field.onChange(file); // Update react-hook-form state with the File object
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  form.reset(); // Also reset if manually cancelled
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {initialData?.name ? "Save Changes" : "Add Skill"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
