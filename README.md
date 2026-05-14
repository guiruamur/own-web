# own-web

Portfolio personal de Guillermo Ruano Muriedas — Desarrollador Full Stack y Técnico IT (Sevilla, España).

🌐 **En producción:** [ruanodev.com](https://ruanodev.com)

## Stack

- **[Next.js 16](https://nextjs.org)** con App Router
- **React 19**
- **Tailwind CSS v4** (sin `tailwind.config.js`; tokens en `@theme inline`)
- **TypeScript** strict
- **Bricolage Grotesque** + **Manrope** vía `next/font/google`
- **lucide-react** para iconografía

## Estructura

Single-page con una sola ruta (`/`) compuesta por secciones independientes:

```
Navbar → Hero → About → Experience → Skills → Education → Contact
```

```
app/
  layout.tsx        ← metadata SEO + carga de fuentes
  page.tsx          ← orquesta las secciones
  globals.css       ← tokens de tema, animaciones
components/
  Navbar.tsx
  Hero.tsx          + hero/ (FlyingName, ProfilePhoto, useFlyingName hook)
  About.tsx
  Experience.tsx    + experience/ (JobCard, JobBody, JobPhotoLayout)
  Skills.tsx
  Education.tsx
  Contact.tsx
data/
  personal.ts, nav.ts, about.ts, experience.ts,
  skills.ts, education.ts, contact.ts
public/
  images/           ← fotos de perfil y proyectos
```

Todo el contenido (puestos, skills, formación, copy) vive en [data/](data/) como exports de TypeScript — los componentes solo consumen, no definen contenido.

## Scripts

```bash
npm run dev      # Servidor de desarrollo en http://localhost:3000
npm run build    # Build de producción
npm run start    # Servir el build
npm run lint     # ESLint (next/core-web-vitals + TypeScript)
```

## Convenciones

- **Theme tokens** en `app/globals.css` (`text-ink`, `bg-bg`, `border-line`, `text-blue`, etc.) en vez de colores raw de Tailwind.
- **Tipografía**: `font-display` para títulos, `font-sans` para cuerpo.
- **Path alias** `@/*` resuelve a la raíz del repo (ej. `@/components/Navbar`, `@/data/experience`).
- **Server vs client components**: solo `"use client"` donde haga falta API del navegador (scroll, `useState`, etc.). El resto, server components.

## Despliegue

Conectado a Vercel — push a `main` dispara redeploy automático.
