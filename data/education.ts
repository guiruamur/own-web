export const educationSection = {
  label:   "04 · Educación",
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

export const idiomasCard = {
  period: "Idiomas",
  title:  "Inglés — Nivel B2",
  center: "Certificación B1 oficial",
  desc:   "Comunicación técnica fluida. Lectura de documentación, trabajo en equipos internacionales y redacción de código en inglés.",
};

export const ctaCard = {
  eyebrow: "Siempre aprendiendo",
  title:   "La formación no termina con el título",
  desc:    "Más allá de los ciclos, sigo formándome por cuenta propia. La tecnología avanza rápido y me gusta estar al día.",
};
