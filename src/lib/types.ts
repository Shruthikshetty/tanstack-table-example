export type Status = { id: number; name: string; color: string } | null;

export interface TaskData {
  task: string;
  status: Status;
  due: Date | null;
  notes: string;
}

export interface Column<T> {
  accessorKey: keyof T;
  header: string;
  cell: (props: { getValue: () => T[keyof T] }) => React.ReactNode;
}
