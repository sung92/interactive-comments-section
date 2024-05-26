import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiUsers";

export function useUser(id) {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  return { isLoading, error, user };
}
