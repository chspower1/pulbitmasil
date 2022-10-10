import { getReviews } from "@api/api";
import Card from "@components/ReviewCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IReview } from "src/types/review";
import { useQuery } from "@tanstack/react-query";

export default function Review() {
  const navigate = useNavigate();
  // const [reviews, setReveiws] = useState<IReview[]>();
  const { isLoading, data: reviews } = useQuery<IReview[]>(["review"], getReviews);

  // useEffect(() => {
  //   console.log("review", reviews);
  //   console.log("isError", isError);
  //   console.log("isLoading", isLoading);
  // }, [reviews]);

  return (
    <ReviewWrap>
      <TitleContainer>
        <Title>Review</Title>
        <SubTitle>
          <Accent>플로깅</Accent> 후기를 공유해주세요!
        </SubTitle>
      </TitleContainer>
      <ReviewBtn onClick={() => navigate("/review/write")}>후기 작성 go go!</ReviewBtn>
      <CardContainer>
        {reviews &&
          reviews.map(review => {
            return <Card review={review}></Card>;
          })}
      </CardContainer>
    </ReviewWrap>
  );
}

const ReviewWrap = styled.div`
  position: relative;
  padding-top: 100px;
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
