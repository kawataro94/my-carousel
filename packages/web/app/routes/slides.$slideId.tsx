import type { ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";
import { SlideDetail } from "@web/components/feature/slide/detail";
import { useSlideFetcher } from "@web/lib/fetch";
import { validateCuid } from "@web/lib/zod";
import { SlideDownloadButton } from "@web/components/feature/slide/download-button";
import { HorizontalCarousel } from "@web/components/ui/extended/carousel/horizontal";

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
      <Link to="/" className="no-underline hover:underline text-blue-600">
        Go to back
      </Link>
      <div className="my-auto">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <SlideDetail slide={slide} />

          <HorizontalCarousel slideContents={slideContents} />

          <SlideDownloadButton slide={slide} />
        </div>
      </div>
    </div>
  );
}
