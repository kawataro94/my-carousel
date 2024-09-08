"use client";

import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@web/components/ui/button";
import {
  FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@web/components/ui/form";
import { Input } from "@web/components/ui/input";

export const meta: MetaFunction = () => {
  return [{ title: "New Slide Upload" }];
};

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export default function NewSlideUpload() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <div className="flex flex-col h-dvh">
      <h1 className="font-bold">New Slide Upload</h1>
      <Link to="/" className="no-underline hover:underline text-blue-600">
        Go to back
      </Link>
      <div className="max-w-3xl m-auto w-full">
        <FormProvider {...form}>
          <Form className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slide Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="float-right">
              Submit
            </Button>
          </Form>
        </FormProvider>
      </div>
    </div>
  );
}
