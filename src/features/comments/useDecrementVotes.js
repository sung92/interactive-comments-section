import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decrementVotes } from "../../services/apiComments";

export function useDecrementVotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => decrementVotes(id),
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });
}
