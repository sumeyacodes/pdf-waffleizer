import {
  useMutation,
  useQueryClient,
  useMutationState,
  useIsMutating,
} from "@tanstack/react-query";
import { extractPDF } from "../api/extract-pdf";
import { PDF } from "../utils/types";
import { format } from "date-fns";
import { saveCurrentPDF } from "../utils/local-storage";

export const useExtractPDF = () => {
  const queryClient = useQueryClient();
  const mutationKey = ["currentPDF"];

  const { mutate, isPending, isError } = useMutation<PDF, Error, File>({
    mutationKey,
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
    onSuccess: (pdf: PDF) => {
      queryClient.setQueryData<PDF>(mutationKey, pdf);
      saveCurrentPDF("currentPDF", pdf);
      queryClient.invalidateQueries({ queryKey: ["storedPDFs"] });
    },
  });

  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      const data = mutation.state.data;
      return data;
    },
  });

  const cachedPDF = queryClient.getQueryData<PDF>(mutationKey);
  const currentPDF = (data[data.length - 1] as PDF) || cachedPDF;

  // loading state that works for view pdf component
  const isLoading = useIsMutating({ mutationKey }) > 0;

  return {
    mutate,
    isPending,
    currentPDF,
    isError,
    isLoading,
  };
};
