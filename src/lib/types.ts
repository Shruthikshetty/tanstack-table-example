export type Status = { id: number; name: string; color: string } | null;
//TData
export type TData = {
  task: string;
  status: Status | null;
  due: Date | null;
  notes: string;
};

export type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
};
