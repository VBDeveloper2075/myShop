import type { StructureResolver } from 'sanity/structure'
import { PackageIcon, HangerIcon } from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('SE VENDE - Administración')
    .items([
      // Productos Generales
      S.listItem()
        .title('Productos')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Productos')
            .items([
              S.listItem()
                .title('Todos los Productos')
                .child(
                  S.documentTypeList('product')
                    .title('Todos los Productos')
                ),
              S.divider(),
              S.listItem()
                .title('Disponibles')
                .child(
                  S.documentTypeList('product')
                    .title('Productos Disponibles')
                    .filter('_type == "product" && inStock == true')
                ),
              S.listItem()
                .title('Vendidos')
                .child(
                  S.documentTypeList('product')
                    .title('Productos Vendidos')
                    .filter('_type == "product" && inStock == false')
                ),
              S.listItem()
                .title('Destacados')
                .child(
                  S.documentTypeList('product')
                    .title('Productos Destacados')
                    .filter('_type == "product" && featured == true')
                ),
            ])
        ),
      
      // Ropa y Accesorios
      S.listItem()
        .title('Ropa & Accesorios')
        .icon(HangerIcon)
        .child(
          S.list()
            .title('Ropa & Accesorios')
            .items([
              S.listItem()
                .title('Todas las Prendas')
                .child(
                  S.documentTypeList('clothingItem')
                    .title('Todas las Prendas')
                ),
              S.divider(),
              S.listItem()
                .title('Mujer')
                .child(
                  S.documentTypeList('clothingItem')
                    .title('Ropa Mujer')
                    .filter('_type == "clothingItem" && category == "mujer"')
                ),
              S.listItem()
                .title('Hombre')
                .child(
                  S.documentTypeList('clothingItem')
                    .title('Ropa Hombre')
                    .filter('_type == "clothingItem" && category == "hombre"')
                ),
              S.listItem()
                .title('Accesorios')
                .child(
                  S.documentTypeList('clothingItem')
                    .title('Accesorios')
                    .filter('_type == "clothingItem" && category == "accesorios"')
                ),
              S.divider(),
              S.listItem()
                .title('Vendidos')
                .child(
                  S.documentTypeList('clothingItem')
                    .title('Vendidos')
                    .filter('_type == "clothingItem" && sold == true')
                ),
            ])
        ),
    ])
