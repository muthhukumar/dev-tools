import Link from 'next/link'
import { useRouter } from 'next/router'
import { Divider, Text, Container, Flex, Badge, VStack } from '@chakra-ui/react'
import { BsArrowRight } from 'react-icons/bs'
import { ThemeSwitchButton } from './DarkModeSwitch'

export const Footer = () => {
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
      px="0"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <BsArrowRight size={30} /> <Text ml="4">See something missing?</Text>
        </Flex>
        <Badge variant="subtle" p="2">
          Request Utility
        </Badge>
      </Flex>
      <Divider my="6" w="100%" />
      <Flex alignItems="center" justifyContent="space-between">
        <VStack>
          <Link href="/">
            <a>
              <Text>Home</Text>
            </a>
          </Link>
        </VStack>
        <ThemeSwitchButton />
      </Flex>
    </Container>
  )
}
