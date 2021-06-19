import * as React from 'react'

import { getFilteredData } from '..'

export function useSearch<DataType>(
  data: Array<DataType> = [],
  field: keyof DataType,
): {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  result: Array<DataType>
} {
  const [searchTerm, setSearchTerm] = React.useState('')

  const result = getFilteredData<DataType>(data, searchTerm, field)

  return {
    searchTerm,
    setSearchTerm,
    result,
  }
}
