import * as React from 'react'
import { Text, Flex, IconButton } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useRouter } from 'next/router'

import { Wrapper } from './Wrapper'

export const Header = () => {
  const router = useRouter()

  const pathname = router.pathname

  const isUtilityPath = pathname.includes('/utility')

  return (
    <Wrapper
      display="flex"
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      mx="auto"
      mt="8"
      mb="14"
      pt="4"
      pb="4"
    >
      <IconButton
        variant="ghost"
        aria-label="Search database"
        icon={<IoIosArrowRoundBack size={30} />}
        visibility={isUtilityPath ? 'visible' : 'hidden'}
        rounded="full"
        onClick={() => router.back()}
      />
      <Text fontSize="xl" fontWeight="semibold" alignSelf="center">
        Dev Utils
      </Text>
      <Flex justifySelf="flex-end">
        <FaTwitter />
      </Flex>
    </Wrapper>
  )
}
