/**
 * Script de migración de productos a Sanity
 * 
 * Este script migra los productos hardcoded a Sanity CMS.
 * 
 * Para ejecutar:
 * 1. Asegúrate de tener las variables de entorno configuradas
 * 2. Ejecuta: npx ts-node --esm scripts/migrate-products-to-sanity.ts
 * 
 * O usa el panel de Sanity Studio para agregar productos manualmente.
 */

// Datos de productos originales (copiados del archivo eliminado)
const productsToMigrate = [
  {
    title: "PC Desktop Intel Core i7-2600",
    slug: "pc-desktop-i7-2600",
    description: "PC de escritorio potente con procesador Intel Core i7-2600 @ 3.40GHz (4 núcleos, 8 hilos). 16GB RAM DDR3. Placa de video dedicada NVIDIA GeForce GTS 450. Fuente RGPS 600W certificada. Incluye HDD. Sistema Kubuntu 23.04 instalado y funcionando (se puede instalar Windows si lo preferís). Ideal para oficina, programación, navegación o tareas multimedia.",
    conditionDescription: "Funcionando perfectamente. Gabinete con marcas de uso normales. Interior limpio. Todos los puertos funcionan: USB, audio, VGA, DVI, HDMI (por GPU). Se entrega con cable de alimentación y cable HDMI. Lista para usar.",
    listPrice: 380000,
    condition: "buen-estado",
    category: "tecnologia",
    inStock: true,
    featured: true,
  },
  {
    title: "Conservadora Black+Decker BDC204-LA Frío/Calor",
    slug: "conservadora-black-decker-bdc204",
    description: "Nevera portátil Black+Decker modelo BDC204-LA de 6 litros. Doble función: enfría hasta 22°C por debajo de la temperatura ambiente o calienta hasta 50°C. Conexión 12V para encendedor de auto. Ideal para viajes, camping, picnic o mantener medicamentos. Tapa abatible con traba. Diseño compacto y liviano.",
    conditionDescription: "Funciona perfectamente en ambas modalidades (frío y calor). Exterior con mínimas marcas de uso. Interior impecable. Cable 12V completo. Se incluye caja original. Probada antes de publicar.",
    listPrice: 60000,
    condition: "muy-buen-estado",
    category: "camping",
    inStock: true,
    featured: false,
  },
  {
    title: "Impresora Brother HL-1212W",
    slug: "impresora-brother-laser",
    description: "Impresora láser monocromática compacta con WiFi. Velocidad 21ppm. Diseñada en Japón. Ideal para uso personal o pequeña oficina. Incluye 3 cartuchos de tóner compatible TN-1060 nuevos de alto rendimiento.",
    conditionDescription: "Poco uso, imprime perfecto sin líneas ni manchas. WiFi funcionando correctamente. Se entrega con tóner nuevo compatible TN-1060 de alto rendimiento (3000 páginas). Lista para usar.",
    listPrice: 180000,
    condition: "muy-buen-estado",
    category: "tecnologia",
    inStock: true,
    featured: false,
  },
  {
    title: "Septología - Jon Fosse",
    slug: "septologia-jon-fosse",
    description: "La obra maestra del Premio Nobel de Literatura 2023. Septología es una novela hipnótica y contemplativa que sigue a un pintor viudo en la costa noruega durante siete días. Escrita en un flujo de conciencia único, sin puntos, esta obra explora la fe, el arte, la soledad y los caminos no tomados. Edición Seix Barral con sello 'Premio Nobel'. Una experiencia literaria transformadora.",
    conditionDescription: "Libro leído una vez con sumo cuidado. Tapa y páginas impecables. Tiene algunos marcos de lectura, sin subrayados ni dedicatorias. Lomo perfecto. Edición especial con sello Premio Nobel 2023.",
    listPrice: 30000,
    condition: "como-nuevo",
    category: "libros",
    inStock: true,
    featured: true,
  },
  {
    title: "Caja de Herramientas Profesional Reforzada",
    slug: "caja-herramientas-profesional-reforzada",
    description: "Caja de herramientas de plástico resistente de alta calidad. Medidas aproximadas: 420mm x 225mm x 210mm. De las de antes: plástico grueso y reforzado que no se rompe. Incluye bandeja interior organizadora extraíble. Trabas metálicas resistentes. Ideal para taller, hogar o llevar en el auto.",
    conditionDescription: "Caja usada pero muy bien cuidada. Estructura sólida sin fisuras ni roturas. Trabas funcionando perfectamente. Bandeja interior completa. Lista para durar otros 20 años.",
    listPrice: 25000,
    condition: "muy-buen-estado",
    category: "herramientas",
    inStock: true,
    featured: false,
  },
  {
    title: "Escaladora Elíptica",
    slug: "escaladora-eliptica-usada",
    description: "Escaladora elíptica para ejercicio en casa. Estructura metálica resistente. Movimiento suave y silencioso. Ideal para cardio sin impacto en las articulaciones. Incluye repuestos. Perfecta para mantenerse en forma sin salir de casa.",
    conditionDescription: "Funciona correctamente. Estructura firme y estable. Algunos signos de uso estético. Se incluyen repuestos adicionales. Lista para usar.",
    listPrice: 85000,
    condition: "buen-estado",
    category: "fitness",
    inStock: true,
    featured: true,
  },
  {
    title: "Tablero de Dibujo Técnico con Carpeta N°6",
    slug: "tablero-dibujo-tecnico-n6",
    description: "Tablero de dibujo técnico profesional con carpeta tamaño N°6 incluida. Ideal para estudiantes de arquitectura, diseño o ingeniería. Superficie lisa perfecta para trabajo de precisión. La carpeta protege tus láminas y trabajos.",
    conditionDescription: "Tablero en excelente estado. Superficie sin rayones profundos. Carpeta N°6 incluida y en buen estado. Listo para usar en tus proyectos.",
    listPrice: 35000,
    condition: "muy-buen-estado",
    category: "educacion",
    inStock: true,
    featured: false,
  },
];

console.log(`
===========================================
MIGRACIÓN DE PRODUCTOS A SANITY CMS
===========================================

Para migrar los productos, tienes 2 opciones:

OPCIÓN 1: Usar el Panel de Sanity Studio
-----------------------------------------
1. Inicia el servidor de desarrollo: npm run dev
2. Ve a http://localhost:3000/studio
3. Crea cada producto manualmente con el formulario

OPCIÓN 2: Usar la API de Sanity (programático)
----------------------------------------------
1. Configura el token SANITY_API_WRITE_TOKEN en .env.local
2. Usa este código para migrar:

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'vfocuo38',
  dataset: 'production',
  apiVersion: '2026-01-21',
  token: process.env.SANITY_API_WRITE_TOKEN, // Necesitas un token con permisos de escritura
  useCdn: false,
})

// Migrar productos
for (const product of productsToMigrate) {
  await client.create({
    _type: 'product',
    ...product,
    slug: { current: product.slug },
    // Las imágenes deberás subirlas manualmente o usar la API de assets
  })
}

===========================================
PRODUCTOS A MIGRAR (${productsToMigrate.length} productos):
===========================================
`);

productsToMigrate.forEach((p, i) => {
  console.log(`${i + 1}. ${p.title} - $${p.listPrice.toLocaleString('es-AR')} (${p.condition})`);
});

console.log(`
===========================================
NOTA IMPORTANTE:
===========================================
Las imágenes deben subirse manualmente al panel de Sanity Studio.
El panel de administración estará disponible en: /studio
`);
