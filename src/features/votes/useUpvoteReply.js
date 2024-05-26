import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upvote } from "../../services/apiVotesReplies";

export function useUpvoteReply(replyId, userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => upvote(replyId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["voteStatus", "reply", replyId, userId]);
      queryClient.invalidateQueries("replies");
    },
  });
}
