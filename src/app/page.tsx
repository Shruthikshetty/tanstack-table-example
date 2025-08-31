"use client";
import {
  TableBody,
  TableHeader,
  TableRow,
  Table,
  TableHead,
  TableCaption,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import DATA from "@/lib/data";
import {
  ColumnDef,
  ColumnFilter,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { cn } from "@/lib/utils";
import EditableCell from "@/components/editable-cell";
import { Status, TData } from "@/lib/types";
import StatusDropDown from "@/components/status-dropdown";
import DateCell from "@/components/date-cell";
import FilterInput from "@/components/filter-bar";
import FilterDropdown from "@/components/filter-dropdown";
import { ArrowUpDown, MoveDown, MoveUp } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

//creating our columns
const columns: ColumnDef<TData, string | Status | Date | null>[] = [
  {
    accessorKey: "task", // the accessorKey is the key in our data that we want to display
    header: "Task", // this is what is displayed in the table header it can be a string or a component
    cell: (props) => <EditableCell<TData> {...props} />,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <StatusDropDown {...props} />,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatus) => {
      if (filterStatus.length === 0) return true;
      const status: Status = row.getValue(columnId);
      return filterStatus.includes(status?.id);
    },
    enableSorting: false,
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: (props) => <DateCell {...props} />,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (props) => <EditableCell<TData> {...props} />,
  },
];

export default function Home() {
  //get our example data
  const [data, setData] = useState<TData[]>(DATA);
  //sorting state
  const [sorting, setSorting] = useState<SortingState>([]);
  //filter for column
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([
    {
      id: "task", // we want to filter by task
      value: "",
    },
  ]);
  //hook to create a table  this comes from react tanstack tables
  // this lib only provides helpers they do not come with any styling
  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange", // allows resize
    meta: {
      //update the table data
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) => {
          return old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                [columnId]: value,
              };
            }
            return row;
          });
        });
      },
    },
  });

  return (
    <div className="p-5 overflow-x-auto">
      <p className="my-3">Tanstack Table Example</p>
      <div className="flex flex-row gap-5 justify-start items-center">
        <FilterInput
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <FilterDropdown
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
      <Table className={`border border-collapse min-w-full table-fixed`}>
        <TableHeader className="text-xl font-bold">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  style={{ width: `${header.getSize()}px` }}
                  key={header.id}
                  className={`border border-gray-400 relative`}
                >
                  <div className="flex flex-row items-center gap-3">
                    {header.column.columnDef.header as string}
                    {header.column.getCanResize() && (
                      <div
                        className={cn(
                          "hover:border-r-blue-600 hover:border-r-4 border-2 absolute z-10 right-0 h-full top-0 cursor-col-resize",
                          header.column.getIsResizing() && "border-green-600"
                        )}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        style={{ userSelect: "none" }}
                      />
                    )}
                    {header.column.getCanSort() && (
                      <button
                        className="hover:text-blue-600"
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <ArrowUpDown />
                      </button>
                    )}
                    {header.column.getIsSorted() &&
                      (header.column.getIsSorted() === "asc" ? (
                        <MoveUp />
                      ) : (
                        <MoveDown />
                      ))}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  style={{ width: `${cell.column.getSize()}px` }}
                  key={cell.id}
                  className={cn(
                    `border border-gray-400 whitespace-normal`,
                    cell.column.columnDef.header === "Status" &&
                      "pt-0 pl-0 pb-0 pr-0 "
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {table.getPageCount() > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationPrevious onClick={() => table.previousPage()}>
              Previous
            </PaginationPrevious>

            {Array.from({ length: table.getPageCount() }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  aria-label={`Go to page ${i + 1}`}
                  className={cn(
                    "px-2.5 py-1.5 ring-offset-background",
                    table.getState().pagination.pageIndex === i
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => table.setPageIndex(i)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationNext onClick={() => table.nextPage()}>
              Next
            </PaginationNext>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
