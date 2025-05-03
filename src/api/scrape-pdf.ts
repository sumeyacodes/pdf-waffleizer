// Read the base URL from Vite's environment variables
// VITE_ prefix is important for Vite to expose it to the client-side code
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ENDPOINT = `${baseUrl}/scrape/file`;

export async function scrapeFile(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    for (const [key, value] of formData.entries()) {
      console.log("📦 formdata entry:", key, value);
    }

    // Add this log to be 100% sure about the endpoint URL
    console.log(`🚀 Making fetch POST request to: ${ENDPOINT}`);

    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: formData,
    });

    console.log("⏳ calling endpoint:", ENDPOINT);
    console.log("📬 response status:", response.status, response.ok);
    console.log("successfully sent to server at endpoint", ENDPOINT);

    if (!response.ok) throw new Error(`server ${response.status}`);
    console.log("✅ response:", response);
    return await response.json();
  } catch (error) {
    console.error("❌ scrapeFile failed:", error);
    throw error;
  }
}
