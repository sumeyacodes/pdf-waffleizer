import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePDF, getCurrentPDF } from "../utils/local-storage";
import { PDF } from "../utils/types";

export const useDeletePDF = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, PDF>({
    mutationFn: async (pdf) => {
      deletePDF("currentPDF", pdf);

      // Check if we're deleting the current PDF
      const currentPDF = await getCurrentPDF("currentPDF").catch(() => null);
      if (currentPDF?.id === pdf.id) {
        queryClient.setQueryData(["currentPDF"], null);
      }
    },
    onSuccess: () => {
      // Refresh the stored PDFs list after deletion
      queryClient.invalidateQueries({ queryKey: ["storedPDFs"] });
    },
    onError: (error) => {
      console.error("Failed to delete PDF:", error);
    },
  });
};
