import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { clothingItem } from './clothingItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, clothingItem],
}
