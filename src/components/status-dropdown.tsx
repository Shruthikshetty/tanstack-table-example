"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { STATUSES } from "@/lib/data";
import { CellContext } from "@tanstack/react-table";
import { Status, TableMeta } from "@/lib/types";

const StatusDropDown = <T extends object>({
  getValue,
  row,
  column,
  table,
}: CellContext<T, unknown>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${(getValue() as Status)?.color} w-full h-15`}
      >
        {(getValue() as Status)?.name ?? "NA"}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {STATUSES.map((status) => (
            <DropdownMenuItem
              key={status.id}
              className={`${status.color}`}
              onClick={() =>
                (table.options.meta as TableMeta)?.updateData(
                  row.index,
                  column.id,
                  status
                )
              }
            >
              {status.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropDown;
