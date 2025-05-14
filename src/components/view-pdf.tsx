import Markdown from "react-markdown";
import { useExtractPDF } from "../hooks/use-extract-pdf";
import { DefaultMD } from "./default-pdf";
import { useCurrentPDF } from "../hooks/use-current-pdf";

export function ViewPDF() {
  const { isLoading } = useExtractPDF();
  const { data: currentPDF } = useCurrentPDF();

  return (
    <section className="prose prose-xl w-full max-w-full bg-neutral-400 border border-neutral-800 text-neutral-900 rounded-lg px-6 py-6 shadow-sm space-y-4 text-start font-mono">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {currentPDF && (
            <article className="font-sans text-[1.1rem] text-end text-neutral-700 text-sm">
              <p>{currentPDF?.name}</p>
              <p>{currentPDF.time}</p>
            </article>
          )}
          <Markdown>{currentPDF?.markdown || DefaultMD}</Markdown>
        </>
      )}
    </section>
  );
}
