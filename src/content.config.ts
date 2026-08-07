import { glob, file } from 'astro/loaders'
import { defineCollection } from 'astro:content'

import {
  pageSchema,
  postSchema,
  projectSchema,
  photoSchema,
  librarySchema,
} from '~/schema'

const pages = defineCollection({
  loader: glob({ base: './src/pages', pattern: '**/*.mdx' }),
  schema: pageSchema,
})

const home = defineCollection({
  loader: glob({ base: './src/content/home', pattern: 'index.{md,mdx}' }),
})

const writing = defineCollection({
  loader: glob({
    base: './src/content/writing',
    pattern: '**/[^_]*.{md,mdx}',
  }),
  schema: postSchema,
})

const projects = defineCollection({
  loader: file('./src/content/projects/data.json'),
  schema: projectSchema,
})

const photos = defineCollection({
  loader: file('src/content/photos/data.json'),
  schema: photoSchema,
})

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/[^_]*.{md,mdx}' }),
  schema: postSchema,
})

const library = defineCollection({
  loader: file('./src/content/library/data.json'),
  schema: librarySchema,
})

export const collections = {
  pages,
  home,
  writing,
  projects,
  photos,
  notes,
  library,
}
