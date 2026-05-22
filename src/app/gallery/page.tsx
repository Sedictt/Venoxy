import CreativeGallery from "@/components/CreativeGallery";
import { getDynamicCreativeItems } from "@/lib/creative";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Gallery — Venoxy Arts",
  description: "A showcase of photography, graphic design, and artistic visuals crafted by Venoxy.",
};

export default function GalleryPage() {
  const creativeItems = getDynamicCreativeItems();

  return (
    <SmoothScroll>
      {/* Custom Mouse Cursor element for design consistency */}
      <CustomCursor />

      {/* Primary Visual Outlet */}
      <main className="flex-grow w-full flex flex-col items-center relative z-10">
        <CreativeGallery initialItems={creativeItems} />
      </main>

      {/* Styled Footer */}
      <Footer />
    </SmoothScroll>
  );
}
