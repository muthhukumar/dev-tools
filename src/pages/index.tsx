import * as React from 'react'
import Link from 'next/link'
import { Heading, Grid, chakra, Container, Text, Flex, Input, Button } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { NextSeo } from 'next-seo'
import { sentenceCase } from 'change-case'

import { Page } from '../components/Page'
import { getUtilitySlugs } from '../utils/files'
import { useSearch } from '../utils/hooks/useSearch'
import { GradientWrapper } from '../components/GradientWrapper'
import { useColor } from '../utils/hooks/useColor'

import type { Utility } from '../utils/types/utilitiy'

const Index = ({ topUtilities = [] }) => {
  const {
    searchTerm,
    setSearchTerm,
    result: filteredTopUtilities,
  } = useSearch<Utility>(topUtilities, 'slug')

  const { moon, moonInvert } = useColor()

  return (
    <Page>
      <NextSeo
        title="DevTools and Utilities"
        description="A ridiculous amount of collection of dev tools and utilities."
      />
      <Container maxW="container.md">
        <Container centerContent minW="100%" p="0">
          <Heading fontWeight="hairline" fontSize={['3xl', '4xl', '6xl', '8xl']}>
            Muthu&apos;s DevTools and Utilities
          </Heading>
          <Text mt="8" fontSize={['sm', 'md', 'lg', 'lg']}>
            Hey! I&apos;m{' '}
            <Link href="https://nullish.in">
              <a>
                <chakra.strong>@muthu</chakra.strong>
              </a>
            </Link>{' '}
            and this is a modest collection of dev tools and utilities I have created.
          </Text>
        </Container>
        <GradientWrapper height="80px" mt="16">
          <Flex
            borderColor="white.50"
            borderWidth="1px"
            w="100%"
            h="100%"
            px="4"
            background={moon}
            rounded="xl"
            alignItems="center"
          >
            <Input
              variant="unstyled"
              fontSize="2xl"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch size={30} />
          </Flex>
        </GradientWrapper>
        <Grid
          templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']}
          gap="2"
          mt="8"
        >
          {filteredTopUtilities.map(({ id, slug, href }, index) => (
            <Link href={href} key={id}>
              <a style={{ width: '100%' }}>
                <Button key={slug} bg={moonInvert} size="lg" mt="1" rounded="xl">
                  <Text color={moon}>{sentenceCase(slug) ? sentenceCase(slug) : slug}</Text>
                </Button>
              </a>
            </Link>
          ))}
        </Grid>
      </Container>
    </Page>
  )
}

export const getStaticProps = () => {
  const topUtilities = getUtilitySlugs()
  return {
    props: {
      topUtilities,
    },
  }
}

export default Index
