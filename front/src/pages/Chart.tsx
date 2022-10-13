import React, { useState } from "react";
import styled from "styled-components";
import { Container, Box } from "../style/Layout";
import { reset } from "styled-reset";
import { DoughnutChart } from "@components/chart/LineChart";
import RoadBarChart from "@components/chart/RoadBarChart";
import TrashBarChart from "@components/chart/TrashBarChart";

export default function Chart() {
  const [isSelect, setIsSelect] = useState(false);

  return (
    <div>
      <ChartContainer>
        <BtnBox>
          <Btn onClick={() => setIsSelect(false)}>서울 자치구별 쓰레기통 현황</Btn>
          <Btn onClick={() => setIsSelect(true)}>서울 자치구별 두드림길 현황</Btn>
        </BtnBox>
        <ChartBox>{isSelect ? <RoadBarChart /> : <TrashBarChart />}</ChartBox>
      </ChartContainer>
    </div>
  );
}

const Btn = styled.button`
  width: 49.5%;
  margin: 0 0.1em;
  box-shadow: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  &:hover {
    background: #094d36;
  }
`;

const ChartContainer = styled(Container)`
  flex-direction: column;
  margin-top: 3em;
`;
const ChartBox = styled(Box)`
  margin-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;
const BtnBox = styled.div`
  display: flex;
  margin: 0;
  justify-content: center;
`;
