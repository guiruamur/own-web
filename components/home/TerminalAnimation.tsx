"use client";

import { useEffect, useRef } from "react";

// Typing-terminal animation ported from the Stitch "Terminal Animado Extendido v2"
// screen. Types out a developer profile / build sequence line by line, on loop.
const CODE_LINES = [
  "> npm init ruanodev-portfolio@latest",
  "// Initializing development environment...",
  "// Loading core modules: [React, TypeScript, Node.js, TailwindCSS]",
  "",
  "class DeveloperProfile {",
  "  constructor() {",
  '    this.name = "Guillermo Ruano Muriedas";',
  '    this.role = "Full Stack Developer";',
  '    this.location = "Sevilla, Spain";',
  '    this.stack = ["Next.js", "React", "TypeScript", "Docker"];',
  "  }",
  "",
  "  getVision() {",
  '    return "Crafting precise digital experiences with architectural integrity.";',
  "  }",
  "}",
  "",
  "const guillermo = new DeveloperProfile();",
  "console.log(`System Status: ${guillermo.getVision()}`);",
  "",
  "// Applying architectural patterns...",
  "const projects = [",
  '  { id: 1, type: "Local AI signals", status: "running" },',
  '  { id: 2, type: "Time-tracking SaaS", status: "deployed" },',
  '  { id: 3, type: "Windows tooling",   status: "released" }',
  "];",
  "",
  'const live = projects.filter(p => p.status !== "idle");',
  "console.table(live);",
  "",
  "> npm run build",
  "✓ compiling client-side assets...",
  "✓ generating static pages...",
  "✓ optimizing serverless functions...",
  "Build successful. Deployment ready.",
  "",
  "> npm start",
  "Listening on http://localhost:3000",
  "// Connection established. Welcome to ruanodev.com",
];

function lineClass(line: string): string {
  if (line.startsWith(">")) return "mb-1 text-green-400 font-bold";
  if (line.startsWith("//")) return "mb-1 text-slate-500 italic";
  if (line.includes("✓")) return "mb-1 text-emerald-400";
  return "mb-1";
}

export default function TerminalAnimation({ className = "" }: { className?: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const scroller = scrollRef.current;
    if (!content || !scroller) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lineIndex = 0;
    let charIndex = 0;
    let timer = 0;
    let running = false;

    const appendLine = (line: string) => {
      const div = document.createElement("div");
      div.className = lineClass(line);
      content.appendChild(div);
      return div;
    };

    const renderStatic = () => {
      content.replaceChildren();
      for (const line of CODE_LINES) appendLine(line).textContent = line;
      scroller.scrollTop = scroller.scrollHeight;
    };

    const type = () => {
      if (!running) return;
      if (lineIndex < CODE_LINES.length) {
        const line = CODE_LINES[lineIndex];
        if (charIndex === 0) appendLine(line);
        const current = content.lastChild as HTMLElement | null;
        if (current && charIndex < line.length) {
          current.textContent += line[charIndex];
          charIndex++;
          const speed = line.startsWith(">") ? 80 : 30;
          timer = window.setTimeout(type, Math.random() * speed + 10);
        } else {
          lineIndex++;
          charIndex = 0;
          scroller.scrollTop = scroller.scrollHeight;
          timer = window.setTimeout(type, 250);
        }
      } else {
        timer = window.setTimeout(() => {
          content.replaceChildren();
          lineIndex = 0;
          charIndex = 0;
          type();
        }, 8000);
      }
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      timer = window.setTimeout(type, 600);
    };
    const stop = () => {
      running = false;
      if (timer) clearTimeout(timer);
      timer = 0;
    };

    if (reduce) {
      renderStatic();
    } else {
      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 },
      );
      io.observe(scroller);
      return () => {
        stop();
        io.disconnect();
      };
    }
  }, []);

  return (
    <div
      className={`flex flex-col rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-2xl p-5 md:p-8 ${className}`}
      aria-hidden
    >
      <div className="flex items-center gap-2 mb-4 border-b border-slate-700/50 pb-3">
        <span className="w-3 h-3 rounded-full bg-red-500/50" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <span className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-4 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium">
          RUANODEV TERMINAL — RUANODEV.COM
        </span>
      </div>
      <div
        ref={scrollRef}
        className="terminal-scroll flex-1 overflow-y-auto text-blue-400 text-sm md:text-base leading-relaxed"
        style={{
          fontFamily: "'Fira Code', var(--font-label), monospace",
          textShadow: "0 0 8px currentColor",
        }}
      >
        <div ref={contentRef} />
        <span className="terminal-cursor" />
      </div>
    </div>
  );
}
