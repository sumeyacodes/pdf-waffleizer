import { useQuery } from "@tanstack/react-query";
import { CurrentPDF } from "../utils/types";
import { getCurrentPDF } from "../utils/local-storage";

export function useCurrentPDF() {
  return useQuery<CurrentPDF, Error>({
    queryKey: ["currentPDF"],
    queryFn: () => getCurrentPDF("currentPDF"),
    // causing pdf to not show loading state
    // but without it, page wont render
    enabled: false,
  });
}
