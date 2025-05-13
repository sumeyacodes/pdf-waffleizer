import { useMutation, useQueryClient } from "@tanstack/react-query";
import { extractPDF } from "../api/extract-pdf";
import { PDF } from "../utils/types";
import { format } from "date-fns";
import { saveCurrentPDF } from "../utils/local-storage";

export const useExtractPDF = () => {
  const queryClient = useQueryClient();

  return useMutation<PDF, Error, File>({
    mutationFn: async (file) => {
      const { markdown, text } = await extractPDF(file);
      return {
        id: crypto.randomUUID(),
        file,
        name: file.name,
        markdown,
        text,
        time: format(new Date(), "d/MM/yyyy HH:mm"),
      };
    },
    onSuccess: (pdf) => {
      queryClient.setQueryData(["currentPDF"], pdf);
      saveCurrentPDF("currentPDF", pdf);
    },
  });
};
