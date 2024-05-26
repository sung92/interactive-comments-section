import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReply } from "../../services/apiReplies";
import toast from "react-hot-toast";

export function useCreateReply() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: createReply } = useMutation({
    mutationFn: addReply,
    onSuccess: () => {
      toast.success("Reply successfully added");

      queryClient.invalidateQueries({
        queryKey: ["replies"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, createReply };
}
