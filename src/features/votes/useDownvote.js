import { useMutation, useQueryClient } from "@tanstack/react-query";
import { downvote } from "../../services/apiVotes";

export function useDownvote(commentId, userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => downvote(commentId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });
}
