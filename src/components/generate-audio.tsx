import { AudioLines, Loader2 } from "lucide-react";
import { useGenerateAudio } from "../hooks/use-generate-audio";
import { useCurrentPDF } from "../hooks/use-current-pdf";
import { useExtractPDF } from "../hooks/use-extract-pdf";

export function GenerateAudio() {
  const { mutate, isPending } = useGenerateAudio();
  const { data: currentPDF } = useCurrentPDF();
  const { isLoading } = useExtractPDF();

  const handleSubmit = () => {
    try {
      if (currentPDF?.text) {
        mutate(currentPDF.text);
      }
    } catch (err) {
      console.error("Audio generation failed:", err);
    }
  };

  return (
    <article className="w-full h-full ">
      <button
        disabled={!currentPDF?.text || isPending || isLoading}
        className="w-full h-full bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-sm flex flex-col items-center justify-center gap-1 text-blue-400 cursor-pointer disabled:cursor-not-allowed hover:text-blue-600 disabled:text-blue-400 transition-colors duration-200 disabled:opacity-50"
        onClick={handleSubmit}>
        {isPending ? (
          <Loader2 className="w-15 h-15 animate-spin text-blue-400" />
        ) : (
          <AudioLines className="w-20 h-20 stroke-current" />
        )}

        <p className="flex items-center gap-2 text-neutral-400 font-extrabold text-lg">
          Convert to Audio
        </p>
      </button>
    </article>
  );
}
