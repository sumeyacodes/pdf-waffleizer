import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateAudio } from "../api/generate-audio";
import { Audio, PDF } from "../utils/types";
import { saveCurrentPDF } from "../utils/local-storage";

export const useGenerateAudio = () => {
  const queryClient = useQueryClient();

  return useMutation<Audio, Error, string>({
    mutationFn: async (text) => {
      const blob = await generateAudio(text);

      return { audioBlob: blob, audioUrl: URL.createObjectURL(blob) };
    },
    onSuccess: (audio) => {
      const current = queryClient.getQueryData<PDF>(["currentPDF"]);
      if (!current) throw new Error("No PDF in cache");

      const updated = { ...current, audio };
      queryClient.setQueryData(["currentPDF"], updated);

      saveCurrentPDF("currentPDF", updated);
    },
  });
};
