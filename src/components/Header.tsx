import * as React from 'react'
import { Text, Flex, IconButton } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa'
import { BsBoxArrowInLeft } from 'react-icons/bs'
import { useRouter } from 'next/dist/client/router'

export const Header = () => {
  const router = useRouter()

  const pathname = router.pathname

  const isUtilityPath = pathname.includes('/utility')

  return (
    <Flex
      alignItems="center"
      py="8"
      justifyContent="space-between"
      maxW="container.lg"
      mx="auto"
      px={[12, 6, 0, 0]}
    >
      <IconButton
        variant="ghost"
        aria-label="Search database"
        icon={<BsBoxArrowInLeft size={22} />}
        visibility={isUtilityPath ? 'visible' : 'hidden'}
        rounded="full"
        onClick={() => router.back()}
      />
      <Text fontSize="2xl" fontWeight="bold" alignSelf="center">
        Dev Utils
      </Text>
      <Flex justifySelf="flex-end">
        <FaTwitter />
      </Flex>
    </Flex>
  )
}
