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
} from "@style/Layout";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Unique() {
  return (
    <Wrap>
      <ImgContainer>
        <Img
          src="https://plus.unsplash.com/premium_photo-1661266878025-ca5773b7dfa4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="#"
        />
      </ImgContainer>
      <ContentContainer>
        <Row>
          {/* <QueteImg style={{ marginRight: "8px" }} src="/assets/icon/double_quotes_start.svg" alt="" /> */}
          <Title>풀빛마실의 차별점</Title>
          {/* <QueteImg style={{ marginLeft: "8px" }} src="/assets/icon/double_quotes_start.svg" alt="" /> */}
        </Row>
        <Row>
          <SubTitle>
            당신의 더 쉬운 풀빛마실을 위해
            <br /> <GreenAccent>최적의 루트</GreenAccent>를 제공해 드려요.
          </SubTitle>
        </Row>
        <Row>
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
        </Row>
        <Row>
          <Link to="/guide">
            <Btn>사용법 보러가기</Btn>
          </Link>
          <Link to="/greencrew">
            <Btn>풀빛마실 하러가기</Btn>
          </Link>
        </Row>
      </ContentContainer>
    </Wrap>
  );
}
const Wrap = styled(AboutContent)`
  align-items: center;
  justify-content: center;
`;
const ImgContainer = styled(Container)`
  justify-content: flex-start;
  width: 47%;
`;
const QueteImg = styled.img`
  width: 20px;
  margin-top: -30px;
`;
const ContentContainer = styled(Container)`
  height: 460px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
const SubTitle = styled(SubTitleGuide)`
  font-family: "Sebang";
  font-size: 24px;
  line-height: 1.3;
`;
const Img = styled.img`
  width: 345px;
  height: 460px;
`;
const Desc = styled(DescGuide)`
  line-height: 1.1;
`;
const Btn = styled.button`
  width: 180px;
  height: 50px;
  font-size: 18px;
  padding: 10px 5px;
  margin-right: 20px;
`;
