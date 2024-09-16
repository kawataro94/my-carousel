import { Link } from "@remix-run/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@web/components/ui/table";
import { useSlides } from "@web/lib/swr";

export function SlideTable() {
  const { data, error, isLoading } = useSlides();

  if (error) {
    return <div>Error</div>;
  }

  if (data == null || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slides.map((slide) => (
            <TableRow key={slide.name}>
              <TableCell className="font-medium">{slide.id}</TableCell>
              <TableCell>{slide.name}</TableCell>
              <TableCell>
                <Link
                  to={`/slides/${slide.id}`}
                  className="no-underline hover:underline text-blue-600"
                >
                  Link
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
