import { Router } from "express";
import bodyParser from "body-parser";
import textToSpeech, { protos } from "@google-cloud/text-to-speech";

const router = Router();
router.use(bodyParser.json());

const client = new textToSpeech.TextToSpeechClient();

router.post("/", async (req, res) => {
  const { text } = req.body;
  try {
    const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
      {
        input: { text },
        voice: {
          languageCode: "en-US",
          ssmlGender:
            protos.google.cloud.texttospeech.v1.SsmlVoiceGender.NEUTRAL,
        },
        audioConfig: {
          audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3,
        },
      };

    const [response] = await client.synthesizeSpeech(request);
    if (!response.audioContent) {
      res.status(500).json({ error: "No audio returned" });
      return;
    }

    res.setHeader("Content-Type", "audio/mp3");
    // send raw binary
    res.send(Buffer.from(response.audioContent));

    console.log(response, response);
  } catch (err) {
    console.error("TTS error:", err);
    res.status(500).json({ error: "TTS failed" });
  }
});

export default router;
