import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@web/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@web/components/ui/carousel";
import { Image, Number } from "./content";

export function VerticalCarousel({ slides }: { slides: number[] | string[] }) {
  const { setEmblaMainApi, emblaThumbsRef, selectedIndex, onThumbClick } =
    useCarousel();

  return (
    <div className="flex h-96 gap-2">
      <div
        className="w-40 overflow-x-hidden overflow-y-scroll box-content p-[0 0.5rem]"
        ref={emblaThumbsRef}
      >
        <div className="flex flex-col gap-3">
          {slides.map((slide, index) => (
            <Thumbnail
              key={slide}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              slide={slide}
            />
          ))}
        </div>
      </div>
      <_Carousel setEmblaMainApi={setEmblaMainApi} slides={slides} />
    </div>
  );
}

function _Carousel({
  setEmblaMainApi,
  slides,
}: {
  setEmblaMainApi: (api: CarouselApi) => void;
  slides: number[] | string[];
}) {
  return (
    <Carousel
      orientation="vertical"
      setApi={setEmblaMainApi}
      className="aspect-video"
    >
      <CarouselContent className="h-[26rem]">
        {slides.map((slide) => (
          <CarouselItem key={slide}>
            <Card className="">
              <CardContent className="p-0 flex aspect-video items-center justify-center min-h-96">
                {typeof slide === "string" ? (
                  <Image src={slide} selected={true} />
                ) : (
                  <Number value={slide} selected={true} />
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function Thumbnail({
  slide,
  selected,
  onClick,
}: {
  slide: number | string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} type="button">
      <Card>
        <CardContent className="flex items-center items-center justify-center justify-center p-0 w-40">
          {typeof slide === "string" ? (
            <Image src={slide} selected={selected} />
          ) : (
            <Number value={slide} selected={selected} />
          )}
        </CardContent>
      </Card>
    </button>
  );
}

function useCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi>();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    dragFree: true,
    axis: "y",
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect);
  }, [emblaMainApi, onSelect]);

  return { setEmblaMainApi, emblaThumbsRef, selectedIndex, onThumbClick };
}
