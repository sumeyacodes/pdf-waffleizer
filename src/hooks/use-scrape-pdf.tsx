import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scrapeFile } from "../api/scrape-pdf";
import { CurrentPDF } from "../utils/types";
import { format } from "date-fns";
import { saveCurrentPDF } from "../utils/local-storage";

export const useScrapePDF = () => {
  const queryClient = useQueryClient();

  return useMutation<CurrentPDF, Error, File>({
    mutationFn: async (file) => {
      const { markdown, text } = await scrapeFile(file);
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
