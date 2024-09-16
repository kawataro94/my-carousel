import type { ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";
import { SlideDetail } from "@web/components/feature/slide/detail";
import { validateCuid } from "@web/lib/zod";

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const slideId = validateCuid(params.slideId);

  return { slideId };
}

export const meta: MetaFunction = () => {
  return [{ title: "Slide List" }];
};

export default function _SlideDetail() {
  const { slideId } = useLoaderData<typeof clientLoader>();

  return (
    <div className="flex flex-col h-dvh">
      <h1 className="font-bold">Slide Detail</h1>
      <Link to="/" className="no-underline hover:underline text-blue-600">
        Go to back
      </Link>
      <div className="my-auto">
        <div className="max-w-3xl mx-auto">
          <SlideDetail slideId={slideId} />
        </div>
      </div>
    </div>
  );
}
