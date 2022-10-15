import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteReview } from "@api/review";
import { REVIEWS } from "@constants/queryKeys";

export const useDeleteReview = () => {
  const queryClient = new QueryClient();
  const { mutateAsync: remove } = useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries([REVIEWS]);
    },
  });
  return { remove };
};
