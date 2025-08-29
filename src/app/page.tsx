"use client";
import {
  TableBody,
  TableHeader,
  TableRow,
  Table,
  TableHead,
  TableCaption,
  TableCell,
} from "@/components/ui/table";
import DATA from "@/lib/data";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Column, Status, TaskData } from "@/lib/types";

//creating our columns
const columns: Column<TaskData>[] = [
  {
    accessorKey: "task", // the accessorKey is the key in our data that we want to display
    header: "Task", // this is what is displayed in the table header it can be a string or a component
    cell: (props) => props?.getValue()?.toString(), // this is what is displayed in the table body it can be a string or a component
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => (props?.getValue() as Status)?.name,
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: (props) => (props?.getValue() as Date)?.toDateString() ?? "NA",
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (props) => props?.getValue()?.toString() ?? "NA",
  },
];

export default function Home() {
  //get our example data
  const [data, setData] = useState(DATA);
  //hook to create a table  this comes from react tanstack tables
  // this lib only provides helpers they do not come with any styling
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="p-5">
      <p className="my-3">Tanstack Table Example</p>
      <Table width={table.getTotalSize()}>
        <TableCaption>example table with tanstack table</TableCaption>
        <TableHeader className="text-xl font-bold">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.column.columnDef.header as string}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getCoreRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
