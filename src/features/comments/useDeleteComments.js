import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComments as deleteCommentApi } from "../../services/apiComments";
import toast from "react-hot-toast";
// import { toast } from "react-hot-toast";

export function useDeleteComments() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi, // No hace falta especificar el argumento porque recibe y envia el mismo argumento (id) => deleteCommentApi(id)
    onSuccess: () => {
      toast.success("Comment successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteComment };
}
