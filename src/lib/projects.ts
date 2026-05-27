import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  role: string;
  year: string;
  tags: string[];
  link: string;
  color: string;
  thumbnail: string;
  images: string[];
  isThumbnailPortrait: boolean;
}

export function getDynamicProjects(): ProjectData[] {
  const projectsDir = path.join(process.cwd(), "public", "Projects");
  
  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  try {
    const items = fs.readdirSync(projectsDir);
    const projects: ProjectData[] = [];

    for (const item of items) {
      const itemPath = path.join(projectsDir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        const files = fs.readdirSync(itemPath);
        
        // 1. Detect live link from link.text or link.txt
        let link = "#";
        const linkFile = files.find(f => f.toLowerCase() === "link.text" || f.toLowerCase() === "link.txt");
        if (linkFile) {
          try {
            link = fs.readFileSync(path.join(itemPath, linkFile), "utf-8").trim();
          } catch (e) {
            console.error(`Failed to read link file in ${item}:`, e);
          }
        }

        // 2. Identify all image files in this folder
        const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];
        const imageFiles = files.filter(f => 
          imageExtensions.includes(path.extname(f).toLowerCase())
        );

        if (imageFiles.length === 0) {
          continue; // Skip folders that have no images
        }

        // 3. Find the main thumbnail image (contains 'banner' as name, regardless of extension)
        let mainImageFile = imageFiles.find(f => {
          const nameWithoutExt = path.parse(f).name.toLowerCase();
          return nameWithoutExt === "banner";
        });

        // Fallback: if no file named exactly 'banner', look for 'main'
        if (!mainImageFile) {
          mainImageFile = imageFiles.find(f => {
            const nameWithoutExt = path.parse(f).name.toLowerCase();
            return nameWithoutExt === "main";
          });
        }

        // Fallback: if still no file, grab the first image
        if (!mainImageFile) {
          mainImageFile = imageFiles[0];
        }

        // Construct URLs relative to the public directory
        const thumbnail = `/Projects/${item}/${mainImageFile}`;

        // 4. Compile all screenshots (ensuring the main image is the first one in the list)
        const otherImages = imageFiles.filter(f => f !== mainImageFile);
        const images = [
          thumbnail,
          ...otherImages.map(f => `/Projects/${item}/${f}`)
        ];

        // 5. Read project metadata or use smart fallback files/defaults
        const readMetadataFile = (filename: string, defaultValue: string): string => {
          const file = files.find(f => f.toLowerCase() === filename.toLowerCase());
          if (file) {
            try {
              return fs.readFileSync(path.join(itemPath, file), "utf-8").trim();
            } catch (e) {
              console.error(`Failed to read ${filename} in ${item}:`, e);
            }
          }
          return defaultValue;
        };

        // Title capitalization fallback
        const capitalizedTitle = item.charAt(0).toUpperCase() + item.slice(1);
        const title = readMetadataFile("title.txt", capitalizedTitle);

        const description = readMetadataFile("description.txt", "A custom dynamic side project.");
        const longDescription = readMetadataFile("longDescription.txt", "A detailed, creative exploration building and refining high-quality tools to expand frontend, backend, and interface design skills.");
        const role = readMetadataFile("role.txt", "Full Stack Developer");
        const year = readMetadataFile("year.txt", "2024");
        const color = readMetadataFile("color.txt", "#9EA76B");

        const tagsRaw = readMetadataFile("tags.txt", "React, TypeScript, Next.js");
        const tags = tagsRaw.split(",").map(t => t.trim()).filter(t => t.length > 0);

        // 6. Detect if the main thumbnail image is portrait or landscape
        let isThumbnailPortrait = false;
        try {
          const mainImagePath = path.join(itemPath, mainImageFile);
          const dimensions = imageSize(fs.readFileSync(mainImagePath));
          if (dimensions.width && dimensions.height) {
            isThumbnailPortrait = dimensions.height > dimensions.width;
          }
        } catch (e) {
          console.error(`Failed to get dimensions for ${mainImageFile} in ${item}:`, e);
        }

        projects.push({
          id: item,
          title,
          description,
          longDescription,
          role,
          year,
          tags,
          link,
          color,
          thumbnail,
          images,
          isThumbnailPortrait
        });
      }
    }
    // Sort projects according to the requested order: iReside, Ouria (Mobile), ItsOurStudio, librowse
    const preferredOrder = ["iReside", "Ouria (Mobile)", "ItsOurStudio", "librowse"];
    projects.sort((a, b) => {
      const indexA = preferredOrder.findIndex(id => id.toLowerCase() === a.id.toLowerCase());
      const indexB = preferredOrder.findIndex(id => id.toLowerCase() === b.id.toLowerCase());
      
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      
      return indexA - indexB;
    });

    return projects;
  } catch (error) {
    console.error("Error reading projects directory:", error);
    return [];
  }
}
