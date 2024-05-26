import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upvote } from "../../services/apiVotes";

export function useUpvote(commentId, userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => upvote(commentId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });
}
