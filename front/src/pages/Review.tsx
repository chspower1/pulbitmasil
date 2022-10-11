import { getReviews } from "@api/review";
import Card from "@components/ReviewCard";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { IReview } from "src/types/review";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { isReviewDeleteAtom } from "@atom/atom";
import ReviewDeleteModal from "@components/modal/ReviewDeleteModal";
import { userAtom } from "@atom/user";

export default function Review() {
  const user = useRecoilValue(userAtom);
  const isEdit = false;
  const navigate = useNavigate();
  const [isReviewDeleteModal, setIsReviewDeleteModal] = useRecoilState(isReviewDeleteAtom);
  const { isLoading, data: reviews } = useQuery<IReview[]>(["reviews"], getReviews);

  return (
    <ReviewWrap>
      <TitleContainer>
        <Title>Review</Title>
        <SubTitle>
          <Accent>플로깅</Accent> 후기를 공유해주세요!
        </SubTitle>
      </TitleContainer>
      {isReviewDeleteModal && <ReviewDeleteModal reviewId={isReviewDeleteModal} userId={user?.id!} />}
      <ReviewBtn onClick={() => navigate("/review/write", { state: { isEdit } })}>후기 작성 go go!</ReviewBtn>
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

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 80px;
  flex-wrap: wrap;
`;
const ReviewBtn = styled.button`
  border-radius: 20px;
`;
