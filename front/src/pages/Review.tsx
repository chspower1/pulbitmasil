import Card from "@components/Card";
import React from "react";
import styled from "styled-components";

export default function Review() {
  return (
    <ReviewWrap>
      <TitleContainer>
        <Title>Review</Title>
        <SubTitle>
          <Accent>플로깅</Accent> 후기를 공유해주세요!
        </SubTitle>
      </TitleContainer>
      <ReviewBtn>후기 작성 go go!</ReviewBtn>
      <CardContainer>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </CardContainer>
    </ReviewWrap>
  );
}

const ReviewWrap = styled.div`
  position: relative;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: url("/assets/images/walk.jpg");
`;

const TitleContainer = styled.div`
  margin-bottom: 20px;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 50px;
  padding-top: 100px;
  text-align: center;
  color: ${props => props.theme.mainColor};
  text-decoration: underline;
  text-underline-position: under;
`;
const SubTitle = styled.p`
  font-size: 25px;
  margin-top: 30px;
  color: ${props => props.theme.mainColor};
`;
const Accent = styled.span`
  color: ${props => props.theme.dangerColor};
`;
const ReviewBtn = styled.button`
  border-radius: 20px;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 80px;
`;
