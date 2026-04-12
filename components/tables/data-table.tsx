"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";

interface Props<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onRowClick?: (row: Row<T>) => void;
}

export default function DataTable<T>({
  columns,
  data,
  onRowClick,
}: Props<T>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-surface-low rounded-sm overflow-hidden border border-border/5">
      <table className="w-full text-left border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-surface-high/50 border-b border-border/5">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-border/5">
          {table.getRowModel().rows.map((row) => (
            <tr 
              key={row.id} 
              className={`transition-colors group ${onRowClick ? 'cursor-pointer hover:bg-surface-high' : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}