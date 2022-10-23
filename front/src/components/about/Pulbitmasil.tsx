import { AboutContent, Box, Container, Title, SubTitle, Desc, GreenAccent } from "@style/Layout";
import styled from "styled-components";

export default function Pulbitmasil() {
  return (
    <PulbitmasilContent>
      <LeftContainer>
        <NameBox>
          <GreenCircleImg>
            <GreenName>풀빛</GreenName>
            <GreenDesc>
              풀의 빛깔과 같은
              <br />
              진한 연둣빛
            </GreenDesc>
          </GreenCircleImg>
          <PlusImg src={"assets/icon/+.svg"} />
          <WalkCircleImg>
            <WalkName>마실</WalkName>
            <WalkDesc>이웃에 놀러 나가는 일</WalkDesc>
          </WalkCircleImg>
        </NameBox>
        <MeaningText>
          마실 나가듯 즐겁고 가볍게 플로깅을
          <br />
          실천하며 지구의 풀빛색을 지키자
        </MeaningText>
      </LeftContainer>
      <RightContainer>
        <TitleBox>
          <PulbitmasilTitle>풀빛마실이란</PulbitmasilTitle>
        </TitleBox>
        <PulbitmasilSubTitle>플로깅 이란 단어를 들어보셨나요?</PulbitmasilSubTitle>
        <PulbitmasilDesc>
          <DescBox>
            플로깅이란 이삭줍기를 의미하는 스웨덴어 플로카 웁(plocka upp)과 영어 조깅(jogging)의 합성어로
            <GreenAccent> 달리기를 하면서 쓰레기를 줍는 운동</GreenAccent>을 말합니다.
          </DescBox>
          <DescBox>
            {`저희 팀은 단순히 조깅뿐만 아니라 더 넓은 차원에서
            가벼운 마음으로 이웃과 친목을 도모하며 마실 나가듯이 가볍게
            실천해보자는 뜻에서 풀빛마실을 만들게 되었습니다.`}
          </DescBox>
        </PulbitmasilDesc>
      </RightContainer>
    </PulbitmasilContent>
  );
}

const PulbitmasilContent = styled(AboutContent)`
  display: flex;

  @media screen and (max-width: 1124px) {
    flex-direction: column;
    width: 100%;
  }
`;
const PlusImg = styled.img`
  @media screen and (max-width: 1124px) {
    flex-direction: column;
  }
`;
const LeftContainer = styled(Container)`
  flex-direction: column;
  width: 55%;

  @media screen and (max-width: 1124px) {
    width: 100%;
    align-items: center;
    height: 50%;
    margin-top: 40px;
  }
`;
const RightContainer = styled(Container)`
  flex-direction: column;
  width: 55%;
  display: flex;
  align-items: flex-start;
  padding-left: 30px;

  @media screen and (max-width: 1124px) {
    padding-left: 0px;
    width: 100%;
    height: 50%;
    align-items: center;
  }
`;
const DescBox = styled.div`
  &:first-child {
    margin-bottom: 10px;
  }
`;
const NameBox = styled(Box)`
  margin-bottom: 30px;
  padding: 0;
  @media screen and (max-width: 1124px) {
    width: 80%;
  }

  @media screen and (max-width: 610px) {
    src: none;
    height: 30%;
  }
`;
const TitleBox = styled(Box)``;
const PulbitmasilTitle = styled(Title)`
  margin: 20px 0;
  color: ${props => props.theme.accentColor};

  @media screen and (max-width: 1124px) {
    margin: 0;
  }
`;
const PulbitmasilSubTitle = styled(SubTitle)`
  margin: 20px 0;
  font-family: "Sebang";
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: 0.05em;
  color: ${props => props.theme.dangerColor};
`;
const PulbitmasilDesc = styled(Desc)`
  font-size: 16px;
  line-height: 25px;
  font-family: "Sebang";
  color: #636e72;

  @media screen and (max-width: 1124px) {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media screen and (max-width: 625px) {
    width: 70%;
  }
`;
const GreenCircleImg = styled(Box)`
  background-image: url("/assets/images/about/name_green.png");
  background-size: contain;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;

  @media screen and (max-width: 1124px) {
    max-width: 100%;
  }
  @media screen and (max-width: 625px) {
    max-width: 100%;
    background-image: url("");
  }
`;
const WalkCircleImg = styled(GreenCircleImg)`
  background-image: url("/assets/images/about/name_walk.png");
  @media screen and (max-width: 625px) {
    max-width: 100%;
    background-image: url("");
  }
`;
const GreenName = styled(SubTitle)`
  font-size: 36px;
  line-height: 42px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #00401b;
  margin-bottom: 10px;

  @media screen and (max-width: 1124px) {
    font-size: 30px;
    margin-bottom: 5px;
  }
  @media screen and (max-width: 625px) {
    font-size: 25px;
    margin-bottom: 5px;
  }
`;
const WalkName = styled(GreenName)`
  margin-bottom: 15px;
  @media screen and (max-width: 1124px) {
    font-size: 30px;
    margin-bottom: 5px;
  }
  @media screen and (max-width: 625px) {
    font-size: 25px;
    margin-bottom: 5px;
  }
`;
const GreenDesc = styled(Desc)`
  text-align: center;
  line-height: 20px;

  @media screen and (max-width: 625px) {
    font-size: 14px;
  }
`;
const WalkDesc = styled(GreenDesc)``;
const MeaningText = styled(SubTitle)`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${props => props.theme.accentColor};
  padding-bottom: 80px;

  @media screen and (max-width: 1124px) {
    padding-bottom: 0px;
    font-size: 20px;
  }
`;
