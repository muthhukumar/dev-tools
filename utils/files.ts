import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import type { Utility } from './types/utilitiy'

const utilityDirectory = path.join(process.cwd(), '/pages/utility')

export function getUtilitySlugs(): Array<Utility> {
  const files = fs.readdirSync(utilityDirectory)
  return files.map((file) => {
    const slug = file.replace(/\.tsx$/, '')
    return {
      id: uuidv4(),
      slug,
      href: `/utility/${slug}`,
    }
  })
}

// POSTS_PATH is useful when you want to get the path to a specific file
export const SNIPPETS_PATH = path.join(process.cwd(), 'snippets')

// postFilePaths is the list of all mdx files inside the SNIPPETS_PATH directory
export const snippetFilePaths = fs
  .readdirSync(SNIPPETS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))
