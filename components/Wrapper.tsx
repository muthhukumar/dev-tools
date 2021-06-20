import * as React from 'react'

import { Flex, FlexProps } from '@chakra-ui/react'

export const Wrapper: React.FC<FlexProps> = (props) => {
  return <Flex flexDir="column" mx="auto" maxW="container.lg" p={[4, 4, 6, 0]} {...props} />
}
