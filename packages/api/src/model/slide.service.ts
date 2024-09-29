const SLIDES = [
  {
    id: "cm0t30v630000lwx7h37jgj0o",
    name: "dog",
    fileNames: [
      "pexels-photo-1805164-landscape.jpeg",
      "pexels-photo-1851164-landscape.jpeg",
      "pexels-photo-933498-landscape.jpeg",
      "pexels-photo-825947-landscape.jpeg",
      "pexels-photo-2253275-landscape.jpeg",
      "pexels-photo-220938-landscape.jpeg",
      "pexels-photo-58997-landscape.jpeg",
      "pexels-photo-1108099-landscape.jpeg",
    ],
  },
  {
    id: "cm0t7n3ek0000lwx79yqu4fj7",
    name: "cat",
    fileNames: [
      "kitty-cat-kitten-pet-45201-landscape.jpeg",
      "cat-pet-animal-domestic-104827-landscape.jpeg",
      "pexels-photo-416160-landscape.jpeg",
    ],
  },
  {
    id: "cm0t7n96r0000lwx71mbsd94c",
    name: "bird",
    fileNames: [
      "hummingbird-bird-birds-349758-landscape.jpeg",
      "osprey-adler-bird-of-prey-raptor-73825-landscape.jpeg",
      "pexels-photo-1661179-landscape.jpeg",
      "pexels-photo-2317904-landscape.jpeg",
      "pexels-photo-2662434-landscape.jpeg",
      "pexels-photo-326900-landscape.jpeg",
      "pexels-photo-416179-landscape.jpeg",
      "pexels-photo-459198-landscape.jpeg",
      "pexels-photo-70069-landscape.jpeg",
      "pexels-photo-97533-landscape.jpeg",
    ],
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
