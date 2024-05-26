import { useQuery } from "@tanstack/react-query";
import { fetchVoteStatus } from "../../services/apiVotesReplies";

export function useVoteStatusReply(replyId, userId) {
  return useQuery({
    queryKey: ["voteStatus", "reply", replyId, userId],
    queryFn: () => fetchVoteStatus(replyId, userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
