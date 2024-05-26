import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/apiComments";

export function useComments() {
  const {
    isLoading,
    data: comments,
    error,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  return { isLoading, error, comments };
}
