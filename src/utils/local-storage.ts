import { CurrentPDF } from "./types";

export async function getCurrentPDF(key: string): Promise<CurrentPDF> {
  const item = window.localStorage.getItem(key);
  if (!item) throw new Error(`No current PDF in localStorage under "${key}"`);

  return JSON.parse(item) as CurrentPDF;
}

export function saveCurrentPDF(key: string, pdf: CurrentPDF) {
  window.localStorage.setItem(key, JSON.stringify(pdf));

  const storedPDFs = getStoredPDFs();

  // check if PDF with same id exists (updating generated audio )
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

export function getStoredPDFs(): CurrentPDF[] {
  const item = window.localStorage.getItem("storedPDFs");
  const storedPDFs = item ? JSON.parse(item) : [];

  return storedPDFs;
}

// localStorage.clear();
