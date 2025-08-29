import React, { useState } from "react";
import { Input } from "./input";
import { CellProps } from "@/lib/types";

const TaskCell = <T extends object>({ getValue , row , column , table }: CellProps<T>) => {
  const [value, setValue] = useState(getValue() as string);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border-0 shadow-none"
      onBlur={() => {
        table.options.meta?.updateData(row.index, column.id, value);
      }}
    />
  );
};

export default TaskCell;
