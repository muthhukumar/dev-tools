import * as React from 'react'
import path from 'path'

import {
  getCategories,
  getSnippetData,
  getSnippetsOfACategory,
  SNIPPET_CATEGORIES,
} from '../../utils/files'
import { CategoryWrapper } from '../../components/CategoryWrapper'

import type { GetStaticPaths, GetStaticProps } from 'next'

type Props = {
  snippetsData: Array<{
    title: string
    slug: string
  }>
  categories: Array<string>
}

const Snippet: React.FC<Props> = ({ categories, snippetsData }) => {
  return <CategoryWrapper categories={categories} snippetsData={snippetsData} showSnippets />
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

  return {
    props: {
      categories,
      snippetsData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getCategories().map((category) => ({ params: { category } }))
  return {
    paths,
    fallback: false,
  }
}

export default Snippet
