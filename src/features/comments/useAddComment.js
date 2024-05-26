import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useAddComment() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: addNewComment } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      toast.success("Comment successfully added");

      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, addNewComment };
}
