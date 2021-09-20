import * as React from 'react'
import fs from 'fs'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import {
  ListItem,
  UnorderedList,
  Text,
  Heading,
  HeadingProps,
  TextProps,
  ListProps,
  ListItemProps,
  OrderedList,
  Code,
  CodeProps,
  VStack,
} from '@chakra-ui/react'
import _ from 'lodash'

import { CustomLink } from '../../../components/Link'
import {
  getCategories,
  getSnippetData,
  getSnippetsOfACategory,
  SNIPPET_CATEGORIES,
} from '../../../utils/files'
import { CategoryWrapper } from '../../../components/CategoryWrapper'

import type { GetStaticPaths, GetStaticProps } from 'next'

const components = {
  a: CustomLink,
  p: (props: TextProps) => <Text {...props} lineHeight="1.8" my="4" fontWeight="thin" />,
  h1: (props: HeadingProps) => <Heading as="h1" size="xl" {...props} py="4" />,
  h2: (props: HeadingProps) => <Heading as="h2" size="lg" {...props} py="4" />,
  h3: (props: HeadingProps) => <Heading as="h3" size="md" {...props} py="4" />,
  h4: (props: HeadingProps) => <Heading as="h4" size="sm" {...props} py="4" />,
  h5: (props: HeadingProps) => <Heading as="h5" size="xs" {...props} py="4" />,
  h6: (props: HeadingProps) => <Heading as="h6" size="xs" {...props} py="4" />,
  ul: (props: ListProps) => <UnorderedList {...props} />,
  li: (props: ListItemProps) => <ListItem {...props} />,
  ol: (props: ListProps) => <OrderedList {...props} />,
  code: (props: CodeProps) => <Code {...props} w="100%" p="4" />,
  Head,
}

type Props = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: {
    [key: string]: any
  }
  snippetsData: Array<{
    title: string
    slug: string
  }>
  categories: Array<string>
}

const Snippet: React.FC<Props> = ({ categories, snippetsData, source, frontMatter }) => {
  return (
    <CategoryWrapper categories={categories} snippetsData={snippetsData} showSnippets>
      <VStack alignItems="flex-start" my="4" w="100%" maxW="container.md" pl="4">
        <Heading fontSize="3xl" pb="4">
          {frontMatter.title}
        </Heading>
        {frontMatter.description && <Text>{frontMatter.description}</Text>}
        <MDXRemote {...source} components={components} />
        <header>
          <nav>
            <Link href="/snippets">
              <a>
                <Text my="4">👈 Go back home</Text>
              </a>
            </Link>
          </nav>
        </header>
      </VStack>
    </CategoryWrapper>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categories = getCategories()

  const snippets = getSnippetsOfACategory(path.join(SNIPPET_CATEGORIES, `${params?.category}`))

  const snippetsData = snippets.map((snippet) => {
    if (params && 'category' in params && typeof params?.category === 'string') {
      return {
        ...getSnippetData(snippet, params?.category ?? '', ['title']),
        slug: snippet,
      }
    }
    return null
  })

  const postFilePath = path.join(SNIPPET_CATEGORIES, `${params?.category}`, `${params?.slug}.mdx`)

  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      categories,
      snippetsData,
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = _.flatten(
    getCategories().map((category) => {
      return getSnippetsOfACategory(path.join(SNIPPET_CATEGORIES, category)).map((snippet) => ({
        params: { category, slug: snippet.replace(/\.mdx?$/, '') },
      }))
    }),
  )

  return {
    paths,
    fallback: false,
  }
}

export default Snippet
