import { PDF } from "./types";

export async function getCurrentPDF(key: string): Promise<PDF> {
  const item = window.localStorage.getItem(key);
  if (!item) throw new Error(`No current PDF in localStorage under "${key}"`);
  return JSON.parse(item) as PDF;
}

export function getStoredPDFs(): PDF[] {
  const item = window.localStorage.getItem("storedPDFs");
  const storedPDFs = item ? JSON.parse(item) : [];
  return storedPDFs;
}

export function deletePDF(key: string, pdfToDelete: PDF) {
  const storedPDFs = getStoredPDFs();
  const updatedPDFs = storedPDFs.filter((pdf) => pdf.id !== pdfToDelete.id);
  localStorage.setItem(key, JSON.stringify(updatedPDFs));
  return updatedPDFs;
}

export function saveCurrentPDF(key: string, pdf: PDF) {
  window.localStorage.setItem(key, JSON.stringify(pdf));
  const storedPDFs = getStoredPDFs();
  // check if PDF with same id exists (updating generated audio)
  const existingIndex = storedPDFs.findIndex(
    (existingPdf) => existingPdf.id === pdf.id
  );

  if (existingIndex >= 0) {
    storedPDFs[existingIndex] = pdf;
  } else {
    storedPDFs.push(pdf);
  }

  window.localStorage.setItem("storedPDFs", JSON.stringify(storedPDFs));
}
