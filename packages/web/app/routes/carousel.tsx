import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { CarouselWithThumbnails } from "@web/components/ui/extended/carousel/carousel-with-thumbnails";

export const meta: MetaFunction = () => {
  return [{ title: "Carousel View" }];
};

export default function CarouselView() {
  return (
    <div className="flex flex-col h-dvh">
      <h1 className="font-bold">Carousel View</h1>
      <Link to="/" className="no-underline hover:underline text-blue-600">
        Go to back
      </Link>
      <div className="max-w-3xl m-auto">
        <CarouselWithThumbnails />
      </div>
    </div>
  );
}
