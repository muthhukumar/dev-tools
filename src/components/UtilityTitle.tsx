import * as React from 'react'
import { Heading, TextProps } from '@chakra-ui/react'

export const UtilityTitle = (props: TextProps) => {
  return <Heading fontWeight="hairline" fontSize={['4xl', '4xl', '6xl', '7xl']} {...props} />
}
