import * as React from 'react'
import Link from 'next/link'
import { Grid, Badge, chakra, Container, Text, Flex, Box, Input } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

import { Page } from '../components/Page'
import { getUtilitySlugs } from '../utils/files'

const badgeColors = ['alert', 'violet', 'cyan', 'secondary']

const Index = ({ topUtilities = [] }) => {
  return (
    <Page>
      <Container maxW="container.md">
        <Container centerContent minW="100%">
          <Text fontWeight="hairline" fontSize="5xl">
            Muthu's Dev utilities
          </Text>
          <Text textAlign="center" mt="2">
            Hey! I'm{' '}
            <Link href="https://nullish.in">
              <chakra.strong>@muthu</chakra.strong>
            </Link>{' '}
            and this is the list of dev utilities I have created.
          </Text>
        </Container>
        <Flex
          borderColor="white.50"
          borderWidth="1px"
          w="100%"
          rounded="sm"
          mt="8"
          alignItems="center"
          p="4"
        >
          <Badge colorScheme="gray" p="2">
            devUtils.nullish.in
          </Badge>{' '}
          <Text mx="2" fontSize="2xl">
            /
          </Text>
          <Input variant="unstyled" fontSize="2xl" placeholder="Search..." />
          <FiSearch size={30} />
        </Flex>
        {/* <HStack > */}
        <Grid templateColumns="repeat(4, 1fr)" gap="2" mt="8">
          {topUtilities.map(({ id, slug, href }, index) => (
            <Link href={href} key={id}>
              <a style={{ width: '100%' }}>
                <Badge
                  key={slug}
                  w="100%"
                  p="4"
                  rounded="sm"
                  bg={badgeColors[index % (topUtilities.length - 2)]}
                  mt="1"
                >
                  <Text color="white">{slug}</Text>
                </Badge>
              </a>
            </Link>
          ))}
        </Grid>
        {/* </HStack> */}
      </Container>
    </Page>
  )
}

// export const ge

export const getStaticProps = () => {
  const topUtilities = getUtilitySlugs()
  return {
    props: {
      topUtilities,
    },
  }
}

export default Index
