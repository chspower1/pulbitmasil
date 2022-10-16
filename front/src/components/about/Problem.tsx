import { PopulationChart } from "../chart/Population";
import {
  AboutContent,
  Container,
  Title,
  SubTitle as SubTitleGuide,
  GreenAccent,
  Desc,
  Box,
  Row,
  DangerAccent,
} from "@style/Layout";
import React from "react";
import styled from "styled-components";

export default function Problem() {
  return (
    <Wrap>
      <ContentContainer>
        <Row>
          <Title>유동인구증가와 증가</Title>
        </Row>
        <Row>
          <SubTitle>
            길거리를 지나다가 <DangerAccent>버려진 쓰레기</DangerAccent>를 <br />본 적이 있으신가요?
          </SubTitle>
        </Row>
        <Row>
          <Desc style={{ lineHeight: 1.3 }}>
            그 전보다 쓰레기를 자주 보인다면 그건 위드 코로나로 <br />
            수반된 유동 인구 폭발적 증가 때문일 것입니다.
          </Desc>
        </Row>
        <Row>
          <div style={{ width: "400px", height: "130px", backgroundColor: "red" }}></div>
        </Row>
        <Row>
          <SubTitle className="end">
            증가하는 버려진 <DangerAccent>쓰레기 문제</DangerAccent>를 <br />
            해결하고 싶다면 <GreenAccent>플로깅</GreenAccent>에 도전해보세요.
          </SubTitle>
        </Row>
      </ContentContainer>
      <ChartContainer><PopulationChart/></ChartContainer>
    </Wrap>
  );
}
const Wrap = styled(AboutContent)`
  align-items: center;
  justify-content: space-between;
`;
const ContentContainer = styled(Container)`
  height: 400px;
  flex-direction: column;
  justify-content: space-between;
`;
const SubTitle = styled(SubTitleGuide)`
  font-family: "Sebang";
  font-size: 24px;
  line-height: 1.3;
  color: ${props => props.theme.textColor};
  &.end {
    font-size: 22px;
  }
`;

const ChartContainer = styled(Container)`
  width: 550px;
  height: 400px;
`;
