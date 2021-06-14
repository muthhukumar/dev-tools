import * as React from 'react'

import { Flex, FlexProps } from '@chakra-ui/react'

export const Wrapper = (props: FlexProps) => {
  return <Flex flexDir="column" mx="auto" maxW="container.lg" p={[12, 8, 6, 0]} {...props} />
}
