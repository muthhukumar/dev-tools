export function getFilteredData<DataType>(
  data: Array<DataType>,
  queryTerm: string,
  field: string,
): Array<DataType> {
  return queryTerm
    ? data.filter((entry) => String(entry[field]).toLowerCase().includes(queryTerm.toLowerCase()))
    : data
}

export const copyToClipboard = (data) => navigator.clipboard.writeText(data)
