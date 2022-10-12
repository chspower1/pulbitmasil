import { IReview } from "@type/review";
import { AnimatePresence, motion } from "framer-motion";
import { useState, SetStateAction, Dispatch, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

// interface ReviewDetailProps {
//   review: IReview;
//   isReviewSelect: boolean;
//   setIsReviewSelect: Dispatch<SetStateAction<boolean>>;
// }
export default function ReviewDetailModal({ reviewId }: { reviewId: number }) {
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate("/review"); // 이렇게되면 또 리랜더링되는데 이게맞나 ?
  };

  useEffect(() => {
    console.log(reviewId);
  }, []);

  return (
    <>
      <AnimatePresence>
        <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      </AnimatePresence>
      <div>리뷰!!!!!</div>
    </>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
