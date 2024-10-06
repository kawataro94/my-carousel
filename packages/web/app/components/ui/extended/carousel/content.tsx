export function Image({
  slide,
  selected,
}: {
  slide: string;
  selected: boolean;
}) {
  return (
    <img className={`rounded-lg ${selected ? "" : "opacity-25"}`} src={slide} />
  );
}

export function Number({
  slide,
  selected,
}: {
  slide: number;
  selected: boolean;
}) {
  return (
    <span
      className={`p-6 text-3xl font-semibold ${
        selected ? "" : "text-slate-400"
      }`}
    >
      {slide + 1}
    </span>
  );
}
