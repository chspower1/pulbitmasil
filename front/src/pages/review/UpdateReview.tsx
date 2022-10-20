import { IReviewUpdateData } from "@type/review";
import { useLocation } from "react-router-dom";
import ReviewForm from "./ReviewForm";

export default function UpdateReview() {
  const { state } = useLocation(); //reviewId, userId
  const updateData: IReviewUpdateData = {
    type: "UPDATE",
    reviewId: state.reviewId,
  };

  return <ReviewForm formProps={updateData}></ReviewForm>;
}
