import { CurrentPDF } from "../utils/types";

const ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/scrape/file`;

export async function scrapeFile(file: File): Promise<CurrentPDF> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    console.log(`📨 Sending PDF to ${ENDPOINT}`);

    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    console.log(`✅ Successfully processed PDF (${response.status})`);
    return (await response.json()) as CurrentPDF;
  } catch (error) {
    console.error("❌ PDF upload failed:", error);
    throw new Error(`❌ scripeFile API failed: ${error}`);
  }
}
