import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import type { Utility } from './types/utilitiy'

const UTILITY_CATEGORY = path.join(process.cwd(), '/pages/utility')

export function getUtilitySlugs(): Array<Utility> {
  const files = fs.readdirSync(UTILITY_CATEGORY)
  return files.map((file) => {
    const slug = file.replace(/\.tsx$/, '')
    return {
      id: uuidv4(),
      slug,
      href: `/utility/${slug}`,
    }
  })
}

export const SNIPPET_CATEGORIES = path.join(process.cwd(), 'snippets')

export const snippetFilePaths = fs
  .readdirSync(SNIPPET_CATEGORIES)
  .filter((path) => /\.mdx?$/.test(path))

export const getSnippetsOfACategory = (path: string): Array<string> =>
  fs.readdirSync(path).filter((path) => /\.mdx?$/.test(path))

export const getCategories = (source: string = SNIPPET_CATEGORIES): Array<string> => {
  return fs
    .readdirSync(source, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((directory) => directory.name)
}

export const getSnippetData = (
  slug: string,
  category: string,
  fields: Array<string> = [],
): {
  [key: string]: string
} => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(SNIPPET_CATEGORIES, category, slug)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: {
    [key: string]: string
  } = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}
