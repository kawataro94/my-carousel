const SLIDES = [
  {
    id: "cm0t30v630000lwx7h37jgj0o",
    name: "dog",
  },
  {
    id: "cm0t7n3ek0000lwx79yqu4fj7",
    name: "cat",
  },
  {
    id: "cm0t7n96r0000lwx71mbsd94c",
    name: "bird",
  },
];

export type Slide = { id: string; name: string };

export function getSlides({
  limit,
  offset,
}: {
  limit: string;
  offset: string;
}): Slide[] {
  return SLIDES;
}

export function getSlide({ slideId }: { slideId: string }): Slide | undefined {
  return SLIDES.find((slide) => slide.id === slideId);
}

export function createSlide({ slide }: { slide: Omit<Slide, "id"> }): Slide {
  return {
    id: "cm0t30v630000lwx7h37jgj0o",
    name: "dog",
  };
}
