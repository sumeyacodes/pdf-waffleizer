import { useQuery } from "@tanstack/react-query";
import { PDF } from "../utils/types";
import { getStoredPDFs } from "../utils/local-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deletePDF,
  saveCurrentPDF,
  getCurrentPDF,
} from "../utils/local-storage";

export function useAllSavedPDFs() {
  return useQuery<PDF[], Error>({
    queryKey: ["storedPDFs"],
    queryFn: () => Promise.resolve(getStoredPDFs()),
    initialData: [],
  });
}

export function useViewSavedPDF() {
  const queryClient = useQueryClient();

  return useMutation<PDF, Error, string>({
    mutationFn: async (pdfId: string) => {
      const storedPdfs = getStoredPDFs();
      const pdf = storedPdfs.find((p) => p.id === pdfId);
      if (!pdf) throw new Error(`PDF with id ${pdfId} not found`);
      saveCurrentPDF("currentPDF", pdf);
      return pdf;
    },
    onSuccess: (pdf) => {
      queryClient.setQueryData<PDF>(["currentPDF"], pdf);
      queryClient.invalidateQueries({ queryKey: ["currentPDF"] });
    },
    onError: (error) => {
      console.error("Failed to view PDF:", error);
    },
  });
}

export const useDeleteSavedPDF = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, PDF>({
    mutationFn: async (pdf) => {
      deletePDF("storedPDFs", pdf);

      const currentPDF = await getCurrentPDF("storedPDFs");
      if (currentPDF?.id === pdf.id) {
        queryClient.setQueryData(["currentPDF"], null);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storedPDFs"] });
    },
    onError: (error) => {
      console.error("Failed to delete PDF:", error);
    },
  });
};
