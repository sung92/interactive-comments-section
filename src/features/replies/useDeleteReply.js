import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReply as deleteReplyApi } from "../../services/apiReplies";
import toast from "react-hot-toast";

export function useDeleteReply() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteReply } = useMutation({
    mutationFn: deleteReplyApi,
    onSuccess: () => {
      toast.success("Reply successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["replies"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteReply };
}
