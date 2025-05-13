const baseUrl = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT = `${baseUrl}/tts`;

export async function generateAudio(text: string): Promise<Blob> {
  try {
    // Limit the text to first 1000 characters to prevent payload too large errors
    const textChunk = text.substring(0, 1000);
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: textChunk }),
    });

    if (!response.ok) {
      throw new Error(`TTS request failed: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("❌ generateAudio API failed:", error);
    throw new Error(`❌ generateAuido API failed: ${error}`);
  }
}
