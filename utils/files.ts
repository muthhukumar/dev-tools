import fs from 'fs'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

import type { Utility } from './types/utilitiy'

const utilityDirectory = join(process.cwd(), '/pages/utility')

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
