import React, { useState } from "react";
import { Input } from "./ui/input";
import { CellContext } from "@tanstack/react-table";
import { TableMeta } from "@/lib/types";

const TaskCell = <T extends object>({
  getValue,
  row,
  column,
  table,
}: CellContext<T, unknown>) => {
  const [value, setValue] = useState(getValue() as string);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border-0 shadow-none"
      onBlur={() => {
        (table.options.meta as TableMeta)?.updateData(
          row.index,
          column.id,
          value
        );
      }}
    />
  );
};

export default TaskCell;
