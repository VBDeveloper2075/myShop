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
      "/images/impresora-brother/1.jpg",
      "/images/impresora-brother/2.jpg",
      "/images/impresora-brother/3.jpg",
      "/images/impresora-brother/4.jpg",
    ],
    category: "Tecnología",
  },
  {
    id: "septologia-knausgard",
    name: "Septología Completa - Knausgård",
    description: "Los 7 tomos de 'Mi Lucha' de Karl Ove Knausgård en español (Anagrama). La autobiografía más honesta y cruda de la literatura contemporánea. Incluye: La muerte del padre, Un hombre enamorado, La isla de la infancia, Bailando en la oscuridad, Tiene que llover, Fin, y el bonus 'En otoño'.",
    price: 85000,
    condition: "buen-estado",
    conditionLabel: "Buen estado",
    conditionDescription: "Todos los libros leídos una vez. Lomos en perfecto estado. Algunas páginas con marcas de lápiz (subrayados muy suaves, borrables). Sin dedicatorias. Ideal para quien quiera la colección completa.",
    stock: 1,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80",
    ],
    category: "Libros",
    featured: true,
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



