type TableDataItem = {
  key: string;
  value: string;
};

export interface OptionsTableProps {
  tableHead: TableDataItem;
  tableBody: TableDataItem[];
}
