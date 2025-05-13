import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateAudio } from "../api/generate-audio";
import { CurrentPDF } from "../types/pdf";

export const useGenerateAudio = () => {
  const queryClient = useQueryClient();

  return useMutation<Blob, Error, string>({
    mutationFn: async (text: string) => {
      const audio = await generateAudio(text);
      return audio;
    },
    onSuccess: (audio) => {
      queryClient.setQueryData<CurrentPDF>(["currentPDF"], (currentPDF) => {
        if (!currentPDF) {
          throw new Error("No PDF data found in cache");
        }

        return {
          ...currentPDF,
          audio,
        };
      });
    },
  });
};
