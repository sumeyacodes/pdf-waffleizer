import textToSpeech, { protos } from "@google-cloud/text-to-speech";
import { Request, Response } from "express";

const client = new textToSpeech.TextToSpeechClient();

export async function generateAudio(req: Request, res: Response) {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "No text provided" });
      return;
    }

    console.log(`Processing text of length: ${text.length} characters`);

    // needed for tts to read fluently
    const escapeXml = (unsafe: string) =>
      unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

    const paragraphs = text.split(/\n\s*\n/);
    const ssml = `<speak>${paragraphs
      .map((p: string) => `<p>${escapeXml(p)}</p>`)
      .join("")}</speak>`;

    const request = {
      input: { ssml },
      voice: {
        languageCode: "en-US",
        name: "en-US-Studio-O",
      },
      audioConfig: {
        audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3,
      },
    };

    const [response] = await client.synthesizeSpeech(request);
    if (!response.audioContent) {
      console.error("No audio content returned from Google TTS");
      res.status(500).json({ error: "No audio returned from service" });
      return;
    }

    // return audio as MP3 file
    res.setHeader("Content-Type", "audio/mp3");
    res.send(Buffer.from(response.audioContent));
    console.log(
      "Audio successfully generated, size:",
      response.audioContent.length
    );
  } catch (err) {
    console.error(
      "TTS error:",
      err instanceof Error ? err.message : String(err)
    );

    res.status(500).json({
      error: "TTS failed",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
