import React from "react";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { Filter } from "lucide-react";
import { STATUSES } from "@/lib/data";
import { ColumnFilter } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

const FilterDropdown = ({
  columnFilters,
  setColumnFilters,
}: {
  columnFilters: ColumnFilter[];
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
}) => {
  console.log(columnFilters);
  const filterStatus =
    (columnFilters.find((filter) => filter.id === "status")
      ?.value as number[]) || [];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center flex-row px-3  rounded-lg bg-gray-400 gap-4 h-13 hover:opacity-65">
        <Filter />
        <p>Filter by status</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {STATUSES.map((status) => (
            <DropdownMenuItem
              key={status.id}
              className={`${status.color}`}
              onClick={() =>
                setColumnFilters((prev) => {
                  const statuses: unknown | number[] = prev.find(
                    (filter) => filter.id === "status"
                  )?.value;
                  if (!statuses) {
                    return [...prev, { id: "status", value: [status.id] }];
                  }

                  return prev.map((filter) =>
                    filter.id === "status"
                      ? {
                          ...filter,
                          value: filterStatus.includes(status.id)
                            ? (statuses as number[]).filter(
                                (s) => s !== status.id
                              )
                            : [...(statuses as number[]), status.id],
                        }
                      : filter
                  );
                })
              }
            >
              {status.name}
              {filterStatus.includes(status.id) && (
                <span className="ml-2">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
