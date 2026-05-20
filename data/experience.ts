export const experienceSection = {
  label:       "02 · Experiencia",
  heading:     "Por donde he pasado",
  pageEyebrow: "Trayectoria profesional",
  pageHeading: "Por donde he pasado y lo que he aprendido",
  pageIntro:   "Una visión estructurada de mi evolución técnica, desde el soporte de sistemas hasta el desarrollo full stack y el emprendimiento.",
};

export type Job = {
  date:    string;
  role:    string;
  company: string;
  type:    string;
  current: boolean;
  desc:    string;
  tags:    string[];
  extra: {
    paragraphs: string[];
    photos:     string[];
  };
};

export const jobs: Job[] = [
  {
    date:    "Abril 2025 – Actualidad",
    role:    "Técnico Informático",
    company: "Pentínfor",
    type:    "Trabajo actual",
    current: true,
    desc:    "Soporte informático a clientes: resolución de incidencias, gestión y mantenimiento de equipos, instalación y reparación de hardware, configuración de software y sistemas.",
    tags:    ["Hardware", "Soporte", "Sistemas", "Redes"],
    extra: {
      paragraphs: [
        "Tras terminar mis estudios decidí buscar trabajo a toda costa, lo que me llevó a encontrar mi sitio en Pentínfor: una tienda de informática especializada en ofrecer servicios informáticos integrales a empresas.",
        "El puesto no encajaba del todo con lo que buscaba, ya que no es un rol de desarrollador como tal. Pero no iba a perder la oportunidad de aprender cosas nuevas, así que no lo dudé.",
        "Poco a poco fui profundizando en soporte técnico, redes, reparación de equipos y diagnóstico a un nivel mucho más alto del que había visto hasta entonces. Una experiencia que ha ampliado bastante mi visión de la informática. El puesto supone ofrecer un servicio informático completo: desde soporte helpdesk hasta asistencia in situ, pasando por reparación de equipos, configuración de redes, mantenimiento de impresoras y cualquier clase de intervención que precise el cliente.",
        "Trabajando con Pentinfor no me esperaba adquirir otras habilidades a parte de las ya mencionadas pues adicionalmente he podido adquirir mucha soltura moviéndome por Sevilla. La empresa cuenta con una furgoneta para las intervenciones, y además aprendí a llevar una motocicleta 125cc para trasladarme con mayor eficiencia en los momentos en que el vehículo principal estuviese ocupado en otra intervención.",
        "Y la cosa no termina ahí: también he podido poner en práctica mis habilidades de programación creando pequeños programas que me facilitan el día a día en el trabajo, automatizando tareas repetitivas y ahorrando tiempo en lo cotidiano.",
      ],
      photos: [],
    },
  },
  {
    date:    "Abr – Jul 2024",
    role:    "Desarrollador Full Stack",
    company: "Prácticas DAM",
    type:    "Prácticas",
    current: false,
    desc:    "Desarrollo de una app móvil de compraventa de artículos de equitación en equipo de 4. Frontend en React Native con Expo, APIs en Laravel, base de datos MySQL y diseño UI en Figma.",
    tags:    ["React Native", "Expo", "Laravel", "MySQL", "Figma", "Frontend"],
    extra: {
      paragraphs: [
        "Las prácticas de fin de ciclo me llevaron a un equipo de cuatro desarrolladores a construir ReHorse: una app de compraventa de artículos de equitación, algo así como un Wallapop especializado en el mundo del caballo.",
        "Mi rol fue el diseño y desarrollo frontend. Me encargué de la UI y la experiencia de usuario en React Native con Expo, apoyándome en los mockups previos de Figma. El conocimiento del funcionamiento de los marketplaces de segunda mano me dio ventaja a la hora de entender cómo tenía que fluir la app.",
        "El stack del proyecto combinaba Laravel para las APIs del backend, MySQL como base de datos y React Native con Expo en el lado del cliente. Comenzamos por el diseño del modelo de datos y los wireframes en Figma antes de ponernos a escribir código.",
        "Tuve que dejar el proyecto antes de su finalización, por lo que quedó en una fase inicial. Está pendiente de retomar el contacto con la empresa para darle continuidad en el futuro.",
      ],
      photos: [],
    },
  },
  {
    date:    "2021 – 2022",
    role:    "Emprendedor",
    company: "Tienda Online de Coleccionismo",
    type:    "Proyecto propio",
    current: false,
    desc:    "Creé y gestioné una tienda online internacional de artículos de coleccionismo. Aprendí negociación, logística, proveedores y gestión de costes desde cero.",
    tags:    ["E-commerce", "Logística", "Negociación", "Emprendimiento"],
    extra: {
      paragraphs: [
        "Quise sacar provecho de una afición que tengo desde pequeño: soy un gran fan de los juegos de construcción de LEGO y veía un problema del que podía sacar rendimiento. Existe un gran mercado de artículos descatalogados de años anteriores que ya no se pueden comprar pero que siguen gustando mucho, con la pega de que para conseguirlos dependes del mercado de segunda mano, donde los precios que ponen los particulares a veces son directamente absurdos.",
        "El punto estaba en que en plataformas de segunda mano españolas y del oeste de Europa como Vinted y Wallapop, muchos de esos artículos se vendían como juguetes más que como piezas de colección a precios muy competitivos. Sin embargo, esos mismos artículos estaban muy cotizados en el resto de Europa e incluso del mundo.",
        "Empecé creándome una cuenta en BrickLink, una plataforma destinada a comprar y vender estos artículos a nivel mundial, con listado de precios de venta y contadores de existencias. Poco a poco fui comprando las mejores ofertas disponibles en las apps de segunda mano y llamando a almacenes de toda España preguntando por existencias abandonadas para negociar la compra de todo lo que quedaba, subiéndolo después a mi perfil de tienda.",
        "La experiencia me llevó a contactar con personas de todas partes del mundo (Europa, Rusia, Estados Unidos, Tailandia, China, Japón) y terminé montando toda una infraestructura de almacenaje y logística a una escala reducida pero eficiente. Gracias a este emprendimiento pude dar un gran empujón a mi calidad de vida y mantener unos ingresos que, aunque limitados, fueron suficientes para cubrir gastos personales y costearme cursos de formación.",
        "Finalmente, en 2022 y tras una pequeña etapa de recesión en la productividad, decidí cerrar el proyecto para matricularme en el ciclo de Desarrollo de Aplicaciones Multiplataforma y centrarme de lleno en mi formación, dando así paso al siguiente capítulo.",
      ],
      photos: ["/images/lego-2.jpg", "/images/lego-1.jpg"],
    },
  },
  {
    date:    "2021",
    role:    "Técnico Informático",
    company: "Prácticas de formación",
    type:    "Prácticas",
    current: false,
    desc:    "Montaje, reparación y configuración de hardware en equipos de escritorio y portátiles. Atención al cliente, redes y sistemas de comunicación.",
    tags:    ["Hardware", "Redes", "Atención al cliente"],
    extra: {
      paragraphs: [
        "Mis primeras prácticas profesionales me llevaron a una tienda de telefonía en Camas, donde di mis primeros pasos reales como técnico informático. Allí comprendí, con las manos en la masa, cómo funciona la infraestructura de sistemas en un entorno real.",
        "El proyecto más importante fue el montaje de un servidor desde cero en Bormujos: comenzamos por el rack, configuramos los switches y fuimos construyendo toda la infraestructura necesaria hasta tener el módulo operativo. Una experiencia que me enseñó que montar una red no es solo enchufar cables.",
        "Además de la parte de redes, también me encargué de la reparación y el reacondicionamiento de equipos, lo que me permitió ganar soltura con el hardware y desarrollar un buen ojo para el diagnóstico.",
      ],
      photos: [],
    },
  },
];
