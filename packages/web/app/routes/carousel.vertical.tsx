import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { VerticalCarousel } from "@web/components/ui/extended/carousel/vertical";

export const meta: MetaFunction = () => {
  return [{ title: "Vertical Carousel View" }];
};

export default function VerticalCarouselView() {
  return (
    <div className="flex flex-col h-dvh">
      <h1 className="font-bold">Vertical Carousel View</h1>
      <Link to="/" className="no-underline hover:underline text-blue-600">
        Go to back
      </Link>
      <div className="m-auto">
        <VerticalCarousel slides={Array.from(Array(10).keys())} />
      </div>
    </div>
  );
}
