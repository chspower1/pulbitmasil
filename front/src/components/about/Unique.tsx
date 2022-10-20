import {
  AboutContent,
  Container,
  Title,
  SubTitle as SubTitleGuide,
  GreenAccent,
  Desc as DescGuide,
  Box,
  Row,
  DangerAccent,
  MainBtn,
} from "@style/Layout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Unique() {
  const navigate = useNavigate();

  return (
    <Wrap>
      <ImgContainer>
        <Img src="/assets/images/about/unique.jpg" alt="#" />
      </ImgContainer>
      <ContentContainer>
        <TextRow>
          <Title>풀빛마실의 차별점</Title>
        </TextRow>
        <TextRow>
          <SubTitle>
            당신의 더 쉬운 풀빛마실을 위해
            <br /> <DangerAccent>최적의 루트</DangerAccent>를 제공해 드려요.
          </SubTitle>
        </TextRow>
        <TextRow>
          <Desc>
            플로깅이 하고 집에 돌아온 당신! <br />
            <br />
            양손 가득 <DangerAccent>쓰레기</DangerAccent>가 들려있지는 않은가요?
            <br />
            <br /> 그런 당신을 위해 <GreenAccent>풀빛마실</GreenAccent>을 준비했어요.
            <br />
            <br /> 지구를 위해 노력한 여러분에게 손해가 가면 안되겠죠?
            <br />
            <div style={{ lineHeight: 1.3 }}>
              <br /> <GreenAccent>플로깅 루트</GreenAccent>의 마지막을 쓰레기통으로 설정하여 마지막까지 깔끔하게 <br />
              마무리 할 수 있도록 구성되어 있습니다. (물론 집에 가져가도 OK랍니다❤️‍🔥) <br />
            </div>
            <br />
            풀빛마실에서 열려있는 <GreenAccent>풀빛마실 코스</GreenAccent>를 확인하고 원하는 코스를 선택해주세요.
          </Desc>
        </TextRow>
        <BtnBox>
          <Btn onClick={() => navigate("/guide")}>사용법 보러가기</Btn>
          <Btn onClick={() => navigate("/greencrew")}>풀빛마실 하러가기</Btn>
        </BtnBox>
      </ContentContainer>
    </Wrap>
  );
}
const Wrap = styled(AboutContent)`
  width: 100%;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1024px) {
  }
`;
const ImgContainer = styled(Container)`
  justify-content: flex-end;
  margin-right: 70px;
  width: 47%;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const ContentContainer = styled(Container)`
  height: 460px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 50%;

  @media screen and (max-width: 1024px) {
    align-items: center;
    justify-content: space-between;
  }
  @media screen and (max-width: 758px) {
    width: 90%;
  }
`;
const SubTitle = styled(SubTitleGuide)`
  font-family: "Sebang";
  font-size: 24px;
  line-height: 1.3;

  @media screen and (max-width: 1024px) {
    font-size: 20px;
  }
`;
const Img = styled.img`
  width: 360px;
  height: 460px;
  object-fit: cover;
  border-radius: 10px;
  border: solid 5px ${props => props.theme.weekColor};
`;
const Desc = styled(DescGuide)`
  line-height: 1.1;

  @media screen and (max-width: 1024px) {
    text-align: center;
  }
`;
const Btn = styled(MainBtn)`
  width: 180px;
  height: 50px;
  font-size: 18px;
  padding: 10px 5px;

  @media screen and (max-width: 1024px) {
    width: 150px;
    height: 40px;
    font-size: 14px;
  }
`;
const BtnBox = styled(Box)`
  width: 380px;
  justify-content: space-between;
  
  @media screen and (max-width: 1024px) {
    width: 320px;
  }
`;
const TextRow = styled(Row)`
  @media screen and (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
