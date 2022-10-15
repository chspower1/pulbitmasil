import ReviewForm from "./ReviewForm";
import { IReviewUpdateData } from "@type/review";

export default function CreateReview() {
  const createReview: IReviewUpdateData = {
    type: "CREATE",
  };
  return <ReviewForm formProps={createReview}></ReviewForm>;
}
