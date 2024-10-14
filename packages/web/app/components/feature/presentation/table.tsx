import { Link } from "@remix-run/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@web/components/ui/table";
import { usePresentationsFetcher } from "@web/lib/fetch";

export function PresentationTable() {
  const { data, error, isLoading } = usePresentationsFetcher();

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
          {data.presentations.map((presentation) => (
            <TableRow key={presentation.name}>
              <TableCell className="font-medium">{presentation.id}</TableCell>
              <TableCell>{presentation.name}</TableCell>
              <TableCell>
                <Link
                  to={`/presentations/${presentation.id}`}
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
