export type Slide = { id: string; name: string };

export function getSlides({
  limit,
  offset,
}: {
  limit: string;
  offset: string;
}) {
  return [
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
}

export function getSlide({ id }: { id: string }) {
  return {
    id: "cm0t30v630000lwx7h37jgj0o",
    name: "dog",
  };
}
export function createSlide({ slide }: { slide: Slide }) {
  return {
    id: "cm0t7o4n80000lwx79m8wczfy",
    name: "python",
  };
}
