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
  const reviewMatch = useMatch(`/review/${reviewId}`);
  const onOverlayClick = () => {
    navigate("/review"); // 이렇게되면 또 리랜더링되는데 이게맞나 ?
  };

  useEffect(() => {
    console.log(reviewMatch);
    console.log(reviewId);
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.div
          layoutId={`${reviewId}wrap`}
          style={{
            width: "400px",
            height: "700px",
            backgroundColor: "red",
            position: "absolute",
            top: "10%",
            right: "50%",
          }}
          transition={{ type: "spring", duration: 0.1 }}
        >
          <motion.img
            src="/assets/images/review_test.jpg"
            style={{ width: "400px", height: "300px" }}
            layoutId={`${reviewId}image`}
            transition={{ type: "tween", duration: 1 }}
          />
        </motion.div>
        <Overlay
          onClick={onOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <div>리뷰!!!!!</div>
    </>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
