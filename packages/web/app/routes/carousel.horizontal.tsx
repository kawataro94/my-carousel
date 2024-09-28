import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { HorizontalCarousel } from "@web/components/ui/extended/carousel/horizontal";

export const meta: MetaFunction = () => {
  return [{ title: "Horizontal Carousel View" }];
};

export default function HorizontalCarouselView() {
  return (
    <div className="flex flex-col h-dvh">
      <h1 className="font-bold">Horizontal Carousel View</h1>
      <Link to="/" className="no-underline hover:underline text-blue-600">
        Go to back
      </Link>
      <div className="max-w-3xl m-auto">
        <HorizontalCarousel />
      </div>
    </div>
  );
}
