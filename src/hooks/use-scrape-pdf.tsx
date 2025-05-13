/* 
1. user uploads file
    - file contains: name, size etc idk

2. query mutation function calls pdf scraper api
    returns: 
        - markdown file for display 
        - text for tts

3. on success, set api response to query cache
    - under 'currentPDF'
    - store data shape:
        file: pdf
        markdown: markdownPDF (api response)
        text: textPDF (api response)
*/

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scrapeFile } from "../api/scrape-pdf";
import { CurrentPDF } from "../types/pdf";
import { format } from "date-fns";

export const useScrapePDF = () => {
  const queryClient = useQueryClient();

  return useMutation<CurrentPDF, Error, File>({
    mutationFn: async (file: File) => {
      const response = await scrapeFile(file);
      return {
        file,
        name: file.name,
        markdown: response.markdown,
        text: response.text,
        time: format(new Date(), "d/MM/yyyy HH:mm"),
      };
    },
    onSuccess: (currentPDF) => {
      queryClient.setQueryData<CurrentPDF>(["currentPDF"], currentPDF);
      console.log("currentPDF", currentPDF);
    },
    mutationKey: ["currentPDF"],
  });
};
