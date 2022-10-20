import { getReviews } from "@api/review";
import Card from "@components/review/ReviewCard";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { IReview } from "@type/review";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { ReviewDeleteIdAtom, isRegisterModalAtom } from "@atom/atom";
import ReviewDeleteModal from "@components/modal/ReviewDeleteModal";
import { isLoginSelector, userAtom } from "@atom/user";
import { Box, Container, Wrapper, Title, MainBtn } from "@style/Layout";
import ReviewDetailModal from "@components/modal/ReviewDetailModal";
import { AnimatePresence } from "framer-motion";
import RegisterModal from "@components/modal/RegisterModal";

export default function Review() {
  const isEdit = false;
  const navigate = useNavigate();
  const reviewMatch = useMatch("/review/:reviewId");
  const [reviewDelId, setReviewDelId] = useRecoilState(ReviewDeleteIdAtom);
  const [isRegisterModal, setIsRegisterModal] = useRecoilState(isRegisterModalAtom);

  const isLogin = useRecoilValue(isLoginSelector);
  const { data: reviews } = useQuery<IReview[]>(["reviews"], getReviews);

  const handleClickCreateReview = () => {
    isLogin ? navigate("/review/write") : setIsRegisterModal(true);
  };

  return (
    <ReviewWrap>
      <TitleContainer>
        <ReviewTitle>풀빛마실 이야기</ReviewTitle>
      </TitleContainer>
      <CardContainer>
        <SubTitle>
          <Accent>풀빛마실</Accent> 후기를 공유해주세요!
        </SubTitle>
        <ReviewBtn onClick={handleClickCreateReview} width="160px" height="60px">
          이야기 작성
        </ReviewBtn>
        <CardBox>
          {reviews?.map(review => {
            return <Card key={review.reviewId} review={review}></Card>;
          })}
        </CardBox>
      </CardContainer>
      {reviewDelId && <ReviewDeleteModal reviewId={reviewDelId} />}
      <AnimatePresence>
        {reviewMatch && (
          <ReviewDetailModal
            review={reviews?.filter(review => review.reviewId === parseInt(reviewMatch?.params.reviewId!))[0]!}
          />
        )}
      </AnimatePresence>
    </ReviewWrap>
  );
}

const ReviewWrap = styled(Wrapper)`
  position: relative;
  flex-direction: column;
  background-image: url("/assets/images/walk.jpg");
  margin-top: 40px;
`;

const TitleContainer = styled.div`
  text-align: center;
  height: 50px;
`;
const ReviewTitle = styled(Title)`
  font-size: 32px;
  color: ${props => props.theme.accentColor};
  border-bottom: 1px solid #eceff1;
  width: 500px;
  padding-bottom: 10px;
`;
const SubTitle = styled.p`
  font-size: 20px;
  margin-top: 15px;
  color: ${props => props.theme.mainColor};
`;
const Accent = styled.span`
  color: ${props => props.theme.dangerColor};
`;

const CardContainer = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  padding-top: 0px;
`;

const ReviewBtn = styled(MainBtn)`
  margin: 30px 0px;
  font-size: 22px;
`;
const CardBox = styled(Box)`
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  padding-bottom: 100px;

  /* padding-bottom: 80px; */
`;
