import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp-image-generation",
  generationConfig: {
    responseModalities: ["image", "text"],
  } as any,
});

async function retry(): Promise<void> {
  const prompt = "Professional restaurant wood-fired oven with flames visible, commercial kitchen setting in Australia, hardwood logs stacked nearby, busy professional atmosphere, photorealistic style, warm professional lighting";
  const outputPath = "/Users/matthewsweet/Sites/Clients/quickfire-firewood/outputs/quickfire-firewood/astro-site/public/images/blog/commercial-kitchen-wood.webp";

  console.log("Retrying commercial-kitchen-wood generation...");

  try {
    const response = await model.generateContent([{ text: prompt }]);

    const candidate = response.response.candidates?.[0];
    if (!candidate?.content?.parts) {
      console.error("ERROR: No content received");
      return;
    }

    for (const part of candidate.content.parts) {
      if ((part as any).inlineData?.data) {
        fs.writeFileSync(outputPath, Buffer.from((part as any).inlineData.data, "base64"));
        const stats = fs.statSync(outputPath);
        console.log(`SUCCESS: Generated commercial-kitchen-wood.webp (${(stats.size / 1024).toFixed(1)} KB)`);
        return;
      }
    }

    console.error("ERROR: No image data in response");
  } catch (error: any) {
    console.error("ERROR:", error.message || error);
  }
}

retry();
