import { userAtom } from "@atom/user";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { IReview } from "@type/review";
import styled from "styled-components";
import { motion } from "framer-motion";
import { isReviewDeleteAtom } from "@atom/atom";
import ReviewDeleteModal from "./modal/ReviewDeleteModal";
import { Accent } from "@style/ModalStyle";

export default function Card({ review }: { review: IReview }): React.ReactElement {
  const { userId, reviewId, description, createAt, userName } = review;
  const isEdit = true;
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [isReviewDeleteModal, setIsReviewDeleteModal] = useRecoilState(isReviewDeleteAtom);
  const randomNum = Math.floor(Math.random() * 8) + 1;

  useEffect(() => {
    console.log(review);
  }, []);
  const changeDayForm = (createAt: Date): string => {
    const createDay = new Date(createAt);
    const year = createDay.getFullYear();
    const month = createDay.getMonth() + 1;
    const date = createDay.getDate();

    return `${year}-${month >= 10 ? month : "0" + month}-${date >= 10 ? date : "0" + date}`;
  };
  const day = changeDayForm(createAt!);

  return (
    <>
      <CardWrap whileHover={{ scale: 1.1 }}>
        <ImgContainer>
          <ReviewImg src="/assets/images/review_test.jpg" alt="review image"></ReviewImg>
        </ImgContainer>
        <ReviewContainer>
          <InfoContainer>
            <CardImg src={`/assets/icon/profile0${randomNum}.png`} />
            <InfoBox>
              <p style={{ fontSize: "18px" }}>
                <span style={{ color: "green" }}>{userName ? userName : "***"}</span> 님
              </p>
              <p style={{ fontSize: "14px", marginTop: "5px" }}>{day} </p>
            </InfoBox>
            <p style={{ position: "absolute", right: "10px" }}>지역</p>
          </InfoContainer>
          <TextContainer>
            <p style={{ color: "#636E72", fontSize: "18px", fontWeight: "bold" }}>광교산 산책로 1모임</p>
            <Description>{description}</Description>
          </TextContainer>
        </ReviewContainer>
        <ButtonContainer>
          {user?.id === userId ? (
            <Btn onClick={() => navigate(`/review/edit/${reviewId}`, { state: { isEdit, review } })}>수정</Btn>
          ) : null}

          {user?.id === userId ? (
            <Btn
              onClick={() => {
                console.log("clickclicilc");
                setIsReviewDeleteModal(reviewId!);
              }}
            >
              삭제
            </Btn>
          ) : null}
        </ButtonContainer>
      </CardWrap>
    </>
  );
}

const CardWrap = styled(motion.div)`
  width: 370px;
  height: 480px;
  background-color: white;
  box-shadow: 3px 3px 15px #b0bec5;
  margin: 0 23px;
  margin-bottom: 40px;
`;
const InfoContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  height: 35px;
  margin: auto;
`;
const ReviewContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const ImgContainer = styled.div`
  width: 370px;
  height: 245px;
  position: relative;
`;
const TextContainer = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 20px;
`;

const ReviewImg = styled.img`
  position: absolute;
   top: 0;
   left: 0;
  width: 100%;
  height: 100%;
`;

const InfoBox = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

//이미지로 변경예정
const CardImg = styled.img`
  width: 30px;
  height: 30px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;
const Btn = styled.button`
  width: 50%;
  height: 20px;
  &:first-child {
    border-right: 1px #388e3c solid;
  }
`;
const Description = styled.p`
  text-overflow: ellipsis;
  letter-spacing: 1px;
  line-height: 1.3em;
  margin-top: 20px;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 3; // 원하는 라인수
  -webkit-box-orient: vertical;
`;
