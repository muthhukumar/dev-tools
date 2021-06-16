import * as React from 'react'
import { Heading, TextProps } from '@chakra-ui/react'

export const UtilityTitle = (props: TextProps) => {
  return <Heading fontWeight="hairline" fontSize={['3xl', '4xl', '6xl', '8xl']} {...props} />
}
