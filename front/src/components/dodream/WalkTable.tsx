import styled from "styled-components";
import { useTable } from "react-table";
import { useMemo, useEffect, useState } from "react";
import testDoream from "../../test_data/dodream.json";
const data = {
  course_level: "1",
  course_name: "관악산 자락길(무장애숲길)",
  distance: "1.3km",
  area_gu: "관악구",
  lead_time: "30분",
  course_category_nm: "근교산자락길",
};

const columns = ["area_gu", "course_name", "course_category_nm", "course_level", "distance", "lead_time"];

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
  console.log("----------------------", data);
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

export default function WalkTable({ data }: { data: any }) {
  const columns = useMemo(
    () => [
      {
        Header: "지역",
        accessor: "area_gu",
      },
      {
        Header: "이름",
        accessor: "course_name",
      },
      {
        Header: "유형",
        accessor: "course_category_nm",
      },
      {
        Header: "코스레벨",
        accessor: "course_level",
      },
      {
        Header: "거리",
        accessor: "distance",
      },
      {
        Header: "소요시간",
        accessor: "lead_time",
      },
    ],
    [],
  );
  const [testData, setTestData] = useState([{}]);
  const asdfasdfdasf = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 3, 2, 2].map(i => ({
    course_level: "1",
    course_name: "관악산 자락길(무장애숲길)",
    distance: "1.3km",
    area_gu: "관악구",
    lead_time: "30분",
    course_category_nm: "근교산자락길",
  }));
  useEffect(() => {
    const { data: test111 } = testDoream;
    // test111.map(i => {
    //   console.log(Object.keys(i.course_name));
    // });
    // console.log(test111);

    test111.map((item: any, index) => {
      const nameArr = Object.keys(item.course_name) as any[];
      nameArr.map((name, index) => {
        // console.log(item.course_category_nm, index, name);
        const course_category_nm = item.course_category_nm;
        const course_name = name;
        const distance = item.course_name[name][0].distance;
        const area_gu = item.course_name[name][0].area_gu;
        const lead_time = item.course_name[name][0].lead_time;
        const course_level = item.course_name[name][0].course_level;
        const newItem = { course_category_nm, course_name, distance, area_gu, lead_time, course_level };

        // console.log(course_category_nm, course_name, distance);
        setTestData((prev: any) => {
          return [...prev, newItem];
        });
      });
    });

    // console.log(testData.slice(0, 10));
  }, []);
  // const data : any = useMemo(() => data, []);
  if (!testData) return null;
  return (
    <Styles>
      <Table columns={columns} data={testData} />
    </Styles>
  );
}

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
