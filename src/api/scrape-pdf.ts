import { ScrapedPDF } from "../types/pdf";

// Read the base URL from Vite's environment variables
// VITE_ prefix is important for Vite to expose it to the client-side code
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ENDPOINT = `${baseUrl}/scrape/file`;

export async function scrapeFile(file: File): Promise<ScrapedPDF> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    for (const [key, value] of formData.entries()) {
      console.log("📦 formdata entry:", key, value);
    }
    console.log("📦 formdata:", formData);

    console.log(`🚀 Sending POST request to: ${ENDPOINT}`);

    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: formData,
    });

    console.log("📬 response status:", response.status, response.ok);
    console.log("successfully sent to server at endpoint", ENDPOINT);
    console.log("📬 response:", response, typeof response);

    if (!response.ok) throw new Error(`server ${response.status}`);

    const data = await response.json();

    return { markdown: data.markdown, text: data.text };
  } catch (error) {
    console.error("❌ scrapeFile failed:", error);
    throw error;
  }
}
