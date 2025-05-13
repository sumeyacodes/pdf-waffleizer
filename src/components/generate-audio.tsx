import { AudioLines } from "lucide-react";
import { useGenerateAudio } from "../hooks/use-generate-audio";
import { useCurrentPDF } from "../hooks/use-current-pdf";
import { useState } from "react";

export function GenerateAudio() {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const { mutateAsync, data: audio } = useGenerateAudio();
  const { currentPDF } = useCurrentPDF();

  const handleSubmit = async () => {
    try {
      if (currentPDF?.text) {
        const blob = await mutateAsync(currentPDF.text);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        return url;
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
        <AudioLines className="w-20 h-20 text-blue-400 hover:text-blue-600 transition-colors 200s" />
        <p className="flex items-center gap-2 text-neutral-400 font-extrabold text-lg">
          Convert to Audio
        </p>
      </button>

      {/* need to move audio player to separate component  */}
      {audio && (
        <audio
          src={audioUrl}
          controls
          autoPlay
          className="w-full rounded-lg mt-4"
        />
      )}
    </article>
  );
}
