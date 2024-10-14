import { CardContent } from "@web/components/ui/card";
export function Image({ src, selected }: { src: string; selected: boolean }) {
  return (
    <CardContent className="flex aspect-video items-center justify-center p-0">
      <img className={`rounded-lg ${selected ? "" : "opacity-25"}`} src={src} />
    </CardContent>
  );
}

export function Number({
  value,
  selected,
}: {
  value: number;
  selected: boolean;
}) {
  return (
    <CardContent className="flex aspect-video items-center justify-center p-6">
      <span
        className={`text-3xl font-semibold ${selected ? "" : "text-slate-400"}`}
      >
        {value + 1}
      </span>
    </CardContent>
  );
}
