import { defineField, defineType } from 'sanity'
import { HangerIcon } from '@sanity/icons'

export const clothingItem = defineType({
  name: 'clothingItem',
  title: 'Prenda / Ropa',
  type: 'document',
  icon: HangerIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Prenda',
      type: 'string',
      validation: (rule) => rule.required().max(100),
      description: 'Nombre descriptivo de la prenda',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: (rule) => rule.required().positive(),
      description: 'Precio en pesos argentinos',
    }),
    defineField({
      name: 'condition',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'Nuevo con etiqueta', value: 'nuevo-con-etiqueta' },
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
          { title: 'Mujer', value: 'mujer' },
          { title: 'Hombre', value: 'hombre' },
          { title: 'Accesorios', value: 'accesorios' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Talle',
      type: 'string',
      description: 'Ej: S, M, L, XL, 37, 42, etc.',
    }),
    defineField({
      name: 'brand',
      title: 'Marca',
      type: 'string',
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
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'sold',
      title: 'Vendido',
      type: 'boolean',
      initialValue: false,
      description: 'Marcar como vendido',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      brand: 'brand',
      category: 'category',
      media: 'images.0',
      sold: 'sold',
    },
    prepare({ title, brand, category, media, sold }) {
      const subtitle = [brand, category].filter(Boolean).join(' - ')
      return {
        title: `${sold ? '🔴 VENDIDO - ' : ''}${title}`,
        subtitle,
        media,
      }
    },
  },
})
