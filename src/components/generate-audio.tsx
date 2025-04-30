import { AudioLines } from "lucide-react";

export function GenerateAudio() {
  return (
    <article className="w-full h-full bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-sm flex flex-col items-center justify-center gap-1 transition-colors duration-200">
      <AudioLines className="w-20 h-20 text-blue-400 hover:text-blue-300 transition-colors 200s" />
      <p className="  text-neutral-400 font-extrabold text-lg">
        Convert to Audio
      </p>
    </article>
  );
}
