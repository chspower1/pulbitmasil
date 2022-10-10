import styled from "styled-components";
import { faker } from "@faker-js/faker";
import { useTable } from "react-table";
import { useMemo } from "react";
faker.locale = "ko";
faker.seed(30);

const columns = ["area_gu", "course_name", "Catrgory", "Level", "Distance", "Time"];

interface Tableprops {
  columns: any;
  data?: any;
}

export function Table({ columns, data }: Tableprops) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
      },
    ],
    [],
  );

  // const data = useMemo(() => data(20), []);
  return <Table columns={columns} />;
}
