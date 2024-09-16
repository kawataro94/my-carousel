import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "My Carousel" }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="font-bold">Menu</h1>
      <ul>
        <li>
          <Link
            to="/carousel"
            className="no-underline hover:underline text-blue-600"
          >
            Carousel View
          </Link>
        </li>
        <li>
          <Link
            to="/slides"
            className="no-underline hover:underline text-blue-600"
          >
            Slide List
          </Link>
        </li>
        <li>
          <Link
            to="/slides/new"
            className="no-underline hover:underline text-blue-600"
          >
            New Slide Upload
          </Link>
        </li>
      </ul>
    </div>
  );
}
