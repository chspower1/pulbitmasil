import styled from "styled-components";
import { useTable } from "react-table";
import { useMemo, useEffect, useState } from "react";
import { IDodream } from "@type/dodream";

interface Tableprops {
  columns: any;
  data: any;
}

function Table({ columns, data }: Tableprops) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    // @ts-ignore
    columns,
    data,
  });

  return (
    <TableWrapper>
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
              <tr {...row.getRowProps()} >
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableWrapper>
  );
}

export default function WalkTable({ dodream }: { dodream: IDodream[] }) {
  const columns = useMemo(
    () => [
      {
        Header: "유형",
        accessor: "course_category_nm",
      },
      {
        Header: "이름",
        accessor: "course_name",
      },
      {
        Header: "지역",
        accessor: "area_gu",
      },
      {
        Header: "거리",
        accessor: "distance",
      },
      {
        Header: "소요시간",
        accessor: "lead_time",
      },
      {
        Header: "코스레벨",
        accessor: "course_level",
      },
    ],
    [],
  );

  if (!dodream) return null;
  return (
    <Styles>
      <Table columns={columns} data={dodream} />
    </Styles>
  );
}

const TableWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #636e72;
  text-align: center;
  background-color: white;
  padding: 0;
  height: 400px;
  overflow-y: scroll;
`;

const Styles = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #636e72;
  text-align: center;
  background-color: white;

  table {
    border-spacing: 0;
    text-align: center;
    width: 100%;
    thead {
      position: sticky;
      top: 0px;
      margin: 0 0 0 0;
      background-color: #c7e1d6;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      :hover {
        background-color: rgba(217, 217, 217, 0.5);
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
