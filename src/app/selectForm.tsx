"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  user: z.string({
    required_error: "Please select a user.",
  }),
});
interface FormProps {
  // user: string;
  setUser: (user: string) => void;
}

const SelectForm: React.FC<FormProps> = ({ setUser }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setUser(data.user);
    navigate("/db", { state: { user: data.user } }); // Pass the user in the state
    toast({
      title: `Welcome, ${data.user} ! 🎉`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who are you ?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="I am ..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Moez">Moez</SelectItem>
                  <SelectItem value="Borhen">Borhen</SelectItem>
                  <SelectItem value="Oussema">Oussema</SelectItem>
                  <SelectItem value="Zahra">Zahra</SelectItem>
                  <SelectItem value="Nour">Nour</SelectItem>
                  <SelectItem value="Seif">Seif</SelectItem>
                </SelectContent>
              </Select>
              {/* <FormDescription>
                You can manage email addresses
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SelectForm;
