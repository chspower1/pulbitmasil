import { QueryClient, useMutation } from "@tanstack/react-query";
import { createReview } from "@api/review";
import { REVIEWS } from "@constants/queryKeys";

export const useCreateReview = () => {
  const queryClient = new QueryClient();
  const { mutateAsync: create } = useMutation(createReview, {
    onSuccess: () => {
      console.log("useCreateReview init");
      queryClient.invalidateQueries([REVIEWS]);
    },
  });
  return { create };
};
