export const projectsSection = {
  label:   "04 · Proyectos",
  heading: "Lo que he construido",
  intro:   "Una selección de proyectos personales donde aplico nuevas tecnologías y resuelvo problemas reales, desde automatización hasta sistemas de gestión.",
};

export const learningCard = {
  icon:  "trending_up",
  title: "El proyecto más importante: seguir aprendiendo",
  text:  "Si tuviera que señalar el proyecto más importante en el que trabajo, sería este: no dejar de formarme. La tecnología avanza rápido y cada herramienta nueva es una excusa para construir algo. Más allá de los ciclos y los títulos, sigo aprendiendo por cuenta propia (frameworks modernos, IA local, nuevas arquitecturas) para no quedarme quieto.",
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
    title:    "Portfolio personal (ruanodev.com)",
    current:  true,
    icon:     "devices",
    image:    "/images/project-portfolio.jpg",
    objetivo: "Tener un sitio propio donde demuestre que sigo siendo dev a pesar de mi rol actual como técnico IT, con identidad visual, código mantenible para iterar en el tiempo y total libertad para experimentar.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Vercel"],
    cuerpo: [
      "El portfolio nació de una necesidad concreta: aunque mi puesto actual es de técnico IT, sigo siendo desarrollador y necesitaba un escaparate donde poder enseñarlo. La web no es solo un currículum decorado: es el mejor argumento posible de que sigo escribiendo código y tomando decisiones de diseño.",
      "Construido sobre Next.js 16 con App Router y React 19, todo en TypeScript estricto. El estilo va con Tailwind v4: sin tailwind.config.js, los tokens del tema viven en globals.css usando la directiva @theme inline. Los componentes que necesitan API del navegador (scroll, useState) van como client components; el resto son server components. Sin sobreingeniería: solo client donde de verdad hace falta.",
      "La paleta es intencional: un azul oscuro saturado (#1E40AF) como acento sobre un fondo claro (#f9f9ff). Manrope para los display, Inter para el cuerpo y JetBrains Mono para los labels, un emparejamiento que da personalidad sin estridencias. Todos los colores y fuentes se usan a través de tokens semánticos (text-primary, bg-background, font-headline, etc.) en lugar de valores raw, así un cambio en un sitio repercute en todo.",
      "Algunos rincones técnicos que me dieron buen rato: el acordeón de Experiencia y Proyectos que anima de forma fluida sin max-height mágicos usando el truco de grid-template-rows: 0fr → 1fr; el scroll-reveal con IntersectionObserver que respeta prefers-reduced-motion; y la migración a multipágina con App Router de Next.js 16, donde cada ruta carga sólo lo que necesita.",
      "El proyecto ha ido ganando definición a base de iteración: la paleta evolucionó hacia tonos más sobrios, los datos pasaron de vivir hardcoded en componentes a estar en /data/ como exports limpios, y la arquitectura saltó de un single-page apilado a un sitio multipágina con secciones dedicadas. La filosofía: cada decisión debe poder defenderse, y si más adelante no se sostiene, se cambia. El portfolio no es un producto terminado, es un proyecto vivo.",
    ],
    links: {
      live: "https://ruanodev.com",
    },
  },
  {
    title:    "Checkin App",
    icon:     "punch_clock",
    image:    "/images/project-checkin.jpg",
    objetivo: "Una web SaaS de registro horario para empresas de azafatos y personal de eventos, conforme a la RD-Ley 8/2019. Multi-tenant: cada empresa opera aislada por completo; los trabajadores fichan desde el móvil con un QR del evento más un PIN, y el administrador gestiona agenda, clientes y reportes desde una PWA.",
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Cloudflare Workers"],
    cuerpo: [
      "Checkin App resuelve un problema concreto de las empresas de azafatos y personal para eventos: el control horario obligatorio que exige la RD-Ley 8/2019 en España. Estas empresas mueven muchos trabajadores rotando entre eventos distintos, y fichar con papel o una hoja de cálculo ni escala ni cumple de verdad.",
      "La arquitectura es multi-tenant de verdad: un mismo despliegue sirve a varias empresas completamente aisladas entre sí mediante Row Level Security a nivel de PostgreSQL. El aislamiento no depende del código de la aplicación: se fuerza en la propia base de datos con un Auth Hook de Supabase que inyecta el company_id como claim del JWT. Si una consulta intenta cruzar datos entre empresas, la base de datos simplemente no devuelve nada.",
      "Los trabajadores fichan desde el móvil escaneando el QR del evento e introduciendo un PIN, sin instalar nada. El panel de administración es una PWA donde se gestiona la agenda, los clientes, los eventos y los reportes. El alta de trabajadores tiene su propio flujo con verificación por email, todo resuelto con Edge Functions en Deno.",
      "Por dentro: frontend en React + Vite + TypeScript desplegado en Cloudflare Workers, y backend completo en Supabase (PostgreSQL, Auth, RLS y Edge Functions). Lo que más cuido es la disciplina de testing en tres niveles: Vitest + React Testing Library en el frontend, pgTAP para la lógica de base de datos y Deno test para las Edge Functions. Actualmente está en producción en su fase M2.",
    ],
    links: {
      github: "https://github.com/guiruamur/checkin-app",
    },
  },
  {
    title:    "Money Farmer",
    icon:     "query_stats",
    image:    "/images/project-money-farmer.jpg",
    objetivo: "Un servicio local que genera señales de criptomonedas combinando un LLM corriendo en tu propia máquina (Ollama) con RAG y memoria de feedback. Todo en local, sin enviar datos a terceros y sin ejecutar órdenes reales: solo análisis y señales.",
    technologies: ["Python", "Ollama", "RAG", "SQLite", "Telegram Bot API"],
    cuerpo: [
      "Money Farmer es un experimento con IA local aplicada a un problema concreto: analizar el mercado cripto de forma continua sin depender de servicios externos de pago ni mandar datos a ninguna parte. El LLM (qwen2.5 vía Ollama) corre en la propia máquina, y un sistema RAG le da contexto de noticias y de su propio histórico de aciertos.",
      "El proceso corre 24/7: cada 15 minutos ejecuta un ciclo de análisis, y las señales con confianza suficiente se envían a un chat de Telegram. Los resultados a 1h, 4h y 24h se miden automáticamente para alimentar las estadísticas de win rate. El sistema se mide contra sus propios aciertos y fallos.",
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
    image:    "/images/project-driver-manager.jpg",
    objetivo: "Resolver una carencia real del Administrador de Dispositivos de Windows: ver de un vistazo qué driver gobierna cada dispositivo, cuál falla y qué paquetes duplicados se acumulan en el Driver Store. Una herramienta portable, sin instalador, pensada para llevar en un USB.",
    technologies: ["C#", ".NET 8", "WPF", "P/Invoke", "WMI"],
    cuerpo: [
      "Driver Manager nació directamente de mi día a día como técnico IT. El Administrador de Dispositivos de Windows funciona, pero es incómodo para tres cosas concretas: ver qué archivo .inf usa cada dispositivo, identificar de un vistazo qué hardware va bien y qué va mal, y limpiar los paquetes duplicados que se acumulan en el Driver Store (algo típico con drivers de GPU).",
      "La app presenta toda esa información en pestañas filtrables, con un código de color inmediato: verde para lo que funciona, rojo para lo que tiene un problem code, blanco para lo dudoso. Permite instalar drivers desde .inf, .zip o carpeta con drag & drop, y la desinstalación es segura: hace backup del paquete antes de borrarlo, y si el backup falla, aborta la operación.",
      "Por dentro está organizada en tres capas con dependencias hacia abajo: la App (WPF + ViewModels + composition root), el Core (modelos y lógica de dominio pura) y la capa Os (adaptadores a Windows vía P/Invoke y WMI). Cada servicio del sistema operativo está detrás de una interfaz, así el dominio se puede testear con fakes sin necesidad de Windows. Los fallos previsibles se modelan con Result<T> en lugar de excepciones.",
      "Es portable de verdad: no requiere instalador y todos los datos (backups, logs, exports) se guardan junto al ejecutable. Un build script restaura, testea y publica el .exe en un par de minutos.",
    ],
    links: {
      github: "https://github.com/guiruamur/driver-manager",
    },
  },
  {
    title:    "App móvil en equipo",
    icon:     "smartphone",
    image:    "/images/project-confidencial.jpg",
    objetivo: "Aplicación móvil desarrollada en equipo bajo acuerdo de confidencialidad. No puedo decir el nombre, qué hace ni su modelo de negocio, pero sí con qué está construida y, sobre todo, cómo trabajamos en equipo, que es donde está lo interesante.",
    technologies: ["Flutter", "Dart", "Rust", "PostgreSQL", "Fly.io"],
    cuerpo: [
      "Es una app móvil en la que participo dentro de un equipo de desarrollo. Por acuerdo de confidencialidad con el resto de integrantes no puedo detallar el nombre, la funcionalidad ni el modelo de negocio del producto, así que aquí me centro en lo que sí puedo enseñar: la arquitectura técnica y el modelo de trabajo.",
      "El stack reparte responsabilidades por capas: la app móvil multiplataforma está hecha en Flutter (Dart), el backend en Rust con acceso a datos vía sqlx, y la persistencia en PostgreSQL. El entorno de desarrollo se levanta con Docker Compose (PostgreSQL + Redis) y el backend se despliega en Fly.io.",
      "Lo que más valoro del proyecto es la disciplina de equipo. Trabajamos con un flujo trunk-based sobre una rama develop, con ramas de feature por persona y convención de commits (Conventional Commits con scope). Ningún cambio entra a develop ni a main sin Pull Request: hay branch protection rules versionadas en el repo y code review obligatorio entre compañeros. La CI/CD corre en GitHub Actions, separada por subsistema, validando backend y móvil por su cuenta en cada PR.",
      "Hasta los detalles pequeños están cuidados: las versiones de las herramientas están fijadas para que todo el equipo comparta el mismo entorno reproducible, los secretos se gestionan de forma centralizada (nada de .env reales en el repo) y la documentación de onboarding es exhaustiva. Mi participación toca las tres capas: backend en Rust, app en Flutter y prototipo de la UI.",
    ],
  },
];
