export function getFilteredData<DataType>(
  data: Array<DataType>,
  queryTerm: string,
  field: keyof DataType,
): Array<DataType> {
  return queryTerm
    ? data.filter((entry) => {
        if (field in entry) {
          return String(entry[field]).toLowerCase().includes(queryTerm.toLowerCase())
        }
        return false
      })
    : data
}

export const copyToClipboard = (data: string, successCallback?: (data: any) => void): void => {
  try {
    navigator.clipboard.writeText(data)
    if (successCallback) successCallback(data)
  } catch {
    return
  }
}
