import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

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

interface ImagePrompt {
  slug: string;
  prompt: string;
}

const DELAY_MS = 3000; // 3 seconds between API calls for rate limiting

const BLOG_IMAGE_PROMPTS: ImagePrompt[] = [
  {
    slug: "choosing-firewood-pizza-oven",
    prompt: "Close-up of premium ironbark hardwood logs stacked next to a wood-fired pizza oven in Australian backyard, warm golden lighting, detailed wood grain texture visible, outdoor entertaining area, photorealistic style, natural warm tones"
  },
  {
    slug: "preparing-fireplace-winter",
    prompt: "Cosy Australian living room with lit fireplace and neatly stacked firewood nearby, warm interior lighting, comfortable family home setting, winter evening ambiance, photorealistic style, inviting warm atmosphere"
  },
  {
    slug: "smoking-brisket-hardwood",
    prompt: "Offset BBQ smoker with wisps of smoke rising, hardwood chunks and logs visible beside the smoker, Australian backyard setting with green lawn, outdoor cooking scene, photorealistic style, warm natural daylight"
  },
  {
    slug: "fire-pit-safety-tips",
    prompt: "Safe fire pit setup in Australian backyard with proper clearance from vegetation, evening twilight ambiance, family-friendly outdoor space, safety-conscious arrangement with stone surround, photorealistic style, warm inviting glow"
  },
  {
    slug: "ironbark-hardwood-comparison",
    prompt: "Cross-section of split ironbark hardwood logs showing dense grain patterns and rich red-brown colour, natural outdoor setting, detailed wood texture visible, premium quality firewood display, photorealistic style, natural lighting"
  },
  {
    slug: "wood-fired-pizza-beginners",
    prompt: "Wood-fired pizza oven with visible flames inside, pizza being prepared on wooden paddle, Australian outdoor kitchen setting, hardwood burning brightly, home entertaining area, photorealistic style, warm evening lighting"
  },
  {
    slug: "storing-firewood-queensland",
    prompt: "Properly stacked seasoned firewood under protective cover in Queensland backyard, lush green tropical backdrop, organised woodpile with good airflow, Australian subtropical setting, photorealistic style, natural daylight"
  },
  {
    slug: "low-slow-bbq-hardwood",
    prompt: "Offset smoker with brisket cooking low and slow, stack of hardwood logs nearby, Australian backyard BBQ setup, smoke wisping from chimney, outdoor cooking scene, photorealistic style, warm afternoon lighting"
  },
  {
    slug: "fire-pit-ambiance",
    prompt: "Evening fire pit scene with warm orange glow, comfortable outdoor seating arrangement, Australian garden setting with native plants, relaxing ambiance, gathering space, photorealistic style, twilight atmosphere"
  },
  {
    slug: "seasoned-firewood-quality",
    prompt: "Split seasoned hardwood firewood showing dry cracked ends and quality texture, professional firewood delivery quality, clean cut logs, natural outdoor setting, photorealistic style, clear natural lighting"
  },
  {
    slug: "commercial-kitchen-wood",
    prompt: "Professional restaurant wood-fired oven or grill with flames, commercial kitchen setting in Australia, chef working, hardwood logs stacked nearby, busy kitchen atmosphere, photorealistic style, warm professional lighting"
  },
  {
    slug: "sustainable-firewood-australia",
    prompt: "Australian bushland scene with responsibly managed timber harvest area, eucalyptus forest, sustainable forestry practices, environmental focus, native Australian landscape, photorealistic style, natural daylight, conservation theme"
  }
];

const OUTPUT_DIR = "/Users/matthewsweet/Sites/Clients/quickfire-firewood/outputs/quickfire-firewood/astro-site/public/images/blog";

async function generateImage(slug: string, prompt: string): Promise<boolean> {
  const filepath = path.join(OUTPUT_DIR, `${slug}.webp`);

  // Skip if already exists
  if (fs.existsSync(filepath)) {
    console.log(`[SKIP] ${slug}.webp already exists`);
    return true;
  }

  try {
    console.log(`[GENERATING] ${slug}...`);
    const response = await model.generateContent([{ text: prompt }]);

    const candidate = response.response.candidates?.[0];
    if (!candidate?.content?.parts) {
      console.error(`[ERROR] No content received for ${slug}`);
      return false;
    }

    // Find the image part in the response
    for (const part of candidate.content.parts) {
      if ((part as any).inlineData?.data) {
        const imageData = (part as any).inlineData.data;
        fs.writeFileSync(filepath, Buffer.from(imageData, "base64"));
        console.log(`[SUCCESS] Generated ${slug}.webp`);
        return true;
      }
    }

    console.error(`[ERROR] No image data in response for ${slug}`);
    return false;
  } catch (error: any) {
    console.error(`[ERROR] Failed to generate ${slug}:`, error.message || error);
    return false;
  }
}

async function main(): Promise<void> {
  console.log("===========================================");
  console.log("Quickfire Firewood Blog Image Generation");
  console.log("===========================================\n");
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Total images to generate: ${BLOG_IMAGE_PROMPTS.length}\n`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = { success: 0, failed: 0, skipped: 0 };

  for (let i = 0; i < BLOG_IMAGE_PROMPTS.length; i++) {
    const { slug, prompt } = BLOG_IMAGE_PROMPTS[i];
    const filepath = path.join(OUTPUT_DIR, `${slug}.webp`);

    console.log(`\n[${i + 1}/${BLOG_IMAGE_PROMPTS.length}] Processing: ${slug}`);

    if (fs.existsSync(filepath)) {
      results.skipped++;
      console.log(`[SKIP] Already exists`);
      continue;
    }

    const success = await generateImage(slug, prompt);
    if (success) {
      results.success++;
    } else {
      results.failed++;
    }

    // Rate limiting delay (except for last item)
    if (i < BLOG_IMAGE_PROMPTS.length - 1) {
      console.log(`[WAIT] Pausing ${DELAY_MS / 1000}s for rate limiting...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  }

  console.log("\n===========================================");
  console.log("Generation Complete");
  console.log("===========================================");
  console.log(`Success: ${results.success}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Skipped: ${results.skipped}`);
  console.log(`Total: ${BLOG_IMAGE_PROMPTS.length}`);
  console.log("===========================================\n");

  // List generated files
  console.log("Generated files:");
  const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith(".webp"));
  files.forEach(f => {
    const stats = fs.statSync(path.join(OUTPUT_DIR, f));
    console.log(`  - ${f} (${(stats.size / 1024).toFixed(1)} KB)`);
  });
}

main().catch(console.error);
