import * as React from 'react'

import { getFilteredData } from '..'

export function useSearch<DataType>(data: Array<DataType> = [], field: string) {
  const [searchTerm, setSearchTerm] = React.useState('')

  const result = getFilteredData<DataType>(data, searchTerm, field)

  return {
    searchTerm,
    setSearchTerm,
    result,
  }
}
