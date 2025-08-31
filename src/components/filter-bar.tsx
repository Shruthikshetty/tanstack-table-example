"use client";
import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { ColumnFilter } from "@tanstack/react-table";

const FilterInput = ({
  columnFilters,
  setColumnFilters,
}: {
  columnFilters: ColumnFilter[];
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
}) => {
  //get task name
  const taskName: string =
    (columnFilters.find((filter) => filter.id === "task")?.value as string) ??
    "";
  return (
    <div className="relative max-w-[300px] border-gray-600 border-2 rounded-lg my-5">
      <Input
        className="pl-10"
        placeholder="filter by task"
        value={taskName}
        onChange={(e) =>
          //update the column filter
          setColumnFilters((prev) => [
            ...prev.filter((filter) => filter.id !== "task"),
            { id: "task", value: e.target.value },
          ])
        }
      />
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
    </div>
  );
};

export default FilterInput;
