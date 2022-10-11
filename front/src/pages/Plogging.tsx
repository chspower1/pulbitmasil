import React from "react";
import TrashBarChart from "@components/chart/TrashBarChart";
import styled from "styled-components";

export default function Plogging() {
  return (
    <Wrap>
      <TrashBarChart />
    </Wrap>
  );
}
const Wrap = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
