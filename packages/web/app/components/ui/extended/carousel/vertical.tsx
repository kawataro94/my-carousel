import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@web/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@web/components/ui/carousel";

const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export function VerticalCarousel() {
  const { setEmblaMainApi, emblaThumbsRef, selectedIndex, onThumbClick } =
    useCarousel();

  return (
    <div className="flex h-96 gap-2">
      <div
        className="w-40 overflow-x-hidden overflow-y-scroll box-content p-[0 0.5rem]"
        ref={emblaThumbsRef}
      >
        <div className="flex flex-col gap-3">
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
      <_Carousel setEmblaMainApi={setEmblaMainApi} />
    </div>
  );
}

function _Carousel({
  setEmblaMainApi,
}: {
  setEmblaMainApi: (api: CarouselApi) => void;
}) {
  return (
    <Carousel orientation="vertical" setApi={setEmblaMainApi}>
      <CarouselContent className="h-[26rem]">
        {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-video items-center justify-center p-6 min-h-96">
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
    <button onClick={onClick} type="button">
      <Card>
        <CardContent className="flex aspect-video items-center justify-center p-6 aspect-video w-40">
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
