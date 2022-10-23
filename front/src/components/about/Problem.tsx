import { PopulationChart } from "../chart/Population";
import { PopulationMobileChart } from "../chart/PopulationMobile";
import styled from "styled-components";
import {
  AboutContent,
  Title as TitleGuide,
  SubTitle as SubTitleGuide,
  GreenAccent,
  Desc,
  Box,
  Row as RowGuide,
  DangerAccent,
} from "@style/Layout";

export default function Problem() {
  return (
    <Wrap>
      <ContentContainer>
        <Row>
          <Title>유동인구증가와 쓰레기</Title>
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
          <NewsBox>
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
      <ChartMobileContainer>
        <PopulationMobileChart />
      </ChartMobileContainer>
    </Wrap>
  );
}
const Wrap = styled(AboutContent)`
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
  }
`;
const ContentContainer = styled(Box)`
  height: 400px;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    width: 100%;
    align-items: center;
  }
`;
const Row = styled(RowGuide)`
  justify-content: flex-start;
  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
`;
const Title = styled(TitleGuide)`
  margin-bottom: 15px;
`;
const SubTitle = styled(SubTitleGuide)`
  font-family: "Sebang";
  line-height: 1.3;
  margin-bottom: 10px;
  color: ${props => props.theme.textColor};
  &.end {
    font-size: 22px;
  }
`;

const ChartContainer = styled(Box)`
  width: 550px;
  height: 400px;
  @media screen and (max-width: 1024px) {
    width: 100%;
    align-items: center;
  }
  @media screen and (max-width: 420px) {
    display: none;
  }
`;
const ChartMobileContainer = styled(Box)`
  width: 100%;
  height: 400px;

  @media screen and (min-width: 420px) {
    display: none;
  }
`;
const NewsBox = styled(Box)`
  background-color: rgba(255, 255, 255, 0.5);
  width: 400px;
  height: 130px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 10px;
  margin: 15px 0px;
  border-radius: 10px;
  @media screen and (max-width: 758px) {
    max-width: 400px;
    width: 95%;
  }
`;
const NewsText = styled(SubTitle)`
  font-size: 17px;
  margin: 0px;
  padding: 7px 0;
  line-height: 21px;
  cursor: pointer;
  transition: color 0.4s ease;
  &:hover {
    color: ${props => props.theme.mainColor};
  }
  @media screen and (max-width: 758px) {
    font-size: 16px;
  }
`;
