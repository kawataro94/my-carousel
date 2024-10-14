import type { ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";
import { SlideDetail } from "@web/components/feature/slide/detail";
import { useSlideFetcher } from "@web/lib/fetch";
import { validateCuid } from "@web/lib/zod";
import { SlideDownloadButton } from "@web/components/feature/slide/download-button";
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
  const slideId = validateCuid(params.slideId);

  return { slideId };
}

export const meta: MetaFunction = () => {
  return [{ title: "Slide List" }];
};

const imageUrl = import.meta.env.VITE_IMAGE_URL;

export default function _SlideDetail() {
  const { slideId } = useLoaderData<typeof clientLoader>();

  const { data: slide, error, isLoading } = useSlideFetcher({ slideId });

  const [slideOrientation, setSlideOrientation] = React.useState("horizontal");

  if (error) {
    return <div>Error</div>;
  }

  if (slide == null || isLoading) {
    return <div>Loading...</div>;
  }

  const slideContents = slide.fileNames.map(
    (fileName) => `${imageUrl}/${slide.name}/${fileName}`
  );

  return (
    <div className="flex flex-col h-dvh">
      <h1 className="font-bold">Slide Detail</h1>
      <Link to="/slides" className="no-underline hover:underline text-blue-600">
        Go to back
      </Link>
      <div className="m-auto max-w-3xl grid gap-4">
        <SlideDetail slide={slide} />

        <div className="flex gap-4 justify-between">
          <Select
            defaultValue="horizontal"
            onValueChange={(v) => setSlideOrientation(v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="horizontal">Horizontal</SelectItem>
              <SelectItem value="vertical">Vertical</SelectItem>
            </SelectContent>
          </Select>

          <SlideDownloadButton slide={slide} />
        </div>

        {slideOrientation === "horizontal" ? (
          <HorizontalCarousel slideContents={slideContents} />
        ) : (
          <VerticalCarousel slideContents={slideContents} />
        )}
      </div>
    </div>
  );
}
