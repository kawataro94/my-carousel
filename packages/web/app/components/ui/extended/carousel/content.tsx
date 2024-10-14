import { CardContent } from "@web/components/ui/card";
export function Image({
  slide,
  selected,
}: {
  slide: string;
  selected: boolean;
}) {
  return (
    <CardContent className="flex aspect-video items-center justify-center p-0">
      <img
        className={`rounded-lg ${selected ? "" : "opacity-25"}`}
        src={slide}
      />
    </CardContent>
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
    <CardContent className="flex aspect-video items-center justify-center p-6">
      <span
        className={`text-3xl font-semibold ${selected ? "" : "text-slate-400"}`}
      >
        {slide + 1}
      </span>
    </CardContent>
  );
}
