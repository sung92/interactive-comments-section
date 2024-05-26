import { useQuery } from "@tanstack/react-query";
import { getReplies } from "../../services/apiReplies";

export function useReplies() {
  const {
    isLoading,
    data: replies,
    error,
  } = useQuery({
    queryKey: ["replies"],
    queryFn: getReplies,
  });

  return { isLoading, error, replies };
}
