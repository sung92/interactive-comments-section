import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementVotes } from "../../services/apiVotesReplies";

export function useIncrementVotesReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => incrementVotes(id),
    onSuccess: () => {
      queryClient.invalidateQueries("replies");
    },
  });
}
