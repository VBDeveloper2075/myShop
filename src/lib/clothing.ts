export type ClothingCategory = "hombre" | "mujer" | "accesorios";

export type ClothingCondition = 
  | "nuevo-con-etiqueta" 
  | "como-nuevo" 
  | "muy-buen-estado" 
  | "buen-estado";

export interface ClothingItem {
  id: string;
  name: string;
  description: string;
  price: number;
  condition: ClothingCondition;
  conditionLabel: string;
  size?: string;
  brand?: string;
  images: string[];
  category: ClothingCategory;
  sold?: boolean; // Producto vendido
}

export const clothingConditionColors: Record<ClothingCondition, string> = {
  "nuevo-con-etiqueta": "bg-emerald-600 text-white",
  "como-nuevo": "bg-zinc-800 text-white",
  "muy-buen-estado": "bg-zinc-700 text-white",
  "buen-estado": "bg-zinc-500 text-white",
};

export const categoryLabels: Record<ClothingCategory, string> = {
  hombre: "Hombre",
  mujer: "Mujer",
  accesorios: "Accesorios",
};

export const clothingItems: ClothingItem[] = [
  // HOMBRE
  {
    id: "camisa-levis-hombre",
    name: "Camisa Levi's Denim Clásica",
    description: "Camisa de jean Levi's original. Corte regular, botones de metal grabados. Color azul medio stonewash. Perfecta para looks casuales o semi-formales.",
    price: 35000,
    condition: "muy-buen-estado",
    conditionLabel: "Muy buen estado",
    size: "L",
    brand: "Levi's",
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80"],
    category: "hombre",
    sold: true,
  },
  {
    id: "blazer-zara-hombre",
    name: "Blazer Zara Slim Fit Negro",
    description: "Blazer negro Zara Man de corte slim. Forro interior completo. Dos botones frontales. Ideal para oficina o eventos semi-formales.",
    price: 45000,
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    size: "M",
    brand: "Zara",
    images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"],
    category: "hombre",
    sold: true,
  },
  {
    id: "remera-nike-hombre",
    name: "Remera Nike Dri-FIT Training",
    description: "Remera deportiva Nike con tecnología Dri-FIT que absorbe el sudor. Color gris oscuro. Logo bordado. Perfecta para gym o running.",
    price: 18000,
    condition: "buen-estado",
    conditionLabel: "Buen estado",
    size: "M",
    brand: "Nike",
    images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80"],
    category: "hombre",
    sold: true,
  },
  {
    id: "pantalon-dockers-hombre",
    name: "Pantalón Dockers Chino Beige",
    description: "Pantalón chino Dockers clásico en color beige/khaki. Corte recto. Algodón premium. Versátil para trabajo o salidas casuales.",
    price: 28000,
    condition: "muy-buen-estado",
    conditionLabel: "Muy buen estado",
    size: "32",
    brand: "Dockers",
    images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"],
    category: "hombre",
    sold: true,
  },

  // MUJER
  {
    id: "saco-mauro-sergio-jacquard",
    name: "Saco Tejido Largo Jacquard Mauro Sergio",
    description: "Saco largo tejido jacquard de manga caída sin botones. Marca Mauro Sergio, colección Otoño/Invierno. Hilado rústico poliacrílico con lana. Alta capacidad calórica, ideal como segunda piel. Estilo elegante y cómodo. Estado impecable.",
    price: 12000,
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    size: "M",
    brand: "Mauro Sergio",
    images: ["/images/sacon-jackard-mauro-sergio-usado/sacon-mauro-sergio-hermoso-impecable.png"],
    category: "mujer",
  },
  {
    id: "vestido-naranja-brasil",
    name: "Vestido Naranja Brasilero",
    description: "Hermoso vestido naranja de origen brasilero. Tela de excelente calidad, con un solo uso. Corte elegante y favorecedor. Ideal para eventos especiales o salidas de verano.",
    price: 30000,
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    size: "M",
    brand: "Brasil",
    images: ["/images/vestido-naranja-brasil/vestido-brasilero-excelente-calidad-usado.png"],
    category: "mujer",
  },
  {
    id: "zapatos-picadilly-azul",
    name: "Zapatos Picadilly Azul Taco Medio",
    description: "Elegantes zapatos Picadilly color azul combinado. Taco medio cómodo para uso diario o eventos. Marca brasilera reconocida por su confort. Excelente estado, poco uso.",
    price: 25000,
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    size: "37",
    brand: "Picadilly",
    images: [
      "/images/zapatos-azul-taco-medio-picadilly/zapatos-azul-combinado-taco-medio-picadilly.jpeg",
      "/images/zapatos-azul-taco-medio-picadilly/zapatos-azul-taco-medio-picadilly-se-vende.jpeg",
      "/images/zapatos-azul-taco-medio-picadilly/zapatos-azul-taco-medio-picadilly.jpeg",
    ],
    category: "mujer",
  },
  {
    id: "vestido-hym-mujer",
    name: "Vestido H&M Floral Verano",
    description: "Vestido midi H&M con estampado floral. Tela liviana y fresca. Escote en V con botones decorativos. Perfecto para primavera-verano.",
    price: 25000,
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    size: "S",
    brand: "H&M",
    images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80"],
    category: "mujer",
    sold: true,
  },
  {
    id: "blazer-mango-mujer",
    name: "Blazer Mango Oversize Rosa",
    description: "Blazer oversize Mango en tono rosa palo. Un solo botón. Hombreras estructuradas. Tendencia actual. Combina con jeans o vestidos.",
    price: 42000,
    condition: "nuevo-con-etiqueta",
    conditionLabel: "Nuevo con etiqueta",
    size: "M",
    brand: "Mango",
    images: ["https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80"],
    category: "mujer",
    sold: true,
  },
  {
    id: "jeans-levis-mujer",
    name: "Jeans Levi's 501 Original",
    description: "Jeans Levi's 501 para mujer. Tiro alto, corte recto clásico. Color azul índigo. El jean que nunca pasa de moda.",
    price: 38000,
    condition: "muy-buen-estado",
    conditionLabel: "Muy buen estado",
    size: "28",
    brand: "Levi's",
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"],
    category: "mujer",
    sold: true,
  },
  {
    id: "blusa-massimo-mujer",
    name: "Blusa Massimo Dutti Seda",
    description: "Blusa Massimo Dutti en mezcla de seda. Color crema. Cuello con lazo. Elegante para oficina o eventos. Caída impecable.",
    price: 32000,
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    size: "S",
    brand: "Massimo Dutti",
    images: ["https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80"],
    category: "mujer",
    sold: true,
  },

  // ACCESORIOS
  {
    id: "cartera-michael-kors",
    name: "Cartera Michael Kors Jet Set",
    description: "Cartera Michael Kors modelo Jet Set en cuero saffiano negro. Herrajes dorados. Múltiples compartimentos. Logo MK grabado. Elegancia clásica.",
    price: 85000,
    condition: "muy-buen-estado",
    conditionLabel: "Muy buen estado",
    brand: "Michael Kors",
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"],
    category: "accesorios",
    sold: true,
  },
  {
    id: "reloj-casio-vintage",
    name: "Reloj Casio A168 Vintage Dorado",
    description: "Reloj Casio A168WG dorado retro. Alarma, cronómetro, luz. El clásico de los 80s que volvió con todo. Unisex.",
    price: 25000,
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    brand: "Casio",
    images: ["https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80"],
    category: "accesorios",
    sold: true,
  },
  {
    id: "bufanda-burberry",
    name: "Bufanda Burberry Check Clásica",
    description: "Bufanda Burberry con el icónico estampado check. 100% lana de cachemira. Hecha en Escocia. Pieza atemporal de lujo.",
    price: 95000,
    condition: "muy-buen-estado",
    conditionLabel: "Muy buen estado",
    brand: "Burberry",
    images: ["https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80"],
    category: "accesorios",
    sold: true,
  },
  {
    id: "anteojos-rayban-aviator",
    name: "Anteojos Ray-Ban Aviator Classic",
    description: "Ray-Ban Aviator originales con marco dorado y lentes verdes G-15. El modelo que usaron los pilotos de la USAF. Incluye estuche original.",
    price: 75000,
    condition: "buen-estado",
    conditionLabel: "Buen estado",
    brand: "Ray-Ban",
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"],
    category: "accesorios",
    sold: true,
  },
];

export function getClothingByCategory(category: ClothingCategory): ClothingItem[] {
  return clothingItems.filter((item) => item.category === category);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}




