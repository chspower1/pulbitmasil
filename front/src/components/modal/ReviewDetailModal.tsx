import { isReviewDeleteAtom } from "@atom/atom";
import { userAtom } from "@atom/user";
import { changeDayForm } from "@components/ReviewCard";
import { IReview } from "@type/review";
import { AnimatePresence, motion } from "framer-motion";
import { useState, SetStateAction, Dispatch, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

// interface ReviewDetailProps {
//   review: IReview;
//   isReviewSelect: boolean;
//   setIsReviewSelect: Dispatch<SetStateAction<boolean>>;
// }
export default function ReviewDetailModal({ review }: { review: IReview }) {
  const { reviewId, userName, createAt, description, userId } = review;
  const navigate = useNavigate();
  const reviewMatch = useMatch(`/review/${reviewId}`);
  const user = useRecoilValue(userAtom);
  const [isReviewDeleteModal, setIsReviewDeleteModal] = useRecoilState(isReviewDeleteAtom);

  const onOverlayClick = () => {
    navigate("/review"); // 이렇게되면 또 리랜더링되는데 이게맞나 ?
  };
  const day = changeDayForm(createAt!);

  useEffect(() => {
    console.log(reviewMatch);
    console.log(reviewId);
  }, []);

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />
      <ReviewWrap layoutId={`${reviewId}wrap`} transition={{ type: "spring", duration: 1 }}>
        <ImgContainer>
          <ReviewImg
            src="/assets/images/review_test.jpg"
            alt="review image"
            // layoutId={`${reviewId}image`}
            transition={{ type: "tween", duration: 1 }}
          ></ReviewImg>
        </ImgContainer>
        <ReviewContainer>
          <InfoContainer>
            <CardImg src={`/assets/icon/profile01.png`} />
            <InfoBox>
              <p style={{ fontSize: "25px" }}>
                <span style={{ color: "green" }}>{userName ? userName : "***"}</span> 님
              </p>
              <p style={{ fontSize: "20px", marginTop: "5px" }}>{day} </p>
            </InfoBox>
            <p style={{ position: "absolute", right: "25px" }}>지역</p>
          </InfoContainer>

          <TextContainer>
            <p style={{ color: "#636E72", fontSize: "20px", fontWeight: "bold" }}>광교산 산책로 1모임</p>
            <Description>{description}</Description>
          </TextContainer>
        </ReviewContainer>
        <ButtonContainer>
          {user?.id === userId ? <Btn>수정</Btn> : null}

          {user?.id === userId ? (
            <Btn
              onClick={() => {
                setIsReviewDeleteModal(reviewId!);
              }}
            >
              삭제
            </Btn>
          ) : null}
        </ButtonContainer>
      </ReviewWrap>
    </>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ReviewWrap = styled(motion.div)`
  z-index: 1000;
  position: absolute;
  width: 600px;
  height: 700px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
`;

const ImgContainer = styled(motion.div)`
  width: 600px;
  height: 390px;
  position: relative;
`;
const ReviewImg = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const TextContainer = styled(motion.div)`
  width: 100%;
  height: 100px;
  margin-top: 30px;
  /* overflow: scroll; */
`;

const Description = styled(motion.p)`
  letter-spacing: 1px;
  line-height: 1.3em;
  margin-top: 20px;
  font-size: 20px;
`;
const InfoBox = styled(motion.div)`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ReviewContainer = styled(motion.div)`
  width: 100%;
  padding: 30px;
`;

const InfoContainer = styled(motion.div)`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  height: 35px;
  margin: auto;
`;
const CardImg = styled(motion.img)`
  width: 30px;
  height: 30px;
`;
const ButtonContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  margin: auto;
`;
const Btn = styled(motion.button)`
  width: 50%;
  height: 20px;
  &:first-child {
    border-right: 1px #388e3c solid;
  }
`;
