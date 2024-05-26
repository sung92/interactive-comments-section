import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editComment as editCommentApi } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useEditComment() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: editComment } = useMutation({
    mutationFn: editCommentApi,
    onSuccess: () => {
      toast.success("Comment successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, editComment };
}
