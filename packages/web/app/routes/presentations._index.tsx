import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { PresentationTable } from "@web/components/feature/presentation/table";

export const meta: MetaFunction = () => {
  return [{ title: "Presentation List" }];
};

export default function PresentationList() {
  return (
    <div className="flex flex-col h-dvh">
      <h1 className="font-bold">Presentation List</h1>
      <Link to="/" className="no-underline hover:underline text-blue-600">
        Go to back
      </Link>
      <div className="max-w-3xl m-auto">
        <PresentationTable />
      </div>
    </div>
  );
}
