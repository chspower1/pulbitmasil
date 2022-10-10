import { userAtom } from "@atom/user";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IReview } from "src/types/review";
import styled from "styled-components";

export default function Card({ review }: { review: IReview }): React.ReactElement {
  const { userId, reviewId, title, description, createAt } = review;
  const [isEdit, setIsEdit] = useState(false);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const handleClickEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // navigate("");
    // setIsEdit(true);
  };

  return (
    <CardWrap>
      <InfoContainer>
        <CardImg />
        <InfoBox>
          <p>닉네임: {title}</p>
          <p>날짜: </p>
        </InfoBox>
      </InfoContainer>
      <p>{description}</p>
      {user?.id === userId ? <button onClick={handleClickEdit}>수정</button> : null}
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
