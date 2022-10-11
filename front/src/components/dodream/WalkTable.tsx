import styled from "styled-components";
import { useGlobalFilter, useTable, useSortBy } from "react-table";
import { useMemo, useEffect, useState } from "react";
import { IDodream } from "@type/dodream";
import DodreamFilter from "./DodreamFilter";

interface Tableprops {
  columns: {
    Header: string;
    accessor: string;
  }[];
  data: IDodream[];
}

function Table({ columns, data }: Tableprops) {
  const courseCategory = ["전체", "한강지천길/계절길", "근교산자락길", "서울둘레길", "한양도성길", "생태문화길"];
  const [selectedCategory, setSelectedCategory] = useState(data);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
  );

  const filterCategory = (cateoryNames: string) => {
    let filteredCategory = data?.filter(cateory => cateory.course_category_nm === cateoryNames);
    return filteredCategory;
  };

  const handleCategory = (e: React.MouseEvent) => {
    let categoryName = (e.target as HTMLButtonElement).value;
    categoryName !== "전체" ? setSelectedCategory(filterCategory(categoryName)) : setSelectedCategory(data);
  };

  return (
    <WholeWrapper>
      <DodreamFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <BtnBox>
        {courseCategory.map((course, index) => (
          <Button key={index} value={course} onClick={handleCategory}>
            {course}
          </Button>
        ))}
      </BtnBox>
      <TableWrapper>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </th>
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
      </TableWrapper>
    </WholeWrapper>
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

const WholeWrapper = styled.div`
  height: 500px;
  background-color: none;
`;

const TableWrapper = styled.div`
  font-weight: 400;
  font-size: 16px;
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
const BtnBox = styled.div`
  margin-top: 70px;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  margin: 0 7px;
  padding: 0.5em 0.3em;
  width: 140px;
  height: 50px;
  font-weight: 400;
  font-size: 18px;
  border-radius: 5px;
  background-color: #88caae;

  :hover {
    font-weight: 900;
  }
`;
