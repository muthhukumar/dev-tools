import * as React from 'react'

import { Container, ContainerProps } from '@chakra-ui/react'

export const Wrapper = (props: ContainerProps) => {
  return <Container maxW="container.lg" p={[12, 8, 6, 0]} {...props} />
}
