import fs from "fs";
import path from "path";
import sizeOf from "image-size";

export interface CreativeItem {
  id: string;
  src: string;
  title: string;
  category: "photography" | "design" | "traditional" | "digital" | "others";
  description: string;
  details: string;
  aspectRatio: number;
}

export function getDynamicCreativeItems(): CreativeItem[] {
  const creativeDir = path.join(process.cwd(), "public", "Creative");
  const items: CreativeItem[] = [];

  if (!fs.existsSync(creativeDir)) {
    return [];
  }

  try {
    const categories: ("photography" | "design" | "traditional" | "digital" | "others")[] = ["photography", "design", "traditional", "digital", "others"];

    for (const category of categories) {
      // Look inside public/Creative folders
      const folderName = 
        category === "photography" ? "Photography" :
        category === "design" ? "Design" :
        category === "traditional" ? "Traditional" :
        category === "digital" ? "Digital" : "Others";
      let folderPath = path.join(creativeDir, folderName);

      // Support fallback if 'Others' is directly in public/Others
      if (!fs.existsSync(folderPath) && category === "others") {
        folderPath = path.join(process.cwd(), "public", "Others");
      }

      if (!fs.existsSync(folderPath)) {
        continue;
      }

      const files = fs.readdirSync(folderPath);
      const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];

      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!imageExtensions.includes(ext)) {
          continue; // Skip metadata text files or others
        }

        const baseName = path.parse(file).name;
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
          // 1. Image URL relative to public directory
          const src = folderPath.includes("Creative")
            ? `/Creative/${folderName}/${file}`
            : `/Others/${file}`;

          // 2. Custom Title generation: Capitalize and replace hyphens/underscores with spaces
          let title = baseName
            .replace(/^[-_]+|[-_]+$/g, "")
            .replace(/[-_]+/g, " ");
          title = title.split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          // 3. Metadata extraction (check for baseName.txt companion file)
          let description = "A beautiful visual exploration of texture, layout, and lighting.";
          let details = 
            category === "photography" ? "Camera Photograph" :
            category === "design" ? "Digital Graphic Art" :
            category === "traditional" ? "Traditional Hand-crafted Art" :
            category === "digital" ? "Digital Visual Art" : "Other Visual Art";

          const companionTxt = files.find(f => f.toLowerCase() === `${baseName.toLowerCase()}.txt`);
          if (companionTxt) {
            try {
              const txtContent = fs.readFileSync(path.join(folderPath, companionTxt), "utf-8");
              const lines = txtContent.split("\n").map(l => l.trim()).filter(l => l.length > 0);
              if (lines.length > 0) {
                description = lines[0];
              }
              if (lines.length > 1) {
                details = lines[1];
              }
            } catch (err) {
              console.error(`Failed to read metadata for creative item ${baseName}:`, err);
            }
          }

          let aspectRatio = 1;
          try {
            const buffer = fs.readFileSync(filePath);
            const dimensions = sizeOf(buffer);
            if (dimensions && dimensions.width && dimensions.height) {
              aspectRatio = dimensions.height / dimensions.width;
            }
          } catch (err) {
            console.error(`Failed to get dimensions for ${filePath}:`, err);
          }

          items.push({
            id: `${category}_${baseName}`,
            src,
            title,
            category,
            description,
            details,
            aspectRatio
          });
        }
      }
    }

    return items;
  } catch (error) {
    console.error("Error scanning creative directory:", error);
    return [];
  }
}
