const baseUrl = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT = `${baseUrl}/tts`;

export async function generateAudio(text: string): Promise<Blob> {
  try {

    // send the text to the server
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`TTS request failed: ${response.statusText}`);
    }

    console.log("📬 response status:", response.status, response.ok);

    // audio content is returned as blob
    // idek what blob is
    return await response.blob();
  } catch (error) {
    console.error("❌ generateAudio failed:", error);
    throw error;
  }
}
