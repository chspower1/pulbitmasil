import { ReviewDeleteIdAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Overlay, OverlayVariant } from "./LoginModal";
import { Navigate, useNavigate } from "react-router-dom";
import { BtnContainer, Desc, ModalContainer, ModalWrap as LogoutModalWrap, ModalWrap } from "@style/ModalStyle";
import { deleteReview } from "@api/review";
import { userAtom } from "@atom/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ReviewDeleteModal({ reviewId }: { reviewId: number }) {
  const [reviewDelId, setReviewDelId] = useRecoilState(ReviewDeleteIdAtom);
  const user = useRecoilValue(userAtom);
  // const [reviews, setReviews] = useRecoilState(ReviewsAtom);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteReview, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleClickConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    mutation.mutate({ reviewId, userId: user?.id! });

    //useNu
    // await deleteReview({ reviewId, userId: user?.id! });
    // setReviews(reviews => {
    //   return reviews?.filter(review => review.reviewId !== reviewDelId);
    // });
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
              <Accent>삭제</Accent> 하시겠습니까?
            </DeleteDesc>
            <BtnContainer>
              <DeleteBtn type="button" onClick={handleClickConfirm}>
                네
              </DeleteBtn>
              <CloseBtn type="button" onClick={handleClickCancel}>
                아니요
              </CloseBtn>
            </BtnContainer>
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
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  z-index: 10000;
`;
const ReviewModalContainer = styled(ModalContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: auto;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 500px;
  height: 200px;
`;

const Accent = styled.span`
  color: ${props => props.theme.dangerColor};
  font-weight: bold;
`;

const DeleteDesc = styled(Desc)`
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
`;
const CloseBtn = styled(DeleteBtn)`
  background-color: ${props => props.theme.mainColor};
  &:hover {
    background-color: ${props => props.theme.accentColor};
  }
`;
