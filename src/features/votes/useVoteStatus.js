import { useQuery } from "@tanstack/react-query";
import { fetchVoteStatus } from "../../services/apiVotes";

export function useVoteStatus(commentId, userId) {
  return useQuery({
    queryKey: ["voteStatus", "comment", commentId, userId],
    queryFn: () => fetchVoteStatus(commentId, userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
