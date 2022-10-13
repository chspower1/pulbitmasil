import { getReviews } from "@api/review";
import Card from "@components/review/ReviewCard";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { IReview } from "@type/review";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { isReviewDeleteAtom } from "@atom/atom";
import ReviewDeleteModal from "@components/modal/ReviewDeleteModal";
import { isLoginSelector, userAtom } from "@atom/user";
import { Box, Container, Wrapper } from "@style/Layout";
import ReviewDetailModal from "@components/modal/ReviewDetailModal";
import { AnimatePresence } from "framer-motion";

export default function Review() {
  const user = useRecoilValue(userAtom);
  const isEdit = false;
  const navigate = useNavigate();
  const reviewMatch = useMatch("/review/:reviewId");
  const [isReviewDeleteModal, setIsReviewDeleteModal] = useRecoilState(isReviewDeleteAtom);
  const [reviews, setRevies] = useState<IReview[] | undefined>();
  const isLogin = useRecoilValue(isLoginSelector);
  const { isLoading } = useQuery<IReview[]>(["reviews"], getReviews, {
    onSuccess(data) {
      setRevies(data);
    },
  });

  const handleClickCreateReview = () => {
    isLogin ? navigate("/review/write", { state: { isEdit } }) : alert("회원가입을 해주세요!");
  };

  useEffect(() => {
    // console.log(reviews);
  }, [reviews]);
  return (
    <>
      {isLoading || (
        <>
          <ReviewWrap>
            <TitleContainer>
              <Title>풀빛마실 이야기</Title>
              <SubTitle>
                <Accent>풀빛마실</Accent> 후기를 공유해주세요!
              </SubTitle>
            </TitleContainer>
            {isReviewDeleteModal && (
              <ReviewDeleteModal reviewId={isReviewDeleteModal} userId={user?.id!} setRevies={setRevies} />
            )}
            <ReviewBtn onClick={handleClickCreateReview}>이야기 작성</ReviewBtn>
            <CardContainer>
              <CardBox>
                {reviews ? (
                  reviews.map(review => {
                    return <Card review={review}></Card>;
                  })
                ) : (
                  <div>후기없음</div>
                )}
              </CardBox>
            </CardContainer>
            <AnimatePresence>
              {reviewMatch && (
                <ReviewDetailModal
                  review={reviews?.filter(review => review.reviewId === parseInt(reviewMatch?.params.reviewId!))[0]!}
                />
              )}
            </AnimatePresence>
          </ReviewWrap>
        </>
      )}
    </>
  );
}

const ReviewWrap = styled(Wrapper)`
  position: relative;
  margin-top: 50px;
  flex-direction: column;
  background-image: url("/assets/images/walk.jpg");
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 50px;
  text-align: center;
  color: ${props => props.theme.mainColor};
  border-bottom: 1px solid #eceff1;
  width: 500px;
  margin: auto;
  padding-bottom: 10px;
`;
const SubTitle = styled.p`
  font-size: 20px;
  margin-top: 30px;
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
`;

const ReviewBtn = styled.button`
  border-radius: 5px;
  width: 140px;
  height: 50px;
  font-size: 20px;
  margin-bottom: 30px;
`;
const CardBox = styled(Box)`
  flex-wrap: wrap;
  width: 100%;
  height: auto;

  /* padding-bottom: 80px; */
`;
