import { ReviewDeleteIdAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ModalBtnContainer, ModalDesc, ModalContainer, ModalWrap, Overlay } from "@style/ModalStyle";
import { deleteReview } from "@api/review";
import { userAtom } from "@atom/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OverlayVariant } from "@style/ModalVariants";
import { getUser } from "@api/user";
import { DangerAccent } from "@style/Layout";

export default function ReviewDeleteModal({ reviewId }: { reviewId: number }) {
  const [reviewDelId, setReviewDelId] = useRecoilState(ReviewDeleteIdAtom);
  const user = useRecoilValue(userAtom);
  // const [reviews, setReviews] = useRecoilState(ReviewsAtom);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const reviewMutation = useMutation(deleteReview, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["reviews"]);
    },
  });
  const userMutation = useMutation(getUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  const handleClickConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    reviewMutation.mutate({ reviewId, userId: user?.id! });
    userMutation.mutate();
    setReviewDelId(null);
    navigate("/review");
  };
  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setReviewDelId(null);
  };

  return (
    <AnimatePresence>
      {reviewDelId && (
        <ReviewModalWrap>
          <ReviewModalContainer>
            <DeleteDesc>
              <DangerDelelteAccent>삭제</DangerDelelteAccent> &nbsp;하시겠습니까?
            </DeleteDesc>
            <ModalBtnContainer>
              <DeleteBtn type="button" onClick={handleClickConfirm}>
                네
              </DeleteBtn>
              <CloseBtn type="button" onClick={handleClickCancel}>
                아니요
              </CloseBtn>
            </ModalBtnContainer>
          </ReviewModalContainer>
          <Overlay
            onClick={handleClickCancel}
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </ReviewModalWrap>
      )}
    </AnimatePresence>
  );
}

const ReviewModalWrap = styled(ModalWrap)`
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 1000;
  @media screen and (max-width: 767px) {
    position: fixed;
    left: 0%;
  }
`;
const ReviewModalContainer = styled(ModalContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 500px;
  height: 200px;

  @media screen and (max-width: 767px) {
    width: 80%;
  }
`;

const DangerDelelteAccent = styled(DangerAccent)`
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

const DeleteDesc = styled(ModalDesc)`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const DeleteBtn = styled.button`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 22px;
  background-color: ${props => props.theme.dangerColor};
  &:hover {
    background-color: #cc5e43;
  }
  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
`;
const CloseBtn = styled(DeleteBtn)`
  background-color: ${props => props.theme.mainColor};
  &:hover {
    background-color: ${props => props.theme.accentColor};
  }
`;
