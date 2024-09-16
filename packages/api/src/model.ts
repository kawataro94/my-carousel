export type Slide = { id: string; name: string };

const slides = [
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

export function getSlides({
  limit,
  offset,
}: {
  limit: string;
  offset: string;
}) {
  return slides;
}

export function getSlide({ slideId }: { slideId: string }) {
  return slides.find((slide) => slide.id === slideId);
}
export function createSlide({ slide }: { slide: Slide }) {
  return {
    id: "cm0t30v630000lwx7h37jgj0o",
    name: "dog",
  };
}
