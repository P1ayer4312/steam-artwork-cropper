type TableDataItem = {
  key: string | undefined;
  value: string | undefined;
};

export interface OptionsTableProps {
  tableHead: TableDataItem;
  tableBody: TableDataItem[];
}
