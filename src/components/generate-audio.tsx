import { AudioLines, Loader2 } from "lucide-react";
import { useGenerateAudio } from "../hooks/use-generate-audio";
import { useCurrentPDF } from "../hooks/use-current-pdf";

export function GenerateAudio() {
  const { mutateAsync, isPending } = useGenerateAudio();
  const { data: currentPDF } = useCurrentPDF();

  const handleSubmit = async () => {
    try {
      if (currentPDF?.text) {
        await mutateAsync(currentPDF.text);
      }
    } catch (err) {
      console.error("Audio generation failed:", err);
    }
  };

  return (
    <article className="w-full h-full ">
      <button
        className="w-full h-full bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-sm flex flex-col items-center justify-center gap-1 transition-colors duration-200"
        onClick={handleSubmit}>
        {isPending ? (
          <Loader2 className="w-15 h-15 animate-spin text-blue-400" />
        ) : (
          <AudioLines className="w-20 h-20 text-blue-400 hover:text-blue-600 transition-colors 200s" />
        )}
        <p className="flex items-center gap-2 text-neutral-400 font-extrabold text-lg">
          Convert to Audio
        </p>
      </button>
    </article>
  );
}
