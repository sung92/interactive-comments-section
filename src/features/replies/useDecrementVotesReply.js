import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decrementVotes } from "../../services/apiVotesReplies";

export function useDecrementVotesReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => decrementVotes(id),
    onSuccess: () => {
      queryClient.invalidateQueries("replies");
    },
  });
}
