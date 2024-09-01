import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

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
      <div className="flex justify-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
