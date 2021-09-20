import * as React from 'react'

import { getCategories } from '../utils/files'
import { CategoryWrapper } from '../components/CategoryWrapper'

import type { GetStaticProps } from 'next'

type Props = {
  categories: Array<string>
}

const Snippets: React.FC<Props> = ({ categories }) => {
  return <CategoryWrapper categories={categories} />
}

export const getStaticProps: GetStaticProps = () => {
  const categories = getCategories()

  return { props: { categories } }
}

export default Snippets
