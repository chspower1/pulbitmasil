import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@api/review";
import { IReview } from "@type/review";
import { REVIEWS } from "@constants/queryKeys";

// 다수 리뷰 조회 쿼리
export const useGetReviews = () => {
  // DB에서 데이터를 조회
  const {
    isLoading,
    data: reviews,
    //refetch,
    // NOTE: string으로 관리하면 오타가 날 확률이 높으니 쿼리키는 상수로 관리해주세요.
  } = useQuery<IReview[]>([REVIEWS], getReviews, {
    // NOTE: 불필요한 로직
    // onSuccess(data) {
    //   setReviews(data);
    // },
  });

  return { isLoading, reviews };
};

// 단일 리뷰 조회 쿼리
export const useGetReview = () => {};
