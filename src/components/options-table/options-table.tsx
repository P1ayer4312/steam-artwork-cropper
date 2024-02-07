import { OptionsTableProps } from "./types/options-table";
import "./options-table.css";

export default function OptionsTable(props: OptionsTableProps) {
  if (props.tableBody && props.tableBody) {
    return (
      <table className="options-table">
        <thead className="options-table-head">
          <tr>
            <th className="options-table-head-key">{props.tableHead.key}</th>
            <th className="options-table-head-value">
              {props.tableHead.value}
            </th>
          </tr>
          <tr>
            <td colSpan={2} className="options-table-line"></td>
          </tr>
        </thead>
        <tbody className="options-table-body">
          {props.tableBody.map((el, index) => (
            <tr key={index}>
              <td>{el.key}</td>
              <td>{el.value}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="options-table-line"></td>
          </tr>
        </tfoot>
      </table>
    );
  }

  return null;
}
