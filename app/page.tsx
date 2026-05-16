import type { Metadata } from "next";
import { personal } from "@/data/personal";
import Reveal from "@/components/Reveal";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ExperiencePreview from "@/components/home/ExperiencePreview";
import StackPreview from "@/components/home/StackPreview";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import ContactCTA from "@/components/ui/ContactCTA";

export const metadata: Metadata = {
  title:       personal.seoTitle,
  description: personal.seoDescription,
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Reveal><AboutPreview /></Reveal>
      <Reveal><ExperiencePreview /></Reveal>
      <Reveal><StackPreview /></Reveal>
      <Reveal><ProjectsPreview /></Reveal>
      <Reveal><ContactCTA variant="solid" /></Reveal>
    </main>
  );
}
