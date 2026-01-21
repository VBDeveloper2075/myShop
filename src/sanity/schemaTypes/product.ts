import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Producto',
      type: 'string',
      validation: (rule) => rule.required().max(100),
      description: 'Nombre del producto (máximo 100 caracteres)',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      description: 'URL amigable generada automáticamente',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
      description: 'Descripción detallada del producto',
    }),
    defineField({
      name: 'conditionDescription',
      title: 'Descripción del Estado',
      type: 'text',
      rows: 3,
      description: 'Detalles específicos sobre el estado del producto',
    }),
    defineField({
      name: 'listPrice',
      title: 'Precio de Lista',
      type: 'number',
      validation: (rule) => rule.required().positive(),
      description: 'Precio en pesos argentinos (sin descuento)',
    }),
    defineField({
      name: 'transferPrice',
      title: 'Precio con Transferencia',
      type: 'number',
      validation: (rule) => rule.positive(),
      description: 'Precio con descuento por pago con transferencia (opcional - se calcula 15% menos si no se indica)',
    }),
    defineField({
      name: 'condition',
      title: 'Estado del Producto',
      type: 'string',
      options: {
        list: [
          { title: 'Nuevo', value: 'nuevo' },
          { title: 'Como nuevo', value: 'como-nuevo' },
          { title: 'Muy buen estado', value: 'muy-buen-estado' },
          { title: 'Buen estado', value: 'buen-estado' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      initialValue: 'buen-estado',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Tecnología', value: 'tecnologia' },
          { title: 'Libros', value: 'libros' },
          { title: 'Hogar', value: 'hogar' },
          { title: 'Herramientas', value: 'herramientas' },
          { title: 'Fitness', value: 'fitness' },
          { title: 'Educación', value: 'educacion' },
          { title: 'Camping', value: 'camping' },
          { title: 'Radioafición', value: 'radioaficion' },
          { title: 'Otro', value: 'otro' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string',
              description: 'Descripción para accesibilidad (se genera automáticamente si se deja vacío)',
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
      description: 'Al menos una imagen es requerida. Las imágenes se optimizan automáticamente.',
    }),
    defineField({
      name: 'inStock',
      title: 'Disponible',
      type: 'boolean',
      initialValue: true,
      description: 'Desmarcar para mostrar como "Vendido"',
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
      description: 'Mostrar en la sección destacada',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'images.0',
      inStock: 'inStock',
    },
    prepare({ title, subtitle, media, inStock }) {
      return {
        title: `${inStock === false ? '🔴 VENDIDO - ' : ''}${title}`,
        subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : '',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Más reciente',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Precio (menor a mayor)',
      name: 'priceAsc',
      by: [{ field: 'listPrice', direction: 'asc' }],
    },
    {
      title: 'Precio (mayor a menor)',
      name: 'priceDesc',
      by: [{ field: 'listPrice', direction: 'desc' }],
    },
  ],
})
