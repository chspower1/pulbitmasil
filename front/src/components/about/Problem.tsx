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
          <NewsBox style={{ width: "400px", height: "130px", backgroundColor: "white" }}>
            <NewsText
              onClick={() => window.open(`${"https://www.mk.co.kr/news/society/view/2022/04/314838/"}`, "_blank")}
            >
              <GreenAccent style={{ color: "#e7772c" }}>[매일경제]</GreenAccent> 홍대거리에 쓰레기 쏟아졌다…거리…
            </NewsText>
            <NewsText
              onClick={() =>
                window.open(
                  `${"https://biz.chosun.com/topics/topics_social/2022/06/05/5ERZWHB4UJHVFFZZXSRR2GDJ54/"}`,
                  "_blank",
                )
              }
            >
              <GreenAccent style={{ color: "#818181" }}>[조선일보]</GreenAccent> ‘환경의 날’에도 한강공원엔 쓰레기 한
              가득…
            </NewsText>
            <NewsText onClick={() => window.open(`${"https://m.mbn.co.kr/news/society/4858837"}`, "_blank")}>
              <GreenAccent style={{ color: "#2179b4" }}>[MBN뉴스]</GreenAccent> 불꽃축제 끝난 한강공원 쓰레기 몸살…
            </NewsText>
          </NewsBox>
        </Row>
        <Row>
          <SubTitle className="end">
            증가하는 버려진 <DangerAccent>쓰레기 문제</DangerAccent>를 <br />
            해결하고 싶다면 <GreenAccent>플로깅</GreenAccent>에 도전해보세요.
          </SubTitle>
        </Row>
      </ContentContainer>
      <ChartContainer>
        <PopulationChart />
      </ChartContainer>
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

const NewsBox = styled(Box)`
  background-color: white;
  width: 400px;
  height: 130px;
  flex-direction: column;
  align-items: baseline;
  padding-left: 10px;
`;

const NewsText = styled(SubTitle)`
  font-size: 17px;
  padding: 7px 0;
  line-height: 21px;
  cursor: pointer;
  transition: color 0.4s ease;
  &:hover {
    color: ${props => props.theme.mainColor};
  }
`;
