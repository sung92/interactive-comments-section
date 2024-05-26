import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementVotes } from "../../services/apiComments";

export function useIncrementVotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => incrementVotes(id),
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });
}
