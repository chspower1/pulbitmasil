import { QueryClient, useMutation } from "@tanstack/react-query";
import { editReview } from "@api/review";
import { REVIEWS } from "@constants/queryKeys";

export const useUpdateReview = () => {
  const queryClient = new QueryClient();
  const { mutateAsync: update } = useMutation(editReview, {
    onSuccess: () => {
      queryClient.invalidateQueries([REVIEWS]);
    },
  });
  return { update };
};
