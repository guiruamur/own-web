import type { Metadata } from "next";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title:       personal.seoTitle,
  description: personal.seoDescription,
};

export default function HomePage() {
  return (
    <main className="pt-24 min-h-screen">
      {/* Inicio en construcción — se completará en Task 7 */}
    </main>
  );
}
