export type ProductCondition = 
  | "como-nuevo" 
  | "muy-buen-estado" 
  | "buen-estado" 
  | "con-detalles";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Precio en pesos argentinos
  condition: ProductCondition;
  conditionLabel: string;
  conditionDescription: string;
  stock: 1; // Siempre 1 - pieza única
  images: string[];
  category: string;
  featured?: boolean;
}

export const conditionColors: Record<ProductCondition, string> = {
  "como-nuevo": "bg-zinc-800 text-white",
  "muy-buen-estado": "bg-zinc-700 text-white",
  "buen-estado": "bg-zinc-500 text-white",
  "con-detalles": "bg-zinc-400 text-zinc-900",
};

export const products: Product[] = [
  {
    id: "pc-desktop-gaming",
    name: "PC Desktop Gaming i7",
    description: "PC de escritorio armada con Intel Core i7-9700K, 32GB RAM DDR4, RTX 2070 Super 8GB, SSD NVMe 1TB + HDD 2TB. Gabinete NZXT H510 con buena gestión de cables. Ideal para gaming 1440p o trabajo de edición. Incluye Windows 11 Pro activado.",
    price: 850000,
    condition: "muy-buen-estado",
    conditionLabel: "Muy buen estado",
    conditionDescription: "Funcionamiento perfecto. Algunos rayones mínimos en el gabinete. Componentes internos impecables, nunca overclockeados. Se entrega limpia y con pasta térmica nueva.",
    stock: 1,
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80",
    ],
    category: "Tecnología",
    featured: true,
  },
  {
    id: "radio-yaesu-ft-857d",
    name: "Radio Yaesu FT-857D",
    description: "Transceptor multibanda HF/VHF/UHF compacto. Cubre de 160m a 70cm. 100W en HF/6m, 50W en VHF, 20W en UHF. Incluye micrófono original MH-31, cable de alimentación y manual. Perfecto para radioaficionados móviles o base compacta.",
    price: 420000,
    condition: "buen-estado",
    conditionLabel: "Buen estado",
    conditionDescription: "Funciona correctamente en todas las bandas. Display con un pixel muerto apenas visible. Carcasa con marcas de uso normal. Se probó en transmisión y recepción antes de publicar.",
    stock: 1,
    images: [
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    category: "Radioafición",
  },
  {
    id: "inodoro-quimico-porta-potti",
    name: "Inodoro Químico Porta Potti 365",
    description: "Inodoro portátil Thetford Porta Potti 365. Capacidad tanque residuos 21L, tanque agua limpia 15L. Bomba de pistón. Indicador de nivel de residuos. Ideal para camping, motorhome, o emergencias en casa.",
    price: 180000,
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    conditionDescription: "Usado solo una vez en un viaje de fin de semana. Completamente higienizado y desinfectado. Sin olores ni manchas. Incluye caja original y químicos sellados para primer uso.",
    stock: 1,
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    ],
    category: "Camping",
  },
  {
    id: "impresora-brother-laser",
    name: "Impresora Brother HL-1212W",
    description: "Impresora láser monocromática compacta con WiFi. Velocidad 21ppm. Diseñada en Japón. Ideal para uso personal o pequeña oficina. Incluye tóner compatible TN-1060 nuevo de alto rendimiento.",
    price: 120000,
    condition: "muy-buen-estado",
    conditionLabel: "Muy buen estado",
    conditionDescription: "Poco uso, imprime perfecto sin líneas ni manchas. WiFi funcionando correctamente. Se entrega con tóner nuevo compatible TN-1060 de alto rendimiento (3000 páginas). Lista para usar.",
    stock: 1,
    images: [
      "/images/impresora-brother/impresora-brother-cb-jamstack-agency-myshop-usada-wifi-barata.jpg",
      "/images/impresora-brother/impresora-usada-regalo-cartucho.jpg",
      "/images/impresora-brother/impresora-brother-wifi-cartuchos-regalo barato usado.jpg",
      "/images/impresora-brother/impresora-cartuchos-regalo-tienda-usado.jpg",
    ],
    category: "Tecnología",
  },
  {
    id: "septologia-jon-fosse",
    name: "Septología - Jon Fosse",
    description: "La obra maestra del Premio Nobel de Literatura 2023. Septología es una novela hipnótica y contemplativa que sigue a un pintor viudo en la costa noruega durante siete días. Escrita en un flujo de conciencia único, sin puntos, esta obra explora la fe, el arte, la soledad y los caminos no tomados. Edición Seix Barral con sello 'Premio Nobel'. Una experiencia literaria transformadora.",
    price: 40000,
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    conditionDescription: "Libro leído una vez con sumo cuidado. Tapa y páginas impecables. Sin marcas, subrayados ni dedicatorias. Lomo perfecto. Edición especial con sello Premio Nobel 2023.",
    stock: 1,
    images: [
      "/images/libros/septologia-jon-fosse-premio-nobel-2023-seix-barral.jpg",
    ],
    category: "Libros",
    featured: true,
  },
  {
    id: "inteligencias-multiples-educacion",
    name: "Inteligencias Múltiples en la Educación",
    description: "Libro de Elena María Ortiz de Maschwitz, editorial Bonum. Guía práctica para aplicar la teoría de Howard Gardner en el aula. Propone estrategias pedagógicas innovadoras que respetan los diferentes estilos de aprendizaje. Ideal para docentes, psicopedagogos y padres que buscan potenciar las capacidades únicas de cada niño.",
    price: 10000,
    condition: "buen-estado",
    conditionLabel: "Buen estado",
    conditionDescription: "Libro usado con marcas de lectura. Tapa con leves signos de uso. Páginas en buen estado, algunas con subrayados a lápiz. Contenido completo y legible. Perfecto para estudio.",
    stock: 1,
    images: [
      "/images/libros/inteligencias-multiples-educacion-persona-ortiz-maschwitz-bonum.jpg",
    ],
    category: "Libros",
  },
  {
    id: "educar-adolescentes-inteligencia-emocional",
    name: "Educar Adolescentes con Inteligencia Emocional",
    description: "De Maurice J. Elias, Steven E. Tobias y Brian S. Friedlander. Editorial Plaza & Janés, colección Autoayuda. Herramientas prácticas para padres y educadores que quieren ayudar a los adolescentes a desarrollar habilidades emocionales, resolver conflictos y tomar mejores decisiones. Basado en investigaciones científicas, ofrece ejercicios y casos reales.",
    price: 6000,
    condition: "buen-estado",
    conditionLabel: "Buen estado",
    conditionDescription: "Ejemplar usado con etiqueta de precio anterior visible en tapa. Interior en buen estado. Algunas páginas con leves marcas. Lectura completa garantizada. Ideal para quien busca contenido práctico.",
    stock: 1,
    images: [
      "/images/libros/educar-adolescentes-inteligencia-emocional-elias-tobias-friedlander.jpg",
    ],
    category: "Libros",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateTransferPrice(price: number): number {
  return Math.round(price * 0.85); // 15% de descuento
}



