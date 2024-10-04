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
import { useEffect, useState } from "react";

const FormSchema = z.object({
  user: z.string({
    required_error: "Please select a user.",
  }),
});

const SelectForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Use useEffect to navigate when the user state is updated
  useEffect(() => {
    console.log(user);

    if (user) {
      navigate("/db", { state: { user } });
      toast({
        title: `Welcome, ${user} ! 🎉`,
      });
    }
  }, [user, navigate, toast]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setUser(data.user);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3  space-y-6 "
      >
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
