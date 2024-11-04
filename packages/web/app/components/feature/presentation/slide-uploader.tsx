import { Button } from "@web/components/ui/button";
import { FormControl, FormField, FormItem } from "@web/components/ui/form";
import { Input } from "@web/components/ui/input";
import { toast } from "@web/hooks/use-toast";
import { uploadSlides } from "@web/lib/fetch";
import { Form, FormProvider, useForm } from "react-hook-form";

export function SlideUploader({
  presentation,
}: {
  presentation: {
    id: string;
  };
}) {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <Form
        className="flex gap-4"
        onSubmit={async ({ data }) => {
          const formData = new FormData();
          for (const file of data.files) {
            formData.append("slides", file);
          }

          try {
            await uploadSlides({ presentationId: presentation.id, formData });

            toast({
              description: "Success",
            });
          } catch (error) {
            toast({
              variant: "destructive",
              description: "Error",
            });
          }
        }}
      >
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button>アップロード</Button>
      </Form>
    </FormProvider>
  );
}
