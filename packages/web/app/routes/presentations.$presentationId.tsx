import type { ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";
import { PresentationDetail } from "@web/components/feature/presentation/detail";
import { usePresentationFetcher } from "@web/lib/fetch";
import { validateCuid } from "@web/lib/zod";
import { PresentationDownloadButton } from "@web/components/feature/presentation/download-button";
import { HorizontalCarousel } from "@web/components/ui/extended/carousel/horizontal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@web/components/ui/select";
import React from "react";
import { VerticalCarousel } from "@web/components/ui/extended/carousel/vertical";

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const presentationId = validateCuid(params.presentationId);

  return { presentationId };
}

export const meta: MetaFunction = () => {
  return [{ title: "Presentation List" }];
};

const imageUrl = import.meta.env.VITE_IMAGE_URL;

export default function _PresentationDetail() {
  const { presentationId } = useLoaderData<typeof clientLoader>();

  const {
    data: presentation,
    error,
    isLoading,
  } = usePresentationFetcher({ presentationId });

  const [orientation, setOrientation] = React.useState("horizontal");

  if (error) {
    return <div>Error</div>;
  }

  if (presentation == null || isLoading) {
    return <div>Loading...</div>;
  }

  const slides = presentation.fileNames.map(
    (fileName) => `${imageUrl}/${presentation.name}/${fileName}`
  );

  const hasSlides = slides.length > 0;

  return (
    <div className="flex flex-col h-dvh">
      <h1 className="font-bold">Presentation Detail</h1>
      <Link
        to="/presentations"
        className="no-underline hover:underline text-blue-600"
      >
        Go to back
      </Link>
      <div className="m-auto max-w-3xl w-4/5 grid gap-4">
        <PresentationDetail presentation={presentation} />

        {!hasSlides ? null : (
          <>
            <div className="flex justify-between">
              <Select
                defaultValue="horizontal"
                onValueChange={(v) => setOrientation(v)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                  <SelectItem value="vertical">Vertical</SelectItem>
                </SelectContent>
              </Select>

              <PresentationDownloadButton presentation={presentation} />
            </div>

            {orientation === "horizontal" ? (
              <HorizontalCarousel slides={slides} />
            ) : (
              <VerticalCarousel slides={slides} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
