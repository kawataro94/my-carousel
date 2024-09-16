import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { SlideTable } from "@web/components/feature/slide/table";

export const meta: MetaFunction = () => {
  return [{ title: "Slide List" }];
};

export default function SlideList() {
  return (
    <div className="flex flex-col h-dvh">
      <h1 className="font-bold">Slide List</h1>
      <Link to="/" className="no-underline hover:underline text-blue-600">
        Go to back
      </Link>
      <div className="max-w-3xl m-auto">
        <SlideTable />
      </div>
    </div>
  );
}
