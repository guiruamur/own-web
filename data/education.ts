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
  heading: "Idiomas",
  quote:   "La formación no termina con el título. Sigo aprendiendo cada día para estar al día con la tecnología.",
};
