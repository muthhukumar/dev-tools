import Link from 'next/link'
import { useRouter } from 'next/router'
import { Divider, Text, Container, Flex, VStack, Button } from '@chakra-ui/react'
import { BsArrowRight } from 'react-icons/bs'
import { ThemeSwitchButton } from './DarkModeSwitch'
import React from 'react'

export const Footer: React.FC = () => {
  const router = useRouter()

  const pathname = router.pathname

  const isUtilityPath = pathname.includes('/utility')

  return (
    <Container
      maxW={isUtilityPath ? 'container.lg' : 'container.md'}
      borderTopWidth="1px"
      borderTopColor="grey"
      mt="auto"
      py="8"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <BsArrowRight size={30} />{' '}
          <Text ml="4" fontSize="lg">
            See something missing?
          </Text>
        </Flex>
        <Button size="lg" mt="1" variant="moonInvert">
          <Text fontSize="lg">Request Utility</Text>
        </Button>
      </Flex>
      <Divider my="6" w="100%" />
      <Flex alignItems="center" justifyContent="space-between">
        <VStack>
          <Link href="/">
            <a>
              <Text fontSize="lg">Home</Text>
            </a>
          </Link>
        </VStack>
        <ThemeSwitchButton />
      </Flex>
    </Container>
  )
}
