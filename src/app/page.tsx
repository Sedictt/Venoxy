import HomeClient from "@/components/HomeClient";
import { getDynamicProjects } from "@/lib/projects";

export default function Home() {
  const dynamicProjects = getDynamicProjects();

  return <HomeClient initialProjects={dynamicProjects} />;
}

