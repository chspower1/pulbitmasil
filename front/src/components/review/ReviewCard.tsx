import { userAtom } from "@atom/user";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { IReview } from "@type/review";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ReviewDeleteIdAtom } from "@atom/atom";
import ReviewDeleteModal from "../modal/ReviewDeleteModal";
import { Accent } from "@style/ModalStyle";

export const changeDayForm = (createAt: Date): string => {
  const createDay = new Date(createAt);
  const year = createDay.getFullYear();
  const month = createDay.getMonth() + 1;
  const date = createDay.getDate();

  return `${year}-${month >= 10 ? month : "0" + month}-${date >= 10 ? date : "0" + date}`;
};

export default function Card({ review }: { review: IReview }): React.ReactElement {
  const { userId, reviewId, description, createAt, name, reviewImg } = review;
  const isEdit = true;
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [reviewDelId, setReviewDelId] = useRecoilState(ReviewDeleteIdAtom);

  const day = changeDayForm(createAt!);

  return (
    <>
      <CardWrap whileHover={{ scale: 1.03 }} layoutId={`${reviewId}wrap`}>
        <motion.div
          onClick={() => {
            navigate(`${reviewId}`);
          }}
        >
          <ImgContainer>
            <ReviewImg src={reviewImg as string} alt="review image"></ReviewImg>
          </ImgContainer>
          <ReviewContainer>
            <InfoContainer>
              <CardImg src={`/assets/icon/user/profile01.png`} />
              <InfoBox>
                <p style={{ fontSize: "18px" }}>
                  <span style={{ color: "green" }}>{name ? name : "***"}</span> 님
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
        </motion.div>
        <ButtonContainer layoutId={`${reviewId}btn`}>
          {user?.id === userId ? (
            <Btn onClick={() => navigate(`edit/${reviewId}`, { state: { reviewId, userId } })}>수정</Btn>
          ) : null}

          {user?.id === userId ? (
            <Btn
              onClick={() => {
                setReviewDelId(reviewId!);
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

const CardWrap = styled(motion(motion.div))`
  position: relative;
  width: 370px;
  height: 430px;
  background-color: white;
  box-shadow: 3px 3px 15px #b0bec5;
  margin: 0 23px;
  margin-bottom: 40px;
`;
const InfoContainer = styled(motion.div)`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  height: 35px;
  margin: auto;
`;
const ReviewContainer = styled(motion.div)`
  width: 100%;
  padding: 20px;
`;

const ImgContainer = styled(motion.div)`
  width: 370px;
  height: 245px;
  position: relative;
`;
const TextContainer = styled(motion.div)`
  width: 100%;
  height: 100px;
  margin-top: 20px;
`;

const ReviewImg = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const InfoBox = styled(motion.div)`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

//이미지로 변경예정
const CardImg = styled(motion.img)`
  width: 30px;
  height: 30px;
`;
const ButtonContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 100%;
  bottom: 0px;
  margin: auto;
`;
const Btn = styled(motion.button)`
  width: 50%;
  height: 20px;
  &:first-child {
    border-right: 1px #388e3c solid;
  }
`;
const Description = styled(motion.p)`
  text-overflow: ellipsis;
  letter-spacing: 1px;
  line-height: 1.3em;
  margin-top: 20px;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;
