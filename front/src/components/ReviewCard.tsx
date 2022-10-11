import { userAtom } from "@atom/user";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IReview } from "src/types/review";
import styled from "styled-components";

export default function Card({ review }: { review: IReview }): React.ReactElement {
  const { userId, reviewId, title, description, createAt } = review;
  const isEdit = true;
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

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
    <CardWrap>
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
        <button onClick={() => navigate(`/review/edit/${reviewId}`, { state: { isEdit, reviewId } })}>수정</button>
      ) : null}
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
