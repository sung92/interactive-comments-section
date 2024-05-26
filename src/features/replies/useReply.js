import { useQuery } from "@tanstack/react-query";
import { getReply } from "../../services/apiReplies";

export function useReply(id) {
  const {
    isLoading,
    data: replies,
    error,
  } = useQuery({
    queryKey: ["replies", id],
    queryFn: () => getReply(id),
  });

  return { isLoading, error, replies };
}
