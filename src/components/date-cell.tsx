import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Calendar1Icon } from "lucide-react";
import { CellContext } from "@tanstack/react-table";
import { TableMeta } from "@/lib/types";

const DateCell = <T extends object>({
  getValue,
  row,
  column,
  table,
}: CellContext<T, unknown>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="w-full h-full">
        <Calendar1Icon />
        {(getValue() as Date)?.toDateString() ?? "NA"}
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={getValue() as Date}
          onSelect={(date) => {
            setIsOpen(false);
            (table.options.meta as TableMeta)?.updateData(
              row.index,
              column.id,
              date
            );
          }}
        ></Calendar>
      </PopoverContent>
    </Popover>
  );
};

export default DateCell;
