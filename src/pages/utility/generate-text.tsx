import * as React from 'react'
import { Text, Container } from '@chakra-ui/react'

import { Page } from '../../components/Page'

const GenerateText = () => {
  return (
    <Page>
      <Container minW="container.lg" mt="12" p="0">
        <Text fontWeight="semibold" fontSize="2xl">
          This will be coming soon...
        </Text>
      </Container>
    </Page>
  )
}

export default GenerateText
