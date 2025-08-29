export interface TaskData {
  task: string;
  status: string | null;
  due: Date | null;
  notes: string;
}

export interface Column<T> {
  accessorKey: keyof T;
  header: string;
  cell: (props: { getValue: () => T[keyof T] }) => React.ReactNode;
}