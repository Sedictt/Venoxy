import { file } from "bun";
import fs from "fs";
import path from "path";

// Define the creative gallery root directory
const CREATIVE_DIR = path.join(process.cwd(), "public", "Creative");
const MAX_DIMENSION = 1600; // Web-friendly ceiling for max visual scale
const WEBP_QUALITY = 85;    // High-fidelity optimized quality

console.log("🎨 \x1b[36mVenoxy Image Optimization Pipeline (Bun.Image)\x1b[0m");
console.log("====================================================");

if (!fs.existsSync(CREATIVE_DIR)) {
  console.error(`\x1b[31mError: Creative directory not found at: ${CREATIVE_DIR}\x1b[0m`);
  process.exit(1);
}

// Allowed visual formats to scan
const SOURCE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".tiff", ".gif"];

async function optimizeImages() {
  let totalFilesProcessed = 0;
  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;

  try {
    const folders = fs.readdirSync(CREATIVE_DIR);

    for (const folder of folders) {
      const folderPath = path.join(CREATIVE_DIR, folder);
      const stat = fs.statSync(folderPath);

      if (!stat.isDirectory()) continue;

      console.log(`\n📂 Scanning folder: \x1b[33m${folder}\x1b[0m...`);
      const files = fs.readdirSync(folderPath);

      for (const fileName of files) {
        const ext = path.extname(fileName).toLowerCase();
        if (!SOURCE_EXTENSIONS.includes(ext)) continue;

        const filePath = path.join(folderPath, fileName);
        const fileStat = fs.statSync(filePath);
        const originalBytes = fileStat.size;

        // Skip empty files
        if (originalBytes === 0) continue;

        const baseName = path.parse(fileName).name;
        const outputExt = ".webp";
        const outputName = `${baseName}${outputExt}`;
        const outputPath = path.join(folderPath, outputName);

        console.log(`\n   📄 Processing: \x1b[32m${fileName}\x1b[0m (${(originalBytes / 1024).toFixed(1)} KB)`);

        try {
          // Initialize Bun.Image pipeline
          const bunFile = file(filePath);
          const imagePipeline = bunFile.image();

          // 1. Fetch metadata without fully decoding the pixel buffer (fast check)
          const meta = await imagePipeline.metadata();
          console.log(`      Dimensions: ${meta.width}x${meta.height} (${meta.format})`);

          let pipeline = imagePipeline;
          let resized = false;

          // 2. Downscale if image exceeds standard web boundaries
          if (meta.width > MAX_DIMENSION || meta.height > MAX_DIMENSION) {
            console.log(`      ⚠️  Oversized image. Downscaling to fit within ${MAX_DIMENSION}px...`);
            pipeline = pipeline.resize(MAX_DIMENSION, MAX_DIMENSION, {
              fit: "inside",
              withoutEnlargement: true,
              filter: "lanczos3" // Best photograph resampling kernel
            });
            resized = true;
          }

          // 3. Chain WebP compression configuration
          pipeline = pipeline.webp({ quality: WEBP_QUALITY });

          // 4. Await terminal method to execute the off-thread SIMD pipeline
          const bytesWritten = await pipeline.write(outputPath);

          totalFilesProcessed++;
          totalOriginalBytes += originalBytes;
          totalOptimizedBytes += bytesWritten;

          const savedBytes = originalBytes - bytesWritten;
          const savedPercentage = ((savedBytes / originalBytes) * 100).toFixed(1);

          if (ext !== outputExt) {
            // Delete original non-webp file to save disk space
            fs.unlinkSync(filePath);
            console.log(`      ✅ Converted & Optimized -> \x1b[36m${outputName}\x1b[0m (${(bytesWritten / 1024).toFixed(1)} KB)`);
            console.log(`      💾 Saved: \x1b[35m${(savedBytes / 1024).toFixed(1)} KB (${savedPercentage}% smaller)\x1b[0m`);
          } else if (resized) {
            console.log(`      ✅ Resized Large WebP (${(bytesWritten / 1024).toFixed(1)} KB)`);
            console.log(`      💾 Saved: \x1b[35m${(savedBytes / 1024).toFixed(1)} KB (${savedPercentage}% smaller)\x1b[0m`);
          } else {
            console.log(`      ℹ️  WebP is already optimized.`);
          }

        } catch (err) {
          console.error(`      ❌ Error processing image ${fileName}:`, err);
        }
      }
    }

    console.log("\n====================================================");
    console.log("📊 \x1b[36mOptimization Summary\x1b[0m");
    console.log("====================================================");
    console.log(`✨ Total Files Processed: ${totalFilesProcessed}`);
    console.log(`📦 Original Size:        ${(totalOriginalBytes / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`⚡ Optimized Size:       ${(totalOptimizedBytes / (1024 * 1024)).toFixed(2)} MB`);

    const netSaved = totalOriginalBytes - totalOptimizedBytes;
    if (netSaved > 0) {
      const netPercent = ((netSaved / totalOriginalBytes) * 100).toFixed(1);
      console.log(`🎉 Net Disk Space Saved: \x1b[32m${(netSaved / (1024 * 1024)).toFixed(2)} MB (${netPercent}% smaller)\x1b[0m`);
    } else {
      console.log(`ℹ️  No disk savings (all assets are already highly optimized!).`);
    }

  } catch (error) {
    console.error("\x1b[31mCritical script failure:\x1b[0m", error);
  }
}

optimizeImages();
