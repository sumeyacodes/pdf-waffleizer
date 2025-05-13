import { Router } from "express";
import textToSpeech, { protos } from "@google-cloud/text-to-speech";

const router = Router();

const client = new textToSpeech.TextToSpeechClient();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ error: "No text provided" });
      return;
    }

    console.log(`Processing text of length: ${text.length} characters`);

    const request = {
      input: { text },
      voice: {
        languageCode: "en-US",
        ssmlGender: protos.google.cloud.texttospeech.v1.SsmlVoiceGender.NEUTRAL,
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
});

export default router;
