import fs from 'fs'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

const utilityDirectory = join(process.cwd(), 'src/pages/utility')

export function getUtilitySlugs() {
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
