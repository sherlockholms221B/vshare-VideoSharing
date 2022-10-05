import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'qzflffgq',
  dataset: 'production',
  apiVersion: '2022-09-20',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_PROJECT_TOKEN,

  ignoreBrowserTokenWarning: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
