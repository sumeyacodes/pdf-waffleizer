import { useQuery } from "@tanstack/react-query";
import { PDF } from "../utils/types";
import { getCurrentPDF } from "../utils/local-storage";

export function useCurrentPDF() {
  return useQuery<PDF, Error>({
    queryKey: ["currentPDF"],
    queryFn: () => getCurrentPDF("currentPDF"),
    // causing pdf to not show loading state
    // but without it, page wont render
    enabled: false,
  });
}
