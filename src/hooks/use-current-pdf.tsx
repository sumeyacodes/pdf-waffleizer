import { useQueryClient, useIsMutating } from "@tanstack/react-query";
import { CurrentPDF } from "../types/pdf";

export function useCurrentPDF() {
  const queryClient = useQueryClient();

  const currentPDF = queryClient.getQueryData<CurrentPDF>(["currentPDF"]);
  const isLoading = useIsMutating({ mutationKey: ["currentPDF"] });

  return { currentPDF, isLoading };
}
