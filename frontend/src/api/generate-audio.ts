const url = "http://localhost:8880/v1/audio/speech";

export async function generateAudio(text: string): Promise<Blob> {
  try {
    console.log("📤 generating audio");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "kokoro",
        input: text,
        voice: "af_heart",
        response_format: "mp3",
        download_format: "mp3",
        stream: false,
        return_download_link: true,
      }),
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
