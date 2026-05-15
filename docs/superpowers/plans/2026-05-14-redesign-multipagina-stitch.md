# Rediseño multipágina con Stitch — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar el portfolio single-page actual a un sitio multipágina de 4 rutas (`/`, `/experiencia`, `/proyectos`, `/contacto`) aplicando el design system "Architectural Precision" de Stitch, tomando como punto de partida la rama `redesign` (con `globals.css`, `layout.tsx`, `Navbar.tsx`, `Footer.tsx`, `Reveal.tsx` ya migrados).

**Architecture:** App Router de Next.js 16 con un layout global que monta `Navbar` y `Footer`. Cuatro `page.tsx` (uno por ruta) renderizan secciones envueltas en `<Reveal>`. Los componentes nuevos se organizan por ruta: `components/ui/` (compartidos), `components/home/`, `components/experiencia/`, `components/proyectos/`, `components/contacto/`. Server components por defecto; client solo donde hace falta interacción (`Navbar` ya, `JobCard` y `ProjectCard` por su acordeón).

**Tech Stack:** Next.js 16.2 (App Router), React 19, TypeScript estricto, Tailwind CSS v4 con tokens en `globals.css` vía `@theme inline`, Material Symbols Outlined (vía `<link>` en layout).

**Verificación:** No hay tests en este proyecto (CLAUDE.md). Cada tarea se verifica con `npx tsc --noEmit` (typecheck rápido) y `npm run lint`; las tareas que tocan rutas terminan con `npm run build` completo. La tarea final hace `npm run dev` y comprobación visual.

**Spec de referencia:** [docs/superpowers/specs/2026-05-14-redesign-multipagina-stitch-design.md](../specs/2026-05-14-redesign-multipagina-stitch-design.md).

---

## Convenciones del proyecto (recordatorio)

- **NO** añadir `Co-Authored-By` en los commits. Es regla absoluta del usuario.
- Tono de mensajes de commit: en español, conciso, explicando el "por qué" más que el "qué".
- CLAUDE.md prohíbe hardcodear strings en componentes: todo va a `data/`.
- Path alias `@/*` resuelve a la raíz del repo.
- Tailwind v4 sin `tailwind.config.js`: los tokens nuevos viven en `app/globals.css` con `@theme inline`. Los utilities a usar:
  - Colores: `text-primary`, `bg-primary-container`, `bg-background`, `bg-background-alt`, `bg-surface-white`, `bg-surface-container`, `bg-surface-container-low`, `bg-surface-container-high`, `bg-surface-container-highest`, `bg-surface-container-lowest`, `text-text-muted`, `text-on-surface`, `border-outline-variant`, `text-on-primary`, `text-on-primary-container`, `bg-primary-fixed`, `text-on-primary-fixed`, `text-primary-fixed-dim`, `bg-secondary-fixed`, `text-secondary`.
  - Fuentes: `font-headline` (Manrope), `font-body` (Inter), `font-label` (JetBrains Mono).
  - Tipografía: `text-headline-xl`, `text-headline-xl-mobile`, `text-headline-lg`, `text-headline-md`, `text-body-lg`, `text-body-md`, `text-label-md`, `text-label-sm`.
  - Spacing: `px-margin-mobile`, `px-margin-desktop`, `gap-gutter`.
  - Ancho máximo: `max-w-[1200px] mx-auto`.
- Layout global (`app/layout.tsx`) ya inyecta `<Navbar />` y `<Footer />`. **Las páginas no deben renderizar su propio Navbar/Footer.** Sí deben dejar `pt-24` o similar para no quedar tapadas por la navbar fija.

---

## Estructura de archivos final

```
app/
  layout.tsx                       (ya existe, sin cambios)
  page.tsx                         (reescribir: Inicio)
  experiencia/page.tsx             (nuevo)
  proyectos/page.tsx               (nuevo)
  contacto/page.tsx                (nuevo)
  globals.css                      (ya existe; limpiar @keyframes fade-up)

components/
  Navbar.tsx                       (ya existe)
  Footer.tsx                       (ya existe)
  Reveal.tsx                       (ya existe)
  ui/
    Icon.tsx
    SectionLabel.tsx
    Tag.tsx
    ContactCTA.tsx
  home/
    Hero.tsx
    AboutPreview.tsx
    ExperiencePreview.tsx
    StackPreview.tsx
    ProjectsPreview.tsx
  experiencia/
    ExperienceTimeline.tsx
    JobCard.tsx                    (client: acordeón)
    JobPhotoLayout.tsx             (helper para jobs con 2 fotos)
    EducationList.tsx
    EduCard.tsx
    LanguagesCard.tsx
  proyectos/
    ProjectCard.tsx                (client: acordeón)
  contacto/
    ContactMethodCard.tsx
    QuoteCard.tsx

data/
  personal.ts, nav.ts              (ya OK)
  about.ts                         (añadir icon a traits)
  experience.ts                    (añadir copy de página de Experiencia)
  skills.ts                        (rehacer languages sin tokens viejos)
  education.ts                     (quitar label numerado; añadir languagesCard)
  projects.ts                      (añadir icon + image? + intro de página; renumerar a 04)
  contact.ts                       (renumerar a 05; añadir quote + pageSubtitle)
```

**Archivos a borrar (Task 2):** `components/Hero.tsx`, `About.tsx`, `Skills.tsx`, `Experience.tsx`, `Education.tsx`, `Projects.tsx`, `Contact.tsx`, y las subcarpetas `components/hero/`, `components/experience/`, `components/projects/` enteras.

---

## Task 1: Verificación de estado inicial

**Files:** ninguno (sólo verificación).

- [ ] **Step 1.1: Confirmar rama y working tree**

Run:
```bash
git status -sb
```
Expected: rama `redesign`, archivos modificados (`app/globals.css`, `app/layout.tsx`, `components/Navbar.tsx`, `data/nav.ts`, `data/personal.ts`) y untracked (`components/Footer.tsx`, `components/Reveal.tsx`, `tempdesign/`, `.vs/`).

- [ ] **Step 1.2: Build de baseline**

Run:
```bash
npm run build
```
Expected: build pasa (los componentes viejos siguen tipando porque sus dependencias todavía existen; Tailwind v4 ignora utilities desconocidas sin error). Si fallara, parar y diagnosticar antes de continuar — no destruir el trabajo en curso.

- [ ] **Step 1.3: Lint de baseline**

Run:
```bash
npm run lint
```
Expected: lint pasa.

**Sin commit en esta tarea.** Es sólo lectura de estado.

---

## Task 2: Borrar el single-page viejo y dejar la base limpia

Toca borrar todos los componentes del single-page y dejar `app/page.tsx` como placeholder mínimo. Después de esta tarea nada en el repo importa lucide-react ni tokens viejos. Construir el sitio nuevo sobre tierra plana es más simple que iterar capas a medio quitar.

**Files:**
- Delete: `components/Hero.tsx`, `components/About.tsx`, `components/Skills.tsx`, `components/Experience.tsx`, `components/Education.tsx`, `components/Projects.tsx`, `components/Contact.tsx`
- Delete (recursive): `components/hero/`, `components/experience/`, `components/projects/`
- Modify: `app/page.tsx` (placeholder mínimo)
- Modify: `app/globals.css` (quitar bloque `@keyframes fade-up`)
- Modify: `package.json` (quitar dependencia `lucide-react`)
- Modify: `.gitignore` (añadir `.vs/`)

- [ ] **Step 2.1: Borrar los componentes del single-page**

Run:
```bash
git rm components/Hero.tsx components/About.tsx components/Skills.tsx components/Experience.tsx components/Education.tsx components/Projects.tsx components/Contact.tsx
git rm -r components/hero components/experience components/projects
```

- [ ] **Step 2.2: Reescribir `app/page.tsx` como placeholder**

Sobreescribir [app/page.tsx](app/page.tsx) con:

```tsx
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
```

- [ ] **Step 2.3: Quitar `@keyframes fade-up` de globals.css**

`Reveal.tsx` anima con utilities de Tailwind (`opacity-0/100`, `translate-y-4/0`, `transition-all`), no necesita la keyframe. Editar [app/globals.css](app/globals.css): borrar el bloque final (líneas 128-132 aprox):

```css
/* scroll-reveal helper (used by components/Reveal.tsx) */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0);    }
}
```

- [ ] **Step 2.4: Quitar lucide-react de package.json**

Editar [package.json](package.json), quitar la línea `"lucide-react": "^1.14.0"` del bloque `dependencies`. Después:

```bash
npm install
```
Expected: el lockfile se actualiza y `node_modules/lucide-react` desaparece.

- [ ] **Step 2.5: Añadir `.vs/` al `.gitignore`**

Editar [.gitignore](.gitignore): añadir al final una sección:

```
# IDE
.vs/
```

- [ ] **Step 2.6: Verificar y commitear**

Run:
```bash
npx tsc --noEmit
npm run lint
npm run build
```
Expected: los tres pasan. El sitio sirve con la home en blanco más la Navbar fija y el Footer del layout.

```bash
git add -A
git commit -m "Vaciar el single-page viejo antes del rediseño multipágina"
```

---

## Task 3: Reestructurar la capa de datos

Renumerar labels de secciones (Inicio queda 01–05 limpio), añadir campos nuevos (`icon` en traits y proyectos, `image?` opcional en proyectos), eliminar tokens viejos del array `languages`, y añadir copy de página para Experiencia / Proyectos / Contacto.

**Files:**
- Modify: `data/about.ts`
- Modify: `data/skills.ts`
- Modify: `data/education.ts`
- Modify: `data/projects.ts`
- Modify: `data/contact.ts`
- Modify: `data/experience.ts`

- [ ] **Step 3.1: `data/about.ts` — añadir `icon` a cada trait**

Reescribir el archivo completo:

```ts
export const aboutSection = {
  label:   "01 · Sobre mí",
  heading: "Un dev con los pies en la tierra",
};

export const aboutContent = {
  paragraphs: [
    "Soy Técnico Informático y Desarrollador Full Stack. Me formé en DAM y desde entonces he podido aplicar mis conocimientos en pequeñas herramientas para mi día a día en el trabajo y en proyectos personales que estoy desarrollando, tanto solo como en equipo.",
    "Conozco la tecnología desde dos ángulos: el del código y el del hardware. Eso me da una perspectiva distinta cuando algo falla o cuando hay que tomar decisiones.",
  ],
  traits: [
    { icon: "rocket_launch", title: "Proactivo",              desc: "No espero a que alguien me diga qué hacer. Busco el siguiente paso." },
    { icon: "groups",        title: "Trabajo en equipo",      desc: "Me adapto rápido a cualquier equipo y contexto de trabajo." },
    { icon: "school",        title: "Aprendizaje continuo",   desc: "Curiosidad natural por nuevas tecnologías. Siempre estudiando." },
    { icon: "psychology",    title: "Orientado a soluciones", desc: "Todo proyecto trae sus imprevistos. Me gusta anticiparlos y resolverlos sin perder el foco." },
  ],
};
```

- [ ] **Step 3.2: `data/skills.ts` — limpiar `languages`**

Reescribir el archivo completo:

```ts
export const skillsSection = {
  label:   "03 · Stack técnico",
  heading: "Con qué trabajo",
};

export const skillGroups = [
  { category: "Backend",               skills: ["Node.js", "TypeScript", "MySQL", "REST APIs"]                     },
  { category: "Mobile",                skills: ["Android", "iOS"]                                                  },
  { category: "Frontend",              skills: ["React", "Next.js", "HTML", "CSS", "Tailwind"]                     },
  { category: "DevOps & Herramientas", skills: ["Docker", "Git", "Postman", "GitHub"]                              },
  { category: "IT & Sistemas",         skills: ["Hardware", "Redes", "Soporte Técnico", "Configuración sistemas"]  },
];

export const languages = [
  { name: "Inglés",   level: "Nivel B2"  },
  { name: "Español",  level: "Nativo"    },
  { name: "Licencia", level: "Permiso B" },
];
```

- [ ] **Step 3.3: `data/education.ts` — quitar el numerado, añadir `languagesCard`**

Reescribir el archivo completo:

```ts
export const educationSection = {
  label:   "Educación",
  heading: "Mi formación",
};

export type EduEntry = {
  period: string;
  title:  string;
  center: string;
  desc:   string;
};

export const edu: EduEntry[] = [
  {
    period: "2022 – 2024",
    title:  "Desarrollo de Aplicaciones Multiplataforma (DAM)",
    center: "Campus Cámara de Comercio",
    desc:   "Ciclo Superior. Programación multiplataforma, bases de datos, desarrollo web y móvil, y sistemas de gestión empresarial.",
  },
  {
    period: "2021",
    title:  "Técnico en Sistemas Microinformáticos y Redes",
    center: "Formación Profesional",
    desc:   "Montaje y mantenimiento de equipos, redes, sistemas operativos y soporte técnico a usuarios.",
  },
];

export const languagesCard = {
  heading: "Idiomas y otros",
  quote:   "La formación no termina con el título. Sigo aprendiendo cada día para estar al día con la tecnología.",
};
```

- [ ] **Step 3.4: `data/projects.ts` — añadir `icon` + `image?` + renumerar a 04 + intro**

Reescribir el archivo completo:

```ts
export const projectsSection = {
  label:   "04 · Proyectos",
  heading: "Lo que he construido",
  intro:   "Una selección de proyectos personales donde aplico nuevas tecnologías y resuelvo problemas reales, desde automatización hasta sistemas de gestión.",
};

export type Project = {
  title:        string;
  objetivo:     string;
  technologies: string[];
  cuerpo:       string[];
  icon:         string;
  image?:       string;
  links?: {
    live?:   string;
    github?: string;
  };
  current?: boolean;
};

export const projects: Project[] = [
  {
    title:    "Portfolio personal — ruanodev.com",
    current:  true,
    icon:     "devices",
    objetivo: "Tener un sitio propio donde demuestre que sigo siendo dev a pesar de mi rol actual como técnico IT, con identidad visual, código mantenible para iterar en el tiempo y total libertad para experimentar.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Vercel"],
    cuerpo: [
      "El portfolio nació de una necesidad concreta: aunque mi puesto actual es de técnico IT, sigo siendo desarrollador y necesitaba un escaparate donde poder enseñarlo. La web no es solo un currículum decorado — es el mejor argumento posible de que sigo escribiendo código y tomando decisiones de diseño.",
      "Construido sobre Next.js 16 con App Router y React 19, todo en TypeScript estricto. El estilo va con Tailwind v4 — sin tailwind.config.js, los tokens del tema viven en globals.css usando la directiva @theme inline. Los componentes que necesitan API del navegador (scroll, useState) van como client components; el resto son server components. Sin sobreingeniería: solo client donde de verdad hace falta.",
      "La paleta es intencional: un azul oscuro saturado (#1E40AF) como acento sobre un fondo claro (#f9f9ff). Manrope para los display, Inter para el cuerpo y JetBrains Mono para los labels — un emparejamiento que da personalidad sin estridencias. Todos los colores y fuentes se usan a través de tokens semánticos (text-primary, bg-background, font-headline, etc.) en lugar de valores raw, así un cambio en un sitio repercute en todo.",
      "Algunos rincones técnicos que me dieron buen rato: el acordeón de Experiencia y Proyectos que anima de forma fluida sin max-height mágicos usando el truco de grid-template-rows: 0fr → 1fr; el scroll-reveal con IntersectionObserver que respeta prefers-reduced-motion; y la migración a multipágina con App Router de Next.js 16, donde cada ruta carga sólo lo que necesita.",
      "El proyecto ha ido ganando definición a base de iteración: la paleta evolucionó hacia tonos más sobrios, los datos pasaron de vivir hardcoded en componentes a estar en /data/ como exports limpios, y la arquitectura saltó de un single-page apilado a un sitio multipágina con secciones dedicadas. La filosofía: cada decisión debe poder defenderse, y si más adelante no se sostiene, se cambia. El portfolio no es un producto terminado, es un proyecto vivo.",
    ],
    links: {
      live: "https://ruanodev.com",
    },
  },
  {
    title:    "Money Farmer",
    icon:     "query_stats",
    objetivo: "Un servicio local que genera señales de criptomonedas combinando un LLM corriendo en tu propia máquina (Ollama) con RAG y memoria de feedback. Todo en local, sin enviar datos a terceros y sin ejecutar órdenes reales: solo análisis y señales.",
    technologies: ["Python", "Ollama", "RAG", "SQLite", "Telegram Bot API"],
    cuerpo: [
      "Money Farmer es un experimento con IA local aplicada a un problema concreto: analizar el mercado cripto de forma continua sin depender de servicios externos de pago ni mandar datos a ninguna parte. El LLM (qwen2.5 vía Ollama) corre en la propia máquina, y un sistema RAG le da contexto de noticias y de su propio histórico de aciertos.",
      "El proceso corre 24/7: cada 15 minutos ejecuta un ciclo de análisis, y las señales con confianza suficiente se envían a un chat de Telegram. Los resultados a 1h, 4h y 24h se miden automáticamente para alimentar las estadísticas de win rate — el sistema se mide contra sus propios aciertos y fallos.",
      "Se controla por completo desde el bot de Telegram: comandos para ver el estado, las últimas señales, las estadísticas, pausar y reanudar el scheduler o comprobar la conectividad de cada subsistema. Toda la persistencia va en SQLite, con backups diarios programados.",
      "El alcance es deliberado: esta fase NO ejecuta operaciones reales, solo genera y entrega señales. Es un sistema en validación, pensado como banco de pruebas para arquitecturas de IA local + RAG aplicadas a un dominio con feedback medible.",
    ],
    links: {
      github: "https://github.com/guiruamur/money-farmer",
    },
  },
  {
    title:    "Driver Manager",
    icon:     "memory",
    objetivo: "Resolver una carencia real del Administrador de Dispositivos de Windows: ver de un vistazo qué driver gobierna cada dispositivo, cuál falla y qué paquetes duplicados se acumulan en el Driver Store. Una herramienta portable, sin instalador, pensada para llevar en un USB.",
    technologies: ["C#", ".NET 8", "WPF", "P/Invoke", "WMI"],
    cuerpo: [
      "Driver Manager nació directamente de mi día a día como técnico IT. El Administrador de Dispositivos de Windows funciona, pero es incómodo para tres cosas concretas: ver qué archivo .inf usa cada dispositivo, identificar de un vistazo qué hardware va bien y qué va mal, y limpiar los paquetes duplicados que se acumulan en el Driver Store (algo típico con drivers de GPU).",
      "La app presenta toda esa información en pestañas filtrables, con un código de color inmediato — verde para lo que funciona, rojo para lo que tiene un problem code, blanco para lo dudoso. Permite instalar drivers desde .inf, .zip o carpeta con drag & drop, y la desinstalación es segura: hace backup del paquete antes de borrarlo, y si el backup falla, aborta la operación.",
      "Por dentro está organizada en tres capas con dependencias hacia abajo: la App (WPF + ViewModels + composition root), el Core (modelos y lógica de dominio pura) y la capa Os (adaptadores a Windows vía P/Invoke y WMI). Cada servicio del sistema operativo está detrás de una interfaz, así el dominio se puede testear con fakes sin necesidad de Windows. Los fallos previsibles se modelan con Result<T> en lugar de excepciones.",
      "Es portable de verdad: no requiere instalador y todos los datos (backups, logs, exports) se guardan junto al ejecutable. Un build script restaura, testea y publica el .exe en un par de minutos.",
    ],
    links: {
      github: "https://github.com/guiruamur/driver-manager",
    },
  },
];
```

- [ ] **Step 3.5: `data/contact.ts` — renumerar a 05, añadir `pageSubtitle` y `quote`**

Reescribir el archivo completo:

```ts
export const contactSection = {
  label:        "05 · Contacto",
  heading:      "¿Hablamos?",
  subtitle:     "Estoy abierto a nuevas oportunidades, proyectos y colaboraciones. No dudes en escribirme.",
  pageSubtitle: "Estoy abierto a nuevas oportunidades, proyectos y colaboraciones. No dudes en escribirme para cualquier consulta o simplemente para conectar.",
  quote:        "Enfoco mi trabajo en la resolución metódica de problemas. Cada mensaje es el inicio de una posible solución robusta.",
};
```

- [ ] **Step 3.6: `data/experience.ts` — añadir copy de la página `/experiencia`**

Editar [data/experience.ts](data/experience.ts): solo cambia el bloque `experienceSection` al principio del archivo. El resto (tipo `Job`, array `jobs`) se mantiene tal cual.

Antes:
```ts
export const experienceSection = {
  label:   "02 · Experiencia",
  heading: "Por donde he pasado",
};
```

Después:
```ts
export const experienceSection = {
  label:       "02 · Experiencia",
  heading:     "Por donde he pasado",
  pageEyebrow: "Trayectoria profesional",
  pageHeading: "Por donde he pasado y lo que he aprendido",
  pageIntro:   "Una visión estructurada de mi evolución técnica, desde el soporte de sistemas hasta el desarrollo full stack y el emprendimiento.",
};
```

- [ ] **Step 3.7: Verificar y commitear**

```bash
npx tsc --noEmit
npm run lint
```
Expected: pasan. (No hay aún consumidores de los campos nuevos; la red de tipos sigue consistente.)

```bash
git add data/
git commit -m "Reestructurar la capa de datos para el rediseño multipágina"
```

---

## Task 4: Componentes UI compartidos (`components/ui/`)

Cuatro componentes reutilizables. Todos son **server components**.

**Files:**
- Create: `components/ui/Icon.tsx`
- Create: `components/ui/SectionLabel.tsx`
- Create: `components/ui/Tag.tsx`
- Create: `components/ui/ContactCTA.tsx`

- [ ] **Step 4.1: `components/ui/Icon.tsx`**

```tsx
type Props = {
  name:       string;
  fill?:      boolean;
  className?: string;
};

export default function Icon({ name, fill = false, className = "" }: Props) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
      aria-hidden
    >
      {name}
    </span>
  );
}
```

- [ ] **Step 4.2: `components/ui/SectionLabel.tsx`**

```tsx
type Props = {
  children:   React.ReactNode;
  line?:      boolean;
  className?: string;
};

export default function SectionLabel({ children, line = false, className = "" }: Props) {
  const label = (
    <span className="font-label text-label-md text-primary uppercase tracking-widest">
      {children}
    </span>
  );

  if (!line) return <div className={className}>{label}</div>;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {label}
      <div className="h-px bg-outline-variant/50 flex-grow" />
    </div>
  );
}
```

- [ ] **Step 4.3: `components/ui/Tag.tsx`**

```tsx
type Props = {
  children:   React.ReactNode;
  className?: string;
};

export default function Tag({ children, className = "" }: Props) {
  return (
    <span className={`inline-block bg-background-alt text-text-muted px-3 py-1 rounded font-label text-label-sm ${className}`}>
      {children}
    </span>
  );
}
```

- [ ] **Step 4.4: `components/ui/ContactCTA.tsx`**

```tsx
import Link from "next/link";
import { personal } from "@/data/personal";
import { contactSection } from "@/data/contact";
import Icon from "./Icon";

type Props = { variant: "solid" | "dotted" };

export default function ContactCTA({ variant }: Props) {
  if (variant === "solid") {
    return (
      <section className="py-24 md:py-32 bg-primary-container text-on-primary">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="font-label text-label-md text-primary-fixed-dim uppercase tracking-widest">
            {contactSection.label}
          </span>
          <h2 className="font-headline text-headline-xl-mobile md:text-headline-xl text-on-primary mt-6 mb-8">
            {contactSection.heading}
          </h2>
          <p className="font-body text-body-lg text-on-primary-container max-w-2xl mx-auto mb-12">
            {contactSection.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="bg-surface-white text-primary px-8 py-4 rounded-xl font-label text-label-md flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <Icon name="mail" /> {personal.email}
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary/20 backdrop-blur-sm border border-primary-fixed-dim/30 text-on-primary px-8 py-4 rounded-xl font-label text-label-md flex items-center gap-3 hover:bg-primary/40 transition-all"
            >
              <Icon name="link" /> LinkedIn
            </a>
          </div>
        </div>
      </section>
    );
  }

  // dotted variant
  return (
    <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
      <div className="bg-surface-container-highest rounded-2xl p-8 md:p-12 text-center border border-outline-variant/30 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#00288e 1px, transparent 1px)",
            backgroundSize:  "20px 20px",
          }}
        />
        <h2 className="font-headline text-headline-lg mb-4 relative">¿Hablamos de tu próximo proyecto?</h2>
        <p className="text-text-muted text-body-lg mb-8 max-w-xl mx-auto relative">
          {contactSection.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
          <a
            href={`mailto:${personal.email}`}
            className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label text-label-md flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform"
          >
            <Icon name="mail" /> {personal.email}
          </a>
          <Link
            href="/contacto"
            className="bg-surface-white border border-outline-variant text-on-surface px-8 py-3 rounded-lg font-label text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
          >
            <Icon name="arrow_forward" /> Ir a contacto
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4.5: Verificar y commitear**

```bash
npx tsc --noEmit
npm run lint
```
Expected: ambos pasan.

```bash
git add components/ui
git commit -m "Añadir componentes UI compartidos (Icon, SectionLabel, Tag, ContactCTA)"
```

---

## Task 5: Hero de Inicio (`components/home/Hero.tsx`)

Server component (no necesita estado ni efectos: el badge "Disponible" es CSS puro con `animate-pulse`). La foto de perfil va dentro de un cuadro `aspect-square` con un marco decorativo desplazado.

**Files:**
- Create: `components/home/Hero.tsx`

- [ ] **Step 5.1: Escribir `components/home/Hero.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { personal } from "@/data/personal";
import Icon from "@/components/ui/Icon";

export default function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-20 lg:py-32">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest text-primary rounded-full font-label text-label-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {personal.availableText}
          </div>

          <div>
            <p className="font-label text-label-md text-primary mb-4 border-l-4 border-primary pl-4">
              {personal.role}
            </p>
            <h1 className="font-headline text-headline-xl-mobile md:text-headline-xl text-on-surface mb-6">
              Construyendo soluciones robustas que funcionan.
            </h1>
            <p className="font-body text-body-lg text-text-muted max-w-xl">
              {personal.bio}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contacto"
              className="group bg-primary text-on-primary px-8 py-4 rounded-xl font-label text-label-md flex items-center gap-2 hover:shadow-lg transition-all"
            >
              Contactar
              <Icon name="arrow_forward" className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-outline-variant bg-surface-white text-on-surface px-8 py-4 rounded-xl font-label text-label-md flex items-center gap-2 hover:bg-surface-container-low transition-all"
            >
              <Icon name="link" className="text-sm" /> LinkedIn
            </a>
          </div>

          <div className="flex flex-wrap gap-6 pt-4 text-text-muted">
            <div className="flex items-center gap-2">
              <Icon name="location_on" className="text-primary" /> {personal.location}
            </div>
            <div className="flex items-center gap-2">
              <Icon name="work_history" className="text-primary" /> Experiencia desde {personal.experienceSince}
            </div>
            <div className="flex items-center gap-2">
              <Icon name="translate" className="text-primary" /> Inglés {personal.english}
            </div>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-md lg:max-w-none">
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container-high relative z-10">
            <Image
              src={personal.profilePhoto}
              alt={`${personal.firstName} ${personal.lastName}`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -bottom-6 -right-6 w-full h-full border-2 border-primary-container/20 rounded-2xl -z-0" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5.2: Verificar y commitear**

```bash
npx tsc --noEmit
npm run lint
```
Expected: ambos pasan.

```bash
git add components/home/Hero.tsx
git commit -m "Añadir Hero de Inicio con foto de perfil"
```

---

## Task 6: Componentes preview de Inicio (`components/home/`)

Todos server components. Las versiones "preview" muestran un resumen y enlazan a la página dedicada.

**Files:**
- Create: `components/home/AboutPreview.tsx`
- Create: `components/home/ExperiencePreview.tsx`
- Create: `components/home/StackPreview.tsx`
- Create: `components/home/ProjectsPreview.tsx`

- [ ] **Step 6.1: `components/home/AboutPreview.tsx`**

```tsx
import { aboutSection, aboutContent } from "@/data/about";
import { personal } from "@/data/personal";
import SectionLabel from "@/components/ui/SectionLabel";
import Icon from "@/components/ui/Icon";

export default function AboutPreview() {
  return (
    <section id="sobre-mi" className="bg-surface-container-lowest py-24 md:py-32 border-y border-outline-variant/30">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <SectionLabel>{aboutSection.label}</SectionLabel>
            <h2 className="font-headline text-headline-xl-mobile md:text-headline-xl mt-4 mb-8">
              {aboutSection.heading}
            </h2>
            <div className="space-y-6 text-text-muted font-body text-body-md">
              {aboutContent.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 text-primary font-label text-label-md hover:underline"
              >
                {personal.email} →
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-fit">
            {aboutContent.traits.map((t) => (
              <div
                key={t.title}
                className="p-6 bg-background rounded-xl border border-outline-variant/30 hover:border-primary hover:-translate-y-0.5 transition-all"
              >
                <Icon name={t.icon} fill className="text-primary mb-4" />
                <h4 className="font-headline text-headline-md text-on-surface mb-2">{t.title}</h4>
                <p className="text-text-muted font-body text-body-md">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6.2: `components/home/ExperiencePreview.tsx`**

Resumen sencillo: una tarjeta por job (sin acordeón). Enlace al final a `/experiencia`.

```tsx
import Link from "next/link";
import { experienceSection, jobs } from "@/data/experience";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";
import Icon from "@/components/ui/Icon";

export default function ExperiencePreview() {
  return (
    <section id="experiencia" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <SectionLabel>{experienceSection.label}</SectionLabel>
        <h2 className="font-headline text-headline-xl-mobile md:text-headline-xl mt-4 mb-12 md:mb-16">
          {experienceSection.heading}
        </h2>

        <div className="space-y-6">
          {jobs.map((job) => (
            <article
              key={`${job.company}-${job.date}`}
              className="p-6 md:p-8 bg-surface-white border border-outline-variant/50 rounded-2xl flex flex-col md:flex-row justify-between gap-6 hover:border-primary hover:shadow-sm transition-all"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-headline text-headline-md">{job.role}</h3>
                  {job.current && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">
                      Actual
                    </span>
                  )}
                </div>
                <p className="text-primary font-semibold">{job.company}</p>
                <p className="text-text-muted max-w-2xl">{job.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.slice(0, 4).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
              <div className="md:text-right flex-shrink-0">
                <span className="font-label text-label-md text-text-muted">{job.date}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/experiencia"
            className="inline-flex items-center gap-2 font-label text-label-md text-primary border border-outline-variant/50 px-6 py-3 rounded hover:bg-primary-container hover:text-on-primary-container hover:border-transparent transition-all"
          >
            Ver experiencia completa
            <Icon name="arrow_forward" className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6.3: `components/home/StackPreview.tsx`**

Bento grid + tarjeta de idiomas.

```tsx
import { skillsSection, skillGroups, languages } from "@/data/skills";
import SectionLabel from "@/components/ui/SectionLabel";

export default function StackPreview() {
  return (
    <section id="stack" className="py-24 md:py-32 bg-background-alt">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center">
          <SectionLabel className="inline-block">{skillsSection.label}</SectionLabel>
          <h2 className="font-headline text-headline-xl-mobile md:text-headline-xl mt-4 mb-12 md:mb-16">
            {skillsSection.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {skillGroups.map((g) => (
            <div
              key={g.category}
              className="p-6 md:p-8 bg-surface-white rounded-2xl shadow-sm border border-outline-variant/20"
            >
              <h4 className="font-label text-label-md text-primary mb-6">{g.category}</h4>
              <div className="flex flex-wrap gap-3">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="px-4 py-2 bg-background rounded-lg font-label text-label-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="p-6 md:p-8 bg-surface-white rounded-2xl shadow-sm border border-outline-variant/20">
            <h4 className="font-label text-label-md text-primary mb-6">Idiomas</h4>
            <div className="space-y-3">
              {languages.map((l) => (
                <div key={l.name} className="flex justify-between items-center">
                  <span className="font-label text-label-sm">{l.name}</span>
                  <span className="text-xs text-primary font-bold px-2 py-1 bg-primary-fixed rounded">
                    {l.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6.4: `components/home/ProjectsPreview.tsx`**

Filas alternadas. Caja con icono Material Symbol; si hay `image` se usa la imagen en su lugar. Sin acordeón aquí — sólo resumen + enlace a `/proyectos`.

```tsx
import Image from "next/image";
import Link from "next/link";
import { projectsSection, projects } from "@/data/projects";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";
import Icon from "@/components/ui/Icon";

export default function ProjectsPreview() {
  return (
    <section id="proyectos" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <SectionLabel>{projectsSection.label}</SectionLabel>
        <h2 className="font-headline text-headline-xl-mobile md:text-headline-xl mt-4 mb-12 md:mb-16">
          {projectsSection.heading}
        </h2>

        <div className="space-y-12 md:space-y-16">
          {projects.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={p.title}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-headline text-headline-md">{p.title}</h3>
                    {p.current && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">
                        Actual
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted">{p.objetivo}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.technologies.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30 aspect-video bg-surface-container-high flex items-center justify-center relative">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover"
                    />
                  ) : (
                    <Icon name={p.icon} className="text-6xl text-outline-variant" />
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 font-label text-label-md text-primary border border-outline-variant/50 px-6 py-3 rounded hover:bg-primary-container hover:text-on-primary-container hover:border-transparent transition-all"
          >
            Ver todos los proyectos
            <Icon name="arrow_forward" className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6.5: Verificar y commitear**

```bash
npx tsc --noEmit
npm run lint
```
Expected: ambos pasan.

```bash
git add components/home
git commit -m "Añadir previews de Inicio (About, Experience, Stack, Projects)"
```

---

## Task 7: Página de Inicio (`app/page.tsx`)

Componer Hero + previews con scroll-reveal y CTA solid al final.

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 7.1: Reescribir `app/page.tsx`**

```tsx
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
```

- [ ] **Step 7.2: Verificar build y commitear**

```bash
npm run build
```
Expected: build pasa (las rutas `/experiencia`, `/proyectos`, `/contacto` todavía no existen, así que los `<Link href="/contacto">` etc. son sólo strings — pasarán hasta que typed routes los detecte. En Next.js 16 sin `experimental.typedRoutes` activado en `next.config.ts`, las hrefs son strings normales y no fallan).

```bash
npm run dev
```
Visualizar en `http://localhost:3000` y confirmar que la home renderiza Hero + 4 previews + CTA azul. Parar el dev server (Ctrl+C).

```bash
git add app/page.tsx
git commit -m "Reescribir Inicio como landing con previews y CTA"
```

---

## Task 8: Componentes de Experiencia (`components/experiencia/`)

Timeline vertical, tarjetas con acordeón, lista de educación y card de idiomas.

**Files:**
- Create: `components/experiencia/JobPhotoLayout.tsx`
- Create: `components/experiencia/JobCard.tsx` (client)
- Create: `components/experiencia/ExperienceTimeline.tsx`
- Create: `components/experiencia/EduCard.tsx`
- Create: `components/experiencia/EducationList.tsx`
- Create: `components/experiencia/LanguagesCard.tsx`

- [ ] **Step 8.1: `components/experiencia/JobPhotoLayout.tsx`**

Mismo patrón que el viejo `JobPhotoLayout` pero usando los colores nuevos. Server component.

```tsx
import Image from "next/image";

type Props = {
  photos:     string[];
  paragraphs: string[];
  alt:        string;
};

export default function JobPhotoLayout({ photos, paragraphs, alt }: Props) {
  const half  = Math.ceil(paragraphs.length / 2);
  const first = paragraphs.slice(0, half);
  const rest  = paragraphs.slice(half);

  return (
    <>
      <PhotoBlock side="right" src={photos[0]} alt={`${alt} foto 1`} paragraphs={first} />
      <PhotoBlock side="left"  src={photos[1]} alt={`${alt} foto 2`} paragraphs={rest}  />
    </>
  );
}

type BlockProps = {
  side:       "left" | "right";
  src:        string;
  alt:        string;
  paragraphs: string[];
};

function PhotoBlock({ side, src, alt, paragraphs }: BlockProps) {
  const float = side === "right" ? "float-right ml-4" : "float-left mr-4";
  return (
    <div className={`overflow-hidden ${side === "right" ? "mb-3" : ""}`}>
      <div className={`${float} mb-2 w-2/5 relative aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant/40`}>
        <Image src={src} alt={alt} fill sizes="40vw" className="object-cover" />
      </div>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-text-muted text-body-md leading-relaxed mb-3 text-justify">{p}</p>
      ))}
    </div>
  );
}
```

- [ ] **Step 8.2: `components/experiencia/JobCard.tsx` (client, con acordeón)**

Acordeón con `useState` propio y el truco de `grid-template-rows`. Pinta también el "punto" del timeline.

```tsx
"use client";

import { useId, useState } from "react";
import type { Job } from "@/data/experience";
import Icon from "@/components/ui/Icon";
import Tag from "@/components/ui/Tag";
import JobPhotoLayout from "./JobPhotoLayout";

type Props = { job: Job };

export default function JobCard({ job }: Props) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();
  const hasFloatLayout = job.extra.photos.length === 2;

  return (
    <div className="relative pl-12 md:pl-16 group">
      <div
        className={`absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 md:w-4 md:h-4 border-4 border-surface rounded-full z-10 group-hover:scale-125 transition-transform shadow-sm ${
          job.current ? "bg-primary" : "bg-outline-variant"
        }`}
      />
      <div
        onClick={() => { if (!open) setOpen(true); }}
        className={`bg-surface-white border border-outline-variant/30 p-6 rounded-xl shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 ${
          !open ? "cursor-pointer" : ""
        }`}
      >
        <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
          <div>
            <h3 className="font-headline text-headline-md">{job.role}</h3>
            <p className="text-primary font-semibold">
              {job.company}
              {job.current && (
                <span className="ml-2 px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[10px] rounded uppercase">
                  Actual
                </span>
              )}
            </p>
          </div>
          <span className="text-label-sm font-label text-text-muted bg-surface-container-low px-3 py-1 rounded-full">
            {job.date}
          </span>
        </div>

        <p className="text-text-muted text-body-md mb-6 leading-relaxed">{job.desc}</p>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {job.tags.map((t) => (
              <Tag key={t} className="uppercase tracking-tighter">{t}</Tag>
            ))}
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
            aria-expanded={open}
            aria-controls={bodyId}
            className="flex items-center gap-1.5 font-label text-label-md px-4 py-2 rounded-lg border border-primary/30 text-primary bg-primary-fixed/30 hover:bg-primary hover:text-on-primary hover:border-primary transition-all"
          >
            {open ? "Cerrar" : "Saber más"}
            <Icon name="expand_more" className={`text-sm transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div
          id={bodyId}
          role="region"
          className={`grid transition-all duration-500 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-outline-variant/30 pt-6">
              {hasFloatLayout ? (
                <JobPhotoLayout
                  photos={job.extra.photos}
                  paragraphs={job.extra.paragraphs}
                  alt={job.company}
                />
              ) : (
                <div className="space-y-4">
                  {job.extra.paragraphs.map((p, i) => (
                    <p key={i} className="text-text-muted text-body-md leading-relaxed text-justify">{p}</p>
                  ))}
                </div>
              )}
              <div className="clear-both flex justify-end mt-6">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center gap-1.5 font-label text-label-md px-4 py-2 rounded-lg border border-primary/30 text-primary bg-primary-fixed/30 hover:bg-primary hover:text-on-primary hover:border-primary transition-all"
                >
                  Cerrar
                  <Icon name="expand_less" className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 8.3: `components/experiencia/ExperienceTimeline.tsx` (server)**

Render del marco del timeline (línea vertical) y mapeo a JobCards.

```tsx
import { jobs } from "@/data/experience";
import Icon from "@/components/ui/Icon";
import JobCard from "./JobCard";

export default function ExperienceTimeline() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <Icon name="work" className="text-primary bg-primary-fixed p-2 rounded-full" />
        <h2 className="font-headline text-headline-lg">Experiencia</h2>
      </div>
      <div className="space-y-8 relative before:content-[''] before:absolute before:left-4 md:before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30">
        {jobs.map((job) => (
          <JobCard key={`${job.company}-${job.date}`} job={job} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 8.4: `components/experiencia/EduCard.tsx` (server)**

```tsx
import type { EduEntry } from "@/data/education";

type Props = { entry: EduEntry };

export default function EduCard({ entry }: Props) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/20 p-6 rounded-xl">
      <span className="text-label-sm font-label text-text-muted block mb-2">{entry.period}</span>
      <h4 className="font-headline text-headline-md mb-1 leading-tight">{entry.title}</h4>
      <p className="text-secondary font-semibold text-body-md mb-3">{entry.center}</p>
      <p className="text-text-muted text-body-md">{entry.desc}</p>
    </div>
  );
}
```

- [ ] **Step 8.5: `components/experiencia/EducationList.tsx` (server)**

```tsx
import { edu } from "@/data/education";
import Icon from "@/components/ui/Icon";
import EduCard from "./EduCard";

export default function EducationList() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <Icon name="school" className="text-secondary bg-secondary-fixed p-2 rounded-full" />
        <h2 className="font-headline text-headline-lg">Educación</h2>
      </div>
      <div className="space-y-6">
        {edu.map((e) => (
          <EduCard key={e.title} entry={e} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 8.6: `components/experiencia/LanguagesCard.tsx` (server)**

Card azul oscura con la lista de idiomas + cita.

```tsx
import { languages } from "@/data/skills";
import { languagesCard } from "@/data/education";
import Icon from "@/components/ui/Icon";

export default function LanguagesCard() {
  return (
    <div className="bg-primary text-on-primary p-8 rounded-xl shadow-lg relative overflow-hidden">
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <h3 className="font-headline text-headline-md mb-6 flex items-center gap-3 relative">
        <Icon name="translate" />
        {languagesCard.heading}
      </h3>
      <ul className="space-y-4 font-label text-label-md relative">
        {languages.map((l, i) => (
          <li
            key={l.name}
            className={`flex justify-between ${i < languages.length - 1 ? "border-b border-white/10 pb-2" : ""}`}
          >
            <span>{l.name}</span>
            <span className="text-primary-fixed-dim">{l.level}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/5 relative">
        <p className="text-body-md italic leading-relaxed">&ldquo;{languagesCard.quote}&rdquo;</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 8.7: Verificar y commitear**

```bash
npx tsc --noEmit
npm run lint
```
Expected: ambos pasan.

```bash
git add components/experiencia
git commit -m "Añadir componentes de la página de Experiencia"
```

---

## Task 9: Página `/experiencia` (`app/experiencia/page.tsx`)

**Files:**
- Create: `app/experiencia/page.tsx`

- [ ] **Step 9.1: Crear `app/experiencia/page.tsx`**

```tsx
import type { Metadata } from "next";
import { personal } from "@/data/personal";
import { experienceSection } from "@/data/experience";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCTA from "@/components/ui/ContactCTA";
import ExperienceTimeline from "@/components/experiencia/ExperienceTimeline";
import EducationList from "@/components/experiencia/EducationList";
import LanguagesCard from "@/components/experiencia/LanguagesCard";

export const metadata: Metadata = {
  title:       `Experiencia · ${personal.firstName} ${personal.lastName}`,
  description: experienceSection.pageIntro,
};

export default function ExperienciaPage() {
  return (
    <main className="pt-32 pb-24">
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mb-12 md:mb-16">
        <div className="flex flex-col gap-4">
          <SectionLabel>{experienceSection.pageEyebrow}</SectionLabel>
          <h1 className="font-headline text-headline-xl-mobile md:text-headline-xl text-on-surface max-w-2xl">
            {experienceSection.pageHeading}
          </h1>
          <p className="text-text-muted text-body-lg max-w-xl">
            {experienceSection.pageIntro}
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-7">
          <ExperienceTimeline />
        </Reveal>
        <div className="lg:col-span-5 space-y-12">
          <Reveal>
            <EducationList />
          </Reveal>
          <Reveal>
            <LanguagesCard />
          </Reveal>
        </div>
      </div>

      <div className="mt-20 md:mt-24">
        <Reveal>
          <ContactCTA variant="dotted" />
        </Reveal>
      </div>
    </main>
  );
}
```

- [ ] **Step 9.2: Build, verificación visual y commit**

```bash
npm run build
```
Expected: pasa, aparece `/experiencia` en el output de rutas.

```bash
npm run dev
```
Ir a `http://localhost:3000/experiencia`, comprobar:
- Header con eyebrow + h1 + intro.
- Timeline a la izquierda con tres jobs, los acordeones se abren al pulsar "Saber más".
- El job de LEGO (con 2 fotos) usa el layout de fotos flotantes al abrir.
- Columna derecha: tarjetas de educación + LanguagesCard azul.
- CTA con patrón de puntos al final.
- Navbar marca "Experiencia" como activo.

Parar dev (Ctrl+C).

```bash
git add app/experiencia
git commit -m "Añadir página /experiencia con timeline y CTA"
```

---

## Task 10: ProjectCard de Proyectos (`components/proyectos/`)

Tarjeta con layout alternado (par/impar), caja de icono o imagen, acordeón "Saber más", enlaces live/github.

**Files:**
- Create: `components/proyectos/ProjectCard.tsx`

- [ ] **Step 10.1: `components/proyectos/ProjectCard.tsx` (client)**

```tsx
"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Project } from "@/data/projects";
import Icon from "@/components/ui/Icon";
import Tag from "@/components/ui/Tag";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

type Props = {
  project:  Project;
  reversed: boolean;
};

export default function ProjectCard({ project, reversed }: Props) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <article
      onClick={() => { if (!open) setOpen(true); }}
      className={`group bg-surface-white border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 p-6 md:p-12 ${
        !open ? "cursor-pointer" : ""
      }`}
    >
      <div className={`flex flex-col gap-8 items-start ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}>
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-headline text-headline-lg text-on-surface">{project.title}</h2>
            {project.current && (
              <span className="bg-surface-container-low text-secondary px-3 py-1 rounded text-label-sm font-label border border-secondary-container/30 uppercase tracking-tighter">
                Actual
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <p className="font-body text-body-md text-text-muted leading-relaxed">{project.objetivo}</p>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
            aria-expanded={open}
            aria-controls={bodyId}
            className="inline-flex items-center gap-2 font-label text-label-md text-primary border border-outline-variant/50 px-6 py-3 rounded hover:bg-primary-container hover:text-on-primary-container hover:border-transparent transition-all"
          >
            {open ? "Cerrar" : "Saber más"}
            <Icon name={open ? "expand_less" : "arrow_outward"} className="text-sm" />
          </button>
        </div>

        <div className="w-full md:w-5/12 aspect-video rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/20 flex items-center justify-center relative">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Icon name={project.icon} className="text-6xl text-outline-variant" />
          )}
        </div>
      </div>

      <div
        id={bodyId}
        role="region"
        className={`grid transition-all duration-500 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-outline-variant/30 pt-6 space-y-4">
            {project.cuerpo.map((p, i) => (
              <p key={i} className="text-text-muted text-body-md leading-relaxed text-justify">{p}</p>
            ))}
            {(project.links?.live || project.links?.github) && (
              <div className="flex flex-wrap gap-3 pt-4">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface-white border border-outline-variant/50 text-on-surface font-label text-label-md rounded-lg hover:border-primary hover:text-primary transition-colors"
                  >
                    <Icon name="open_in_new" className="text-sm" />
                    Ver en vivo
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface-white border border-outline-variant/50 text-on-surface font-label text-label-md rounded-lg hover:border-primary hover:text-primary transition-colors"
                  >
                    <GithubIcon size={16} />
                    GitHub
                  </a>
                )}
              </div>
            )}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                tabIndex={open ? 0 : -1}
                className="inline-flex items-center gap-1.5 font-label text-label-md px-4 py-2 rounded-lg border border-primary/30 text-primary bg-primary-fixed/30 hover:bg-primary hover:text-on-primary hover:border-primary transition-all"
              >
                Cerrar
                <Icon name="expand_less" className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 10.2: Verificar y commitear**

```bash
npx tsc --noEmit
npm run lint
```
Expected: ambos pasan.

```bash
git add components/proyectos
git commit -m "Añadir ProjectCard de Proyectos con acordeón"
```

---

## Task 11: Página `/proyectos` (`app/proyectos/page.tsx`)

**Files:**
- Create: `app/proyectos/page.tsx`

- [ ] **Step 11.1: Crear `app/proyectos/page.tsx`**

```tsx
import type { Metadata } from "next";
import { personal } from "@/data/personal";
import { projectsSection, projects } from "@/data/projects";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCTA from "@/components/ui/ContactCTA";
import ProjectCard from "@/components/proyectos/ProjectCard";

export const metadata: Metadata = {
  title:       `Proyectos · ${personal.firstName} ${personal.lastName}`,
  description: projectsSection.intro,
};

export default function ProyectosPage() {
  return (
    <main className="pt-32 pb-24">
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mb-12 md:mb-20">
        <SectionLabel line className="mb-4">{projectsSection.label}</SectionLabel>
        <h1 className="font-headline text-headline-xl-mobile md:text-headline-xl text-on-surface mb-6">
          {projectsSection.heading}
        </h1>
        <p className="font-body text-body-lg text-text-muted max-w-2xl">
          {projectsSection.intro}
        </p>
      </section>

      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-12">
          {projects.map((p, i) => (
            <Reveal key={p.title}>
              <ProjectCard project={p} reversed={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mt-20 md:mt-24">
        <Reveal>
          <ContactCTA variant="dotted" />
        </Reveal>
      </div>
    </main>
  );
}
```

- [ ] **Step 11.2: Build, verificación visual y commit**

```bash
npm run build
```
Expected: pasa, aparece `/proyectos`.

```bash
npm run dev
```
Ir a `http://localhost:3000/proyectos`, comprobar:
- Header con eyebrow línea + h1 + intro.
- Tres tarjetas alternadas izquierda/derecha.
- Caja de icono (no imagen) en cada una (Portfolio: `devices`, Money Farmer: `query_stats`, Driver Manager: `memory`).
- Acordeón "Saber más" abre el cuerpo + enlaces live/github.
- Navbar marca "Proyectos" como activo.

Parar dev.

```bash
git add app/proyectos
git commit -m "Añadir página /proyectos con tarjetas alternadas"
```

---

## Task 12: Componentes de Contacto (`components/contacto/`)

Sin formulario (decisión 3 del spec). Sólo tarjetas de método de contacto + cita.

**Files:**
- Create: `components/contacto/ContactMethodCard.tsx`
- Create: `components/contacto/QuoteCard.tsx`

- [ ] **Step 12.1: `components/contacto/ContactMethodCard.tsx` (server)**

```tsx
import Icon from "@/components/ui/Icon";

type Props = {
  href:        string;
  label:       string;
  value:       string;
  icon:        string;
  external?:   boolean;
};

export default function ContactMethodCard({ href, label, value, icon, external }: Props) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" as const } : {};
  return (
    <a
      href={href}
      {...externalProps}
      className="group flex items-center p-6 bg-surface-white border border-outline-variant/50 rounded-xl hover:border-primary hover:shadow-md transition-all"
    >
      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
        <Icon name={icon} />
      </div>
      <div className="ml-4">
        <p className="font-label text-label-sm text-text-muted">{label}</p>
        <p className="font-headline text-headline-md text-primary">{value}</p>
      </div>
    </a>
  );
}
```

- [ ] **Step 12.2: `components/contacto/QuoteCard.tsx` (server)**

```tsx
type Props = { quote: string };

export default function QuoteCard({ quote }: Props) {
  return (
    <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant/20">
      <p className="text-on-surface font-body text-body-md italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}
```

- [ ] **Step 12.3: Verificar y commitear**

```bash
npx tsc --noEmit
npm run lint
```
Expected: ambos pasan.

```bash
git add components/contacto
git commit -m "Añadir componentes de Contacto (ContactMethodCard, QuoteCard)"
```

---

## Task 13: Página `/contacto` (`app/contacto/page.tsx`)

**Files:**
- Create: `app/contacto/page.tsx`

- [ ] **Step 13.1: Crear `app/contacto/page.tsx`**

```tsx
import type { Metadata } from "next";
import { personal } from "@/data/personal";
import { contactSection } from "@/data/contact";
import Reveal from "@/components/Reveal";
import ContactMethodCard from "@/components/contacto/ContactMethodCard";
import QuoteCard from "@/components/contacto/QuoteCard";

export const metadata: Metadata = {
  title:       `Contacto · ${personal.firstName} ${personal.lastName}`,
  description: contactSection.pageSubtitle,
};

export default function ContactoPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-12 md:mb-16">
          {personal.available && (
            <div className="flex items-center gap-2 text-primary mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label text-label-md">{personal.availableText}</span>
            </div>
          )}
          <h1 className="font-headline text-headline-xl-mobile md:text-headline-xl mb-6">
            {contactSection.heading}
          </h1>
          <p className="text-text-muted text-body-lg max-w-2xl">
            {contactSection.pageSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <Reveal>
            <ContactMethodCard
              icon="mail"
              label="EMAIL"
              value={personal.email}
              href={`mailto:${personal.email}`}
            />
          </Reveal>
          <Reveal>
            <ContactMethodCard
              icon="link"
              label="LINKEDIN"
              value="Perfil profesional"
              href={personal.linkedin}
              external
            />
          </Reveal>
          <Reveal>
            <ContactMethodCard
              icon="code"
              label="GITHUB"
              value="@guiruamur"
              href={personal.github}
              external
            />
          </Reveal>
          <Reveal>
            <QuoteCard quote={contactSection.quote} />
          </Reveal>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 13.2: Build, verificación visual y commit**

```bash
npm run build
```
Expected: pasa, aparece `/contacto`.

```bash
npm run dev
```
Ir a `http://localhost:3000/contacto`, comprobar:
- Badge "Disponible" con punto pulsante.
- H1 "¿Hablamos?" + subtítulo.
- Cuatro tarjetas: Email, LinkedIn, GitHub, Quote.
- Mailto: y links externos funcionan.
- Navbar marca "Contacto" como activo.

Parar dev.

```bash
git add app/contacto
git commit -m "Añadir página /contacto con tarjetas de método directo"
```

---

## Task 14: Verificación final y actualización de CLAUDE.md

CLAUDE.md describe la arquitectura como single-page. Tras el rediseño es multipágina. Actualizar la sección "Architecture" para que refleje la realidad.

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 14.1: Actualizar la sección "Architecture" en `CLAUDE.md`**

Reemplazar el bloque que va desde `## Architecture` hasta antes de `## Styling` por:

```markdown
## Architecture

Sitio multipágina con cuatro rutas:

```
/             Inicio       (app/page.tsx)
/experiencia                (app/experiencia/page.tsx)
/proyectos                  (app/proyectos/page.tsx)
/contacto                   (app/contacto/page.tsx)
```

[app/layout.tsx](app/layout.tsx) monta `Navbar` y `Footer` para todas las páginas; cada `page.tsx` exporta su propio `metadata` y reserva su `pt-32` para no quedar tapado por la navbar fija.

### Componentes

Organizados por ámbito en [components/](components/):

- **[components/ui/](components/ui/)** — primitivas compartidas: `Icon`, `SectionLabel`, `Tag`, `ContactCTA` (con `variant: "solid" | "dotted"`).
- **[components/home/](components/home/)** — `Hero` (foto de perfil, server) + previews resumidos: `AboutPreview`, `ExperiencePreview`, `StackPreview`, `ProjectsPreview`.
- **[components/experiencia/](components/experiencia/)** — `ExperienceTimeline` con timeline vertical, `JobCard` (client, acordeón con `grid-rows: 0fr → 1fr`), `JobPhotoLayout` para jobs con dos fotos, `EducationList` + `EduCard`, `LanguagesCard`.
- **[components/proyectos/](components/proyectos/)** — `ProjectCard` (client, acordeón, layout alternado, caja de icono Material Symbol o `image?`).
- **[components/contacto/](components/contacto/)** — `ContactMethodCard`, `QuoteCard`.

Server components por defecto. Sólo son `"use client"` los que necesitan estado o efectos: `Navbar`, `Reveal`, `JobCard`, `ProjectCard`.

[components/Reveal.tsx](components/Reveal.tsx) envuelve cualquier hijo con un scroll-reveal por `IntersectionObserver`, respeta `prefers-reduced-motion`, y se usa alrededor de cada sección en las páginas.

### Data layer

Todo el contenido vive en [data/](data/) como exports TypeScript planos — `personal.ts`, `nav.ts`, `about.ts`, `experience.ts`, `skills.ts`, `education.ts`, `projects.ts`, `contact.ts`. Los componentes importan de ahí. **No hardcodear strings en componentes**: añadir o actualizar el data file correspondiente.

El año del footer en `Footer.tsx` usa `new Date().getFullYear()` — no reintroducir un año hardcoded.
```

(El resto del archivo —Commands, Styling, Path alias, Assets— se mantiene.)

- [ ] **Step 14.2: Build limpio + lint final**

```bash
npm run build
npm run lint
```
Expected: ambos pasan, las cuatro rutas (`/`, `/experiencia`, `/proyectos`, `/contacto`) salen como rutas estáticas en el output.

- [ ] **Step 14.3: Verificación visual de las cuatro rutas**

```bash
npm run dev
```
Recorrer las cuatro rutas en `http://localhost:3000/`, `/experiencia`, `/proyectos`, `/contacto`:
- Navbar marca cada ruta como activa al navegar.
- Reveal anima al hacer scroll en cada sección.
- Acordeones (Experiencia y Proyectos) abren y cierran limpios.
- En `/experiencia` el job de LEGO abre con layout de 2 fotos.
- Mobile (devtools, viewport < 768px): el menú hamburguesa de la navbar funciona; las grids colapsan a una columna.

Parar dev.

- [ ] **Step 14.4: Commit final**

```bash
git status
git add CLAUDE.md
git commit -m "Actualizar CLAUDE.md para reflejar la arquitectura multipágina"
```

---

## Notas finales

- **`tempdesign/` queda como referencia local** sin commitear (`?? tempdesign/` en git status). El spec lo trata como scaffolding; no hace falta borrarlo ni añadirlo al repo.
- **Next.js 16 / typed routes**: las hrefs de `<Link>` apuntan a rutas que existen tras crear los `page.tsx`. No se está activando `experimental.typedRoutes` explícitamente, así que las hrefs son strings normales.
- **Imágenes locales**: `next/image` con `fill` dentro de contenedor con aspect-ratio explícito. Las únicas imágenes locales en uso son `public/images/profile.jpg` (hero) y `public/images/lego-1.jpg` / `lego-2.jpg` (job de LEGO). Las URLs remotas de los mockups de Stitch NO se usan (proyectos van con icono por defecto, `image?` queda opcional para el futuro).
- **Mensajes de commit en español, sin Co-Authored-By** (regla absoluta del usuario).
