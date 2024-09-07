import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@web/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@web/components/ui/carousel";
import "./embla-carousel.css";

const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export function CarouselWithThumbnails() {
  const { setEmblaMainApi, emblaThumbsRef, selectedIndex, onThumbClick } =
    useCarousel();

  return (
    <div className="embla">
      <div className="embla__viewport">
        <div className="embla__container">
          <_Carousel setEmblaMainApi={setEmblaMainApi} />
        </div>
      </div>
      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {SLIDES.map((index) => (
              <Thumbnail
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function _Carousel({
  setEmblaMainApi,
}: {
  setEmblaMainApi: (api: CarouselApi) => void;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
      setApi={setEmblaMainApi}
    >
      <CarouselContent>
        {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
          <CarouselItem key={index} className="embla__slide">
            <Card>
              <CardContent className="flex aspect-video items-center justify-center p-6">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function Thumbnail({
  selected,
  index,
  onClick,
}: {
  selected: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`embla-thumbs__slide ${
        selected ? "embla-thumbs__slide--selected" : ""
      }`}
    >
      <Card>
        <CardContent className="flex aspect-video items-center justify-center p-6">
          <span
            className={`text-3xl font-semibold ${
              selected ? "" : "text-slate-400"
            }`}
          >
            {index + 1}
          </span>
        </CardContent>
      </Card>
    </button>
  );
}

function useCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi>();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
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
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return { setEmblaMainApi, emblaThumbsRef, selectedIndex, onThumbClick };
}
