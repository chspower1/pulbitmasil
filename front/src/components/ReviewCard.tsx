import React from "react";
import { IReview } from "src/types/review";
import styled from "styled-components";

export default function Card({ review }: IReview): React.ReactElement {
  console.log(review);
  const { id, name, description, createAt } = review;
  return (
    <CardWrap>
      <InfoContainer>
        <CardImg />
        <InfoBox>
          <p>닉네임:</p>
          <p>날짜: </p>
        </InfoBox>
      </InfoContainer>
    </CardWrap>
  );
}

const CardWrap = styled.div`
  width: 23%;
  height: 500px;
  background-color: #f5f5f5;
  border-radius: 20px;
  box-shadow: 5px 5px #c7c7c7;
`;
const InfoContainer = styled.div`
  margin: 20px 20px;
  display: flex;
  flex-direction: row;
  /* &:after {
    display: block;
    width: 60px;
    border-bottom: 1px solid black;
    margin: 20px auto;
  } */
`;

const InfoBox = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

//이미지로 변경예정
const CardImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: black;
`;
