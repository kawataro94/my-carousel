import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Carousel View" }];
};

export default function CarouselView() {
  return (
    <div>
      <h1 className="font-bold">Carousel View</h1>
      <Link to="/" className="no-underline hover:underline text-blue-600">
        Go to back
      </Link>
    </div>
  );
}
