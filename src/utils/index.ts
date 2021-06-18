export function getFilteredData<DataType>(
  data: Array<DataType>,
  queryTerm: string,
  field: string,
): Array<DataType> {
  return queryTerm
    ? data.filter((entry) => String(entry[field]).toLowerCase().includes(queryTerm.toLowerCase()))
    : data
}

export const copyToClipboard = (data, successCallback?: (any) => void) => {
  try {
    navigator.clipboard.writeText(data)
    successCallback(data)
  } catch {}
}
