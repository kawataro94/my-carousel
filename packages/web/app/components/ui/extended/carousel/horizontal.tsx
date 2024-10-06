import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card } from "@web/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@web/components/ui/carousel";
import { Image, Number } from "./content";

import "./embla-carousel.css";

export function HorizontalCarousel({
  slideContents,
}: {
  slideContents: number[] | string[];
}) {
  const { setEmblaMainApi, emblaThumbsRef, selectedIndex, onThumbClick } =
    useCarousel();

  return (
    <div className="embla">
      <div className="embla__viewport">
        <div className="embla__container">
          <_Carousel setEmblaMainApi={setEmblaMainApi} slides={slideContents} />
        </div>
      </div>
      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slideContents.map((s, index) => (
              <Thumbnail
                key={s}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                slide={s}
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
  slides,
}: {
  setEmblaMainApi: (api: CarouselApi) => void;
  slides: number[] | string[];
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
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="embla__slide">
            <Card>
              {typeof slide === "string" ? (
                <Image slide={slide} selected={true} />
              ) : (
                <Number slide={slide} selected={true} />
              )}
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function Thumbnail({
  selected,
  slide,
  onClick,
}: {
  selected: boolean;
  slide: number | string;
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
        {typeof slide === "string" ? (
          <Image slide={slide} selected={selected} />
        ) : (
          <Number slide={slide} selected={selected} />
        )}
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
