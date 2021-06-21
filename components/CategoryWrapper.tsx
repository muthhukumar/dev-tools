import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Text,
  Container,
  Flex,
  HStack,
  Input,
  VStack,
  BreadcrumbLink,
  Breadcrumb,
  BreadcrumbItem,
  TextProps,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { ChevronRightIcon } from '@chakra-ui/icons'
import _ from 'lodash'

type Props = {
  categories: Array<string>
  snippetsData?: Array<{
    title: string
    slug: string
  }>
  showSnippets?: boolean
}

const getActiveProps = (
  expect: string | number,
  current: string | number,
  props: TextProps,
): Record<string, unknown> | typeof props => {
  return expect === current ? props : {}
}

export const CategoryWrapper: React.FC<Props> = ({
  snippetsData,
  categories = [],
  children,
  showSnippets,
}) => {
  const router = useRouter()

  const actualCategory = typeof router.query?.category === 'string' ? router.query?.category : ''
  const slug = typeof router.query?.slug === 'string' ? router.query?.slug : ''

  const renderSnippets = () => {
    if (snippetsData && snippetsData.length > 0) {
      return (
        <VStack pl="6" alignItems="flex-start" spacing="3" h="100%" minW="72">
          {snippetsData.map((snippet) => (
            <Link
              href={`/snippets/${actualCategory}/${snippet.slug.replace(/\.mdx?$/, '')}`}
              key={snippet.slug}
            >
              <a>
                <Text
                  transition="all 100ms ease-out"
                  isTruncated
                  {...getActiveProps(slug, snippet.slug.replace(/\.mdx?$/, ''), {
                    p: 2,
                    rounded: 'md',
                    minW: '100%',
                    borderWidth: '1px',
                    transition: 'all 150ms ease-in',
                  })}
                >
                  {snippet.title}
                </Text>
              </a>
            </Link>
          ))}
        </VStack>
      )
    }
    return (
      <Container minW="100%" maxW="none" display="flex" alignItems="center">
        <Text textAlign="left" w="100%">
          No snippets found
        </Text>
      </Container>
    )
  }
  return (
    <Container minH="100vh" maxW="100%" py="6">
      <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb="6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/snippets" as={Link}>
            <a>
              <Text fontSize="xl">Snippets</Text>
            </a>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {actualCategory && (
          <BreadcrumbItem>
            <BreadcrumbLink href={`/snippets/${actualCategory}`} as={Link}>
              <a>
                <Text fontSize="xl">{_.capitalize(actualCategory)}</Text>
              </a>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {slug && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/snippets/${actualCategory}/${slug}`} as={Link}>
              <a>
                <Text fontSize="xl">{_.capitalize(slug)}</Text>
              </a>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <HStack alignItems="flex-start" justifyContent="flex-start" h="100%">
        <VStack minH="100%" minW="64" alignItems="flex-start">
          <Flex
            p="4"
            alignItems="center"
            justifyContent="space-between"
            borderWidth="1px"
            mb="4"
            w="100%"
          >
            <Input
              variant="unstyled"
              placeholder="Search..."
              // value={searchTerm}
              w="100%"
              // onChange={() => {}}
            />
            <FiSearch size={15} />
          </Flex>
          {categories.map((category) => (
            <Link href={`/snippets/${category}`} key={category}>
              <a style={{ width: '100%' }}>
                <Text
                  px="4"
                  transition="all 100ms ease-out"
                  isTruncated
                  {...getActiveProps(actualCategory, category, {
                    p: 2,
                    rounded: 'md',
                    minW: '98%',
                    borderWidth: '1px',
                    transition: 'all 150ms ease-in',
                    ml: 'auto',
                  })}
                >
                  {_.capitalize(category)}
                </Text>
              </a>
            </Link>
          ))}
        </VStack>
        {showSnippets && renderSnippets()}
        {children}
      </HStack>
    </Container>
  )
}
