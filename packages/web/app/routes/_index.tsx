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
            to="/carousel/horizontal"
            className="no-underline hover:underline text-blue-600"
          >
            Horizontal Carousel View
          </Link>
        </li>
        <li>
          <Link
            to="/carousel/vertical"
            className="no-underline hover:underline text-blue-600"
          >
            Vertical Carousel View
          </Link>
        </li>
        <li>
          <Link
            to="/presentations"
            className="no-underline hover:underline text-blue-600"
          >
            Presentation List
          </Link>
        </li>
        <li>
          <Link
            to="/presentations/new"
            className="no-underline hover:underline text-blue-600"
          >
            New Presentation Upload
          </Link>
        </li>
      </ul>
    </div>
  );
}
