import { useMutation, useQueryClient } from "@tanstack/react-query";
import { downvote } from "../../services/apiVotesReplies";

export function useDownvoteReply(replyId, userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => downvote(replyId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["voteStatus", "reply", replyId, userId]);
      queryClient.invalidateQueries("replies");
    },
  });
}
