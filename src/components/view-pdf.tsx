import Markdown from "react-markdown";
import { useViewPDF } from "../hooks/use-view-pdf";
import { DefaultMD } from "../hooks/use-view-pdf";

export function ViewPDF() {
  const { MarkdownPDF, isLoading } = useViewPDF();

  return (
    <section className="prose prose-xl w-full max-w-full bg-neutral-400 border border-neutral-800 text-neutral-900 rounded-lg px-10 py-8 shadow-sm space-y-4 text-start font-mono">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Markdown>{MarkdownPDF || DefaultMD}</Markdown>
      )}
    </section>
  );
}
