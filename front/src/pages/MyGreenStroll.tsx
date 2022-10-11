import styled from "styled-components";
import TrashBarChart from "@components/chart/TrashBarChart";

export default function MyGreenStroll() {
  return (
    <Test>
      <TrashBarChart />
    </Test>
  );
}

const Test = styled.div`
  position: relative;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: hidden;
  background-color: blue;
`;
