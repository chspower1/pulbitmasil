import { AboutContent, Box, Container, Title, SubTitle, Desc } from "@style/Layout";
import styled from "styled-components";

export default function Pulbitmasil() {

  return(
    <PulbitmasilContent>
      <LeftContainer>
        <NameBox>
          <GreenCircleImg>
            <GreenName>풀빛</GreenName>
            <GreenDesc>풀의 빛깔과 같은<br/>진한 연둣빛</GreenDesc>
          </GreenCircleImg>
          <img src={'assets/icon/+.svg'} />
          <WalkCircleImg>
            <WalkName>마실</WalkName>
            <WalkDesc>이웃에 놀러 나가는 일</WalkDesc>
          </WalkCircleImg>
        </NameBox>
        <MeaningText>마실 나가듯 즐겁고 가볍게 실천하며<br/>지구의 풀빛색을 지키자</MeaningText>
      </LeftContainer>
      <RightContainer>
        <TitleBox>
          {/* <img src={'assets/icon/double_quotes_start.svg'}/> */}
          <PulbitmasilTitle>풀빛마실이란</PulbitmasilTitle>
          {/* <img src={'assets/icon/double_quotes_end.svg'}/> */}
        </TitleBox>
        <PulbitmasilSubTitle>플로깅 이란 단어를 들어보셨나요?</PulbitmasilSubTitle>
        <PulbitmasilDesc>
          플로깅이란 이삭줍기를 의미하는 스웨덴어 플로카 웁(plocka upp)과
          영어 조깅(jogging)의 합성어로 달리기를 하면서 쓰레기를 줍는 운동을 말합니다.<br/>
          <br/>
          저희 팀은 단순히 조깅뿐만 아니라 더 넓은 차원에서<br/>
          가벼운 마음으로 이웃과 친목을 도모하며 마실 나가듯이 가볍게<br/>
          실천해보자는 뜻에서 풀빛마실을 만들게 되었습니다.
        </PulbitmasilDesc>
      </RightContainer>
    </PulbitmasilContent>
  )
}

const PulbitmasilContent = styled(AboutContent)`
  display: flex;
`;

const LeftContainer = styled(Container)`
  flex-direction: column;
  width: 55%;
`;
const RightContainer = styled(LeftContainer)`
  width: 45%;
  display: flex;
  align-items: flex-start;
  padding-left: 30px;
`;

const NameBox = styled(Box)`
  margin-bottom: 30px;
  padding: 0;
`;
const TitleBox = styled(Box)`
`;
const PulbitmasilTitle = styled(Title)`
  margin: 20px 0;
  color: ${props => props.theme.accentColor};
`;

const PulbitmasilSubTitle = styled(SubTitle)`
  margin: 20px 0;
  font-size: 24px;
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
  color: #636E72;
`;

const GreenCircleImg = styled.div`
  background-image: url('/assets/images/about/name_green.png');
  background-size: contain;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
const WalkCircleImg = styled(GreenCircleImg)`
    background-image: url('/assets/images/about/name_walk.png');
`;
const GreenName = styled(SubTitle)`
  font-size: 36px;
  line-height: 42px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #00401B;
  margin-bottom: 10px;
`;
const WalkName = styled(GreenName)`
  margin-bottom: 15px;
`;
const GreenDesc = styled(Desc)`
  text-align: center;
  line-height: 20px;
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
`;