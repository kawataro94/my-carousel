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
import { useToast } from "@web/hooks/use-toast";

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

  const { toast } = useToast();

  return (
    <div className="flex flex-col h-dvh">
      <h1 className="font-bold">New Slide Upload</h1>
      <Link to="/" className="no-underline hover:underline text-blue-600">
        Go to back
      </Link>
      <div className="max-w-3xl m-auto w-full">
        <FormProvider {...form}>
          <Form
            action={`${import.meta.env.VITE_API_URL}/slides`}
            headers={{ "Content-Type": "application/json" }}
            className="space-y-8"
            onSubmit={({ data }) => {
              console.log(data);
            }}
            onSuccess={async ({ response }) => {
              const slide = await response.json();

              toast({
                description: (
                  <div>
                    Success:{" "}
                    <Link
                      to={`/slides/${slide.id}`}
                      className="no-underline hover:underline text-blue-600"
                    >
                      {slide.name}
                    </Link>
                  </div>
                ),
              });
            }}
            onError={() => {
              toast({
                variant: "destructive",
                description: "Error",
              });
            }}
          >
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
