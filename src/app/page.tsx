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
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { RowData } from "@tanstack/react-table";
import { Column, TaskData } from "@/lib/types";

//creating our columns
const columns: Column<TaskData>[] = [
  {
    accessorKey: "task", // the accessorKey is the key in our data that we want to display
    header: "Task", // this is what is displayed in the table header it can be a string or a component
    cell: (props) => <p>{props?.getValue()?.toString()}</p>, // this is what is displayed in the table body it can be a string or a component
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <p>{props?.getValue()?.toString()}</p>,
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: (props) => <p>{props?.getValue()?.toString()}</p>,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (props) => <p>{props?.getValue()?.toString()}</p>,
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
      <Table>
        <TableCaption>example table with tanstack table</TableCaption>
        <TableHeader className="text-xl font-bold">
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
            <TableCell>4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
