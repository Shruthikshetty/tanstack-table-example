import { Table, Column as ColumnType, Row } from "@tanstack/react-table";

export type Status = { id: number; name: string; color: string } | null;

export interface TaskData {
  task: string;
  status: Status;
  due: Date | null;
  notes: string;
}

export type CellProps<T> = {
  getValue: () => T[keyof T];
  row: Row<T>;
  column: ColumnType<T, T[keyof T]>;
  table: Table<T>;
};

export type Cell<T> = (props: CellProps<T>) => React.ReactNode;

export interface Column<T> {
  accessorKey: keyof T;
  header: string;
  cell: Cell<T>;
}
