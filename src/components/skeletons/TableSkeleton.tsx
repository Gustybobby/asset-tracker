import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function TableSkeleton({
  colNums,
  rowNums,
}: {
  colNums: number;
  rowNums: number;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {rangeArray(colNums).map((col) => (
            <TableHead key={col} className="bg-muted hover:bg-muted">
              <div className="h-6 animate-pulse rounded-lg bg-gray-300" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rangeArray(rowNums).map((row) => (
          <TableRow key={row}>
            {rangeArray(colNums).map((col) => (
              <TableCell key={`loader.${row}.${col}`}>
                <div className="h-6 animate-pulse rounded-lg bg-gray-200" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function rangeArray(nums: number): number[] {
  return new Array(nums).fill(0).map((_, idx) => idx);
}
