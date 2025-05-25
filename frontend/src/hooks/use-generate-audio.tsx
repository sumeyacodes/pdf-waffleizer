import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateAudio } from "../api/generate-audio";
import { Audio, PDF } from "../utils/types";

export const useGenerateAudio = () => {
  const queryClient = useQueryClient();

  return useMutation<Audio, Error, string>({
    mutationKey: ["generatingAudio"],
    mutationFn: async (text) => {
      const blob = await generateAudio(text);

      return { audioBlob: blob, audioUrl: URL.createObjectURL(blob) };
    },
    onSuccess: (audio) => {
      const current = queryClient.getQueryData<PDF>(["currentPDF"]);
      if (!current) throw new Error("No PDF in cache");

      const updated = { ...current, audio };

      // update current pdf to trigger rerender
      queryClient.setQueryData(["currentPDF"], updated);
    },
  });
};
