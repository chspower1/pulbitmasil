import styled from "styled-components";
import { useGlobalFilter, useTable, useSortBy } from "react-table";
import { useMemo, useState } from "react";
import { IDodream } from "@type/dodream";
import DodreamFilter from "./DodreamFilter";
import { convertTime } from "@components/modal/DodreamDetail";
import { selectedDodreamAtom } from "@atom/dodream";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { Box } from "@style/Layout";

interface Tableprops {
  columns: {
    Header: string;
    accessor: string;
  }[];
  data: IDodream[];
  dodream: IDodream[];
  setDodream: React.Dispatch<React.SetStateAction<IDodream[]>>;
  setSelectedDodream: SetterOrUpdater<IDodream | null>;
}

function Table({ columns, data, setDodream, dodream, setSelectedDodream }: Tableprops) {
  const courseCategory = ["전체", "한강지천길/계절길", "근교산자락길", "서울둘레길", "한양도성길", "생태문화길"];
  const [selecetedCategory, setSelecetedCategory] = useState("전체");
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
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
    let filteredCategory = dodream?.filter(cateory => cateory.course_category_nm === cateoryNames);
    return filteredCategory;
  };

  const handleCategory = (e: React.MouseEvent) => {
    let categoryName = (e.target as HTMLButtonElement).value;
    setSelecetedCategory(categoryName);
    categoryName !== "전체" ? setDodream(filterCategory(categoryName)) : setDodream(dodream);
  };

  return (
    <WholeContainer>
      <FindBox>
        <BtnBox>
          {courseCategory.map((course, index) => (
            <Button
              key={index}
              value={course}
              onClick={handleCategory}
              className={selecetedCategory === course ? "active" : "normal"}
            >
              {course === "한강지천길/계절길" ? "한강지천길" : course}
            </Button>
          ))}
        </BtnBox>
        <DodreamFilter
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
      </FindBox>
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
                    if (cell.column.id === "course_name") {
                      return (
                        <td
                          style={{ color: "#2f8353", cursor: "pointer" }}
                          onClick={() => {
                            const target = dodream.filter(road => road.course_name === (cell.value as string));
                    
                            setSelectedDodream(target[0]);
                          }}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    } else return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableWrapper>
    </WholeContainer>
  );
}

export default function WalkTable({ dodream }: { dodream: IDodream[] }) {
  const [selectedCategory, setSelectedCategory] = useState(dodream);
  const setSelectedDodream = useSetRecoilState(selectedDodreamAtom);
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
        Cell: ({ value }: { value: number }) => convertTime(value),
      },
      {
        Header: "코스레벨",
        accessor: "course_level",
      },
    ],
    [],
  );

  return (
    <Styles>
      <Table
        columns={columns}
        data={selectedCategory}
        setDodream={setSelectedCategory}
        dodream={dodream}
        setSelectedDodream={setSelectedDodream}
      />
    </Styles>
  );
}

const WholeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 870px) {
    width: 100vw;
  }
`;

const TableWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #636e72;
  text-align: center;
  background-color: white;
  padding: 0;
  margin: 0;
  height: 35vh;
  overflow-y: scroll;
  width: 100%;

  @media screen and (max-width: 870px) {
    width: 90%;
  }
  @media screen and (max-width: 610px) {
    font-size: 12px;
  }
`;

const FindBox = styled(Box)`
  margin: 0;

  @media screen and (max-width: 870px) {
    flex-direction: column-reverse;
    width: 95%;
    align-items: center;
  }
`;

const Styles = styled(Box)`
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #636e72;
  text-align: center;

  table {
    border-spacing: 0;
    text-align: center;
    width: 100%;
    margin-top: 0;
    thead {
      position: sticky;
      top: 0px;
      margin: 0 0 0 0;
      background-color: ${props => props.theme.mainColor};
      color: ${props => props.theme.weekBorderColor};
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      :nth-child(odd) {
        background-color: rgba(199, 225, 214, 0.3);
      }
      &:hover {
        background-color: rgba(182, 209, 197, 0.5);
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;

      :first-child {
        width: 150px;
      }
      :nth-child(2) {
        width: 280px;
        transition: all 0.4s ease;
        &:hover {
          font-weight: 800;
          font-size: 16px;
        }
      }
      :nth-child(n + 3) {
        width: 100px;
      }
      :last-child {
        border-right: 0;
      }

      @media screen and (max-width: 870px) {
        :first-child {
          display: none;
        }
        :nth-child(4) {
          width: 70px;
        }
        width: 100%;
      }
      @media screen and (max-width: 610px) {
        :nth-child(6) {
          display: none;
        }
      }
    }
  }
`;
const BtnBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: -20px;

  @media screen and (max-width: 870px) {
    margin-bottom: 0;
    width: 95%;
    justify-content: center;
  }
  @media screen and (max-width: 610px) {
    flex-wrap: wrap;
  }
`;

const Button = styled.button`
  padding: 0.3em 0.1em;
  height: 35px;
  font-weight: 400;
  font-size: 16px;
  width: 100px;
  height: 35px;
  border-right: 1px solid #79b59b;
  border-radius: 5px 5px 0px 0px;
  :last-child {
    margin-right: 40px;
  }
  &.normal {
    background-color: #9bc7b5;
  }
  &.active {
    background-color: #4ea983;
  }
  :hover {
    font-weight: 900;
  }

  @media screen and (max-width: 870px) {
    :last-child {
      margin-right: 0px;
    }
    width: 16.6%;
  }
  @media screen and (max-width: 610px) {
    border: 1px solid #88caae;
    border-radius: 0px;
    width: 33.3%;
  }
`;
