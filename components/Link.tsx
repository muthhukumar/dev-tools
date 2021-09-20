import * as React from 'react'
import Link from 'next/link'

import type { LinkProps } from 'next/link'

export const CustomLink: React.FC<LinkProps> = ({ as = undefined, href, ...otherProps }) => {
  return (
    <Link as={as} href={href}>
      <a {...otherProps} />
    </Link>
  )
}
