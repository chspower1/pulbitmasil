import { getReviews } from "@api/review";
import Card from "@components/ReviewCard";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { IReview } from "@type/review";
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
  const [reviews, setRevies] = useState<IReview[] | undefined>();
  const { isLoading } = useQuery<IReview[]>(["reviews"], getReviews, {
    onSuccess(data) {
      setRevies(data);
    },
  });
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <>
      {isLoading || (
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
          <ReviewBtn onClick={() => navigate("/review/write", { state: { isEdit } })}>이야기 작성</ReviewBtn>
          <CardContainer>
            {reviews &&
              reviews.map(review => {
                return <Card review={review}></Card>;
              })}
          </CardContainer>
        </ReviewWrap>
      )}
    </>
  );
}

const ReviewWrap = styled.div`
  position: relative;
  padding: 0 200px;
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  height: 100vh;
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
  /* text-decoration: underline;
  text-underline-position: under; */
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

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  width: 90%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 80px;
`;
const ReviewBtn = styled.button`
  border-radius: 5px;
  width: 140px;
  height: 50px;
  font-size: 20px;
  margin-left: auto;
`;
