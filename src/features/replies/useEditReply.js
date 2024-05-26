import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editReply as editReplyApi } from "../../services/apiReplies";
import toast from "react-hot-toast";

export function useEditReply() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: editReply } = useMutation({
    mutationFn: editReplyApi,
    onSuccess: () => {
      toast.success("Reply successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["replies"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, editReply };
}
