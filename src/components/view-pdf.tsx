import DefaultPDF from "../assets/pdf.mdx";
import { usePDFViewer } from "../hooks/use-pdf-viewer";

export function ViewPDF() {
  const { MDXComponent, loading, error } = usePDFViewer();

  if (error) return <p className="text-red-500">Error loading PDF view</p>;

  return (
    <section className="prose prose-xl w-full max-w-full bg-neutral-400 border border-neutral-800 text-neutral-900 rounded-lg px-10 py-8 shadow-sm space-y-4 text-start font-mono">
      {loading ? (
        <p>Loading...</p>
      ) : MDXComponent ? (
        <MDXComponent />
      ) : (
        <DefaultPDF />
      )}
    </section>
  );
}
