import { useState } from "react";
import { useStoredPDFs } from "../hooks/use-stored-pdfs";
import { CurrentPDF } from "../utils/types";
import { MenuIcon } from "lucide-react";

export function PDFmenu() {
  const { data: pdfs } = useStoredPDFs();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-5 right-5  z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-neutral-900 border-neutral-800 rounded border  hover:bg-neutral-800">
        <MenuIcon />
      </button>

      <ul
        className={`absolute right-0 mt-2 p-3 min-w-[350px] max-h-[60vh] bg-neutral-950 border-neutral-800 border rounded-md
        overflow-y-auto 
        transition-opacity duration-200 no-scrollbar
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {pdfs.length === 0 ? (
          <span>No PDFs stored yet.</span>
        ) : (
          <li className="space-y-3">
            {pdfs.map((pdf) => (
              <PDFItem key={pdf.id} pdf={pdf} />
            ))}
          </li>
        )}
      </ul>
    </nav>
  );
}

const PDFItem = ({ pdf }: { pdf: CurrentPDF }) => (
  <>
    <h2 className="font-bold">{pdf.name}</h2>
    <p className="text-xs text-neutral-400">{pdf.time}</p>
  </>
);
