# Rediseño multipágina con design system Stitch

**Fecha:** 2026-05-14
**Rama:** `redesign`

## Contexto y objetivo

El portfolio actual es una single-page (`/`) con secciones apiladas. El objetivo es
migrarlo a un **sitio multipágina** (4 rutas) aplicando el design system "Architectural
Precision" generado en Stitch, cuyos mockups viven en `tempdesign/_stitch/`
(`inicio.html`, `experiencia.html`, `proyectos.html`, `contacto.html`).

### Ya hecho en la rama (punto de partida)

- `app/globals.css` — tokens M3 (paleta anclada en `#1E40AF`), escala tipográfica,
  fuentes (Manrope / Inter / JetBrains Mono), setup de Material Symbols.
- `app/layout.tsx` — fuentes nuevas + `Navbar` y `Footer` montados en el layout (globales).
- `components/Navbar.tsx` — nav multipágina con `usePathname` + `Link`.
- `data/nav.ts` — 4 rutas: `/`, `/experiencia`, `/proyectos`, `/contacto`.
- `data/personal.ts` — añadido `github`.
- Nuevos: `components/Footer.tsx`, `components/Reveal.tsx` (scroll-reveal con `IntersectionObserver`).

### Estado roto a resolver

`app/page.tsx` sigue siendo el single-page viejo: importa los componentes antiguos
(que usan tokens eliminados como `bg-bg`, `text-ink`, `text-blue`) y renderiza un
segundo `<Navbar />` duplicado con el del layout. No existen las carpetas de ruta
`app/experiencia/`, `app/proyectos/`, `app/contacto/`.

## Decisiones de alcance (acordadas con el usuario)

1. **Estructura:** Inicio = landing largo con todas las secciones en versión resumida.
   Experiencia / Proyectos / Contacto = páginas dedicadas con profundidad.
2. **Contenido largo:** los párrafos a fondo de cada trabajo (`extra.paragraphs`) y
   cada proyecto (`cuerpo`) se muestran con **acordeón expandible in-situ** en las
   páginas dedicadas. Sin rutas de detalle nuevas.
3. **Formulario de contacto:** se omite. La página de contacto se queda con tarjetas
   de contacto directo (email vía `mailto:`, LinkedIn).
4. **Hero:** el cuadro del hero lleva la **foto de perfil** (`profile.jpg`), no el
   shader WebGL del mockup.
5. **Visual de proyectos:** caja con icono de Material Symbols sobre fondo de color,
   más un campo `image?` opcional en el data (fallback al icono) para meter capturas
   reales en el futuro.

## Estructura de rutas

| Ruta | Contenido |
|---|---|
| `app/page.tsx` — **Inicio** | Hero · Sobre mí · Experiencia (resumen) · Stack · Proyectos (resumen) · CTA contacto |
| `app/experiencia/page.tsx` | Timeline de experiencia **con acordeón** · Educación · Card de idiomas · CTA |
| `app/proyectos/page.tsx` | Tarjetas de proyecto **con acordeón "Saber más"** |
| `app/contacto/page.tsx` | Tarjetas de contacto directo (email, LinkedIn) · cita personal — **sin formulario** |

`Navbar` y `Footer` son globales (ya en el layout). En Inicio, Experiencia y Proyectos
se muestran **solo resúmenes** + un enlace "Ver experiencia/proyectos completo →" a la
página dedicada. El contenido largo vive únicamente en las páginas dedicadas, desplegable
con acordeón.

Cada `page.tsx` exporta su propio `metadata`.

## Componentes

### Compartidos — `components/ui/`

- **`SectionLabel`** — el eyebrow mono "01 · Sobre mí" (uppercase, tracking, color primary).
- **`Icon`** — envuelve `<span className="material-symbols-outlined">`, con prop `fill`
  para el `font-variation-settings`. Evita repetir la clase por todo el código.
- **`Tag`** — las píldoras de tags reutilizadas en experiencia, proyectos y stack.
- **`ContactCTA`** — la sección CTA de contacto, con prop `variant`:
  - `"solid"` — bloque azul grande (Inicio).
  - `"dotted"` — caja clara con patrón de puntos (Experiencia).

### Inicio — `components/home/`

- **`Hero`** — client component. Foto de perfil dentro del cuadro con marco decorativo
  desplazado; badge "Disponible para nuevas oportunidades", label de rol, `h1`, bio,
  CTAs (Contactar / LinkedIn), meta row (ubicación, experiencia desde, inglés B2).
- **`AboutPreview`** — eyebrow, `h2`, párrafos, enlace de email + grid de 4 traits
  (cada trait con su icono).
- **`ExperiencePreview`** — eyebrow, `h2`, lista de jobs como tarjetas resumen (sin
  acordeón) + enlace "Ver experiencia completa →".
- **`StackPreview`** — eyebrow, `h2`, bento grid de `skillGroups` + card de idiomas.
- **`ProjectsPreview`** — eyebrow, `h2`, filas de proyecto en layout alternado (resumen)
  + enlace "Ver todos los proyectos →".

### Experiencia — `components/experiencia/`

- **`ExperienceTimeline`** + **`JobCard`** — timeline vertical; cada `JobCard` es un
  client component con acordeón que despliega `extra.paragraphs`, y layout de fotos
  para el trabajo que tiene `extra.photos`.
- **`EducationList`** + **`EduCard`** — tarjetas de formación.
- **`LanguagesCard`** — la card azul de idiomas/extras (inglés B2, español nativo,
  permiso B).

### Proyectos — `components/proyectos/`

- **`ProjectCard`** — client component. Layout alternado (par/impar), caja de icono
  (o `image` si existe), tags, descripción corta (`objetivo`), acordeón "Saber más"
  que despliega `cuerpo`, y enlaces (`links.live` / `links.github`).

### Contacto — `components/contacto/`

- **`ContactMethodCard`** — tarjeta de método de contacto directo (email, LinkedIn),
  con icono, label y valor.
- **`QuoteCard`** — la cita personal del mockup.

Todas las secciones se envuelven en `<Reveal>` para el scroll-reveal ya existente.

### Reparto client / server

Server components por defecto. Client components solo: `Navbar` (ya), `Hero` (no
estrictamente necesario salvo interacción menor — se evaluará), `JobCard` y
`ProjectCard` (acordeón con `useState`).

## Cambios en `/data`

- **`projects.ts`** — añadir a `Project`: `icon: string` (nombre de material-symbol) y
  `image?: string` (opcional, fallback al icono). Rellenar `icon` para los 3 proyectos.
- **`about.ts`** — añadir `icon` a cada `trait` (`rocket_launch`, `groups`, `school`,
  `psychology`).
- **`skills.ts`** — `languages` usa tokens viejos (`bg-blue-lt text-blue border-blue/20`);
  migrar a tokens nuevos del design system.
- **`experience.ts`** — sin cambios de estructura (ya tiene `extra.paragraphs` /
  `extra.photos`).
- **Renumerar labels** de las secciones para que Inicio lea limpio **01–05**:
  01 Sobre mí · 02 Experiencia · 03 Stack · 04 Proyectos · 05 Contacto. Educación pasa
  a la página de Experiencia sin número global (label simplificado).
- **`contact.ts`** — añadir la cita personal para `QuoteCard` si no encaja en otro data.

## Limpieza / borrado

- **Borrar** componentes y subcarpetas obsoletos: `Hero.tsx`, `About.tsx`, `Skills.tsx`,
  `Education.tsx`, `Experience.tsx`, `Projects.tsx`, `Contact.tsx`, y las subcarpetas
  `components/hero/`, `components/experience/`, `components/projects/` (incluye
  `FlyingName`, `useFlyingName`, `ProfilePhoto` — la foto se inlinea en el `Hero` nuevo).
- **`app/page.tsx`** — quitar el `<Navbar />` duplicado y reescribir como la página
  Inicio nueva.
- Quitar la dependencia `lucide-react` si no la usa nadie más (Navbar ya migró a
  Material Symbols).
- Limpiar el `@keyframes fade-up` huérfano de `globals.css` (Reveal no lo usa; anima
  con utilidades de Tailwind).

## Fuera de alcance

- Formulario de contacto funcional (cualquier backend / servicio de email).
- Shader WebGL en el hero.
- Capturas reales de proyectos (el data queda preparado con `image?` para añadirlas luego).

## Notas técnicas

- **Next.js 16** — `AGENTS.md` advierte que esta versión tiene breaking changes; antes
  de escribir código de routing / metadata / layout hay que leer la guía relevante en
  `node_modules/next/dist/docs/`.
- El `<head>` con el `<link>` de Material Symbols en `layout.tsx` se revisa contra la
  convención de Next 16 (puede ir vía metadata API o quedarse como `<link>`).
- Tailwind v4 sin `tailwind.config.js` — tokens en `globals.css` con `@theme inline`.
- Alias `@/*` resuelve a la raíz del repo.
