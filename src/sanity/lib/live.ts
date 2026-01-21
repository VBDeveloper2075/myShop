import { defineLive } from 'next-sanity'
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({ 
  client: client.withConfig({ 
    apiVersion: 'vX' 
  }),
  // Descomenta estas líneas cuando tengas un token configurado
  // serverToken: process.env.SANITY_API_READ_TOKEN,
  // browserToken: process.env.SANITY_API_READ_TOKEN,
})
