import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const roots = [
  path.join(publicDir, "Creative"),
  path.join(publicDir, "Others"),
];
const outputDir = path.join(publicDir, "Creative", "_generated");
const manifestPath = path.join(outputDir, "gallery-assets.json");
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

const toPublicPath = (filePath) =>
  `/${path.relative(publicDir, filePath).replaceAll(path.sep, "/")}`;

const hashPath = (value) =>
  crypto.createHash("sha1").update(value).digest("hex").slice(0, 14);

const collectImages = (dir, images = []) => {
  if (!fs.existsSync(dir)) return images;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entryPath !== outputDir) collectImages(entryPath, images);
      continue;
    }

    if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      images.push(entryPath);
    }
  }

  return images;
};

fs.mkdirSync(outputDir, { recursive: true });

const manifest = {};
const images = roots.flatMap((root) => collectImages(root));

for (const filePath of images) {
  const src = toPublicPath(filePath);
  const parsed = path.parse(filePath);
  const id = hashPath(src);
  const thumbPath = path.join(outputDir, `${id}.webp`);

  try {
    const source = sharp(filePath, { animated: false });
    const metadata = await source.metadata();
    const width = metadata.width ?? 1;
    const height = metadata.height ?? 1;

    await sharp(filePath, { animated: false })
      .rotate()
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 72, effort: 4 })
      .toFile(thumbPath);

    const blurBuffer = await sharp(filePath, { animated: false })
      .rotate()
      .resize({ width: 24, withoutEnlargement: true })
      .blur(8)
      .webp({ quality: 35, effort: 2 })
      .toBuffer();

    manifest[src] = {
      src,
      width,
      height,
      thumbSrc: toPublicPath(thumbPath),
      blurDataURL: `data:image/webp;base64,${blurBuffer.toString("base64")}`,
    };

    console.log(`generated ${parsed.base}`);
  } catch (error) {
    console.warn(`skipped ${src}: ${error.message}`);
  }
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`wrote ${Object.keys(manifest).length} entries to ${toPublicPath(manifestPath)}`);
