import Hero from "@/components/Hero";
import Page from "@/components/Page";
import ScrollSpy from "@/components/ScrollSpy";
import AboutSection from "@/components/sections/AboutSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import JourneySection from "@/components/sections/JourneySection";
import LifeSection from "@/components/sections/LifeSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

// The whole site is one page: scroll down through the sections (or use the top bar to jump).
export default function Home() {
  return (
    <Page scroll>
      <ScrollSpy />
      <div className="flex flex-col gap-10 pb-4">
        <div id="home">
          <Hero />
        </div>
        <AboutSection />
        <JourneySection />
        <ProjectsSection />
        <BlogSection />
        <LifeSection />
        <ContactSection />
      </div>
    </Page>
  );
}
