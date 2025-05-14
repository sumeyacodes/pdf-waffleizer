import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PDF } from "../utils/types";

export function useCurrentPDF() {
  const queryClient = useQueryClient();
  return useQuery<PDF | null>({
    queryKey: ["currentPDF"],
    queryFn: () => queryClient.getQueryData<PDF>(["currentPDF"]) ?? null,
    staleTime: Infinity,
    enabled: true,
  });
}
