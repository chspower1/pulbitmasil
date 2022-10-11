import { userAtom } from "@atom/user";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { IReview } from "src/types/review";
import styled from "styled-components";
import { motion } from "framer-motion";
import { isReviewDeleteAtom } from "@atom/atom";
import ReviewDeleteModal from "./modal/ReviewDeleteModal";

export default function Card({ review }: { review: IReview }): React.ReactElement {
  const { userId, reviewId, title, description, createAt } = review;
  const isEdit = true;
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [isReviewDeleteModal, setIsReviewDeleteModal] = useRecoilState(isReviewDeleteAtom);

  // const handleClickEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
  // };
  const changeDayForm = (createAt: Date): string => {
    const createDay = new Date(createAt);
    const year = createDay.getFullYear();
    const month = createDay.getMonth() + 1;
    const date = createDay.getDate();

    return `${year}-${month >= 10 ? month : "0" + month}-${date >= 10 ? date : "0" + date}`;
  };
  const day = changeDayForm(createAt!);

  return (
    <CardWrap whileHover={{ scale: 1.1 }}>
      <ReviewDeleteModal reviewId={review?.reviewId!} />
      <InfoContainer>
        <CardImg />
        <InfoBox>
          <p>아이디: {userId}</p>
          <p>날짜:{day} </p>
        </InfoBox>
      </InfoContainer>
      <p>{title}</p>
      <p>{description}</p>
      {user?.id === userId ? (
        <button onClick={() => navigate(`/review/edit/${reviewId}`, { state: { isEdit, review } })}>수정</button>
      ) : null}

      {user?.id === userId ? (
        <button
          onClick={() => {
            console.log("clickclicilc");
            setIsReviewDeleteModal(true);
          }}
        >
          삭제
        </button>
      ) : null}
    </CardWrap>
  );
}

const CardWrap = styled(motion.div)`
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
