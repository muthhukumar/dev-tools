import { useSWRInfinite } from 'swr'
import { useDebounce } from './useDebounce'

const fetcher = (url) => fetch(url).then((res) => res.json())

const apiKey = process.env.NEXT_PUBLIC_PIXABAY

export const PAGE_SIZE = 20

export type ImageProperties = {
  id: number
  largeImageURL: string
  previewURL: string
  imageHeight: number
  imageWidth: number
}

type PixabayResponse = {
  total: number
  totalHits: number
  hits: Array<ImageProperties>
}

export const useInfiniteImage = ({ query, debounceDuration = 1000 }) => {
  const debounceQuery = useDebounce<string>(query, debounceDuration)

  const { data, error, size, ...swrProps } = useSWRInfinite<PixabayResponse>(
    debounceQuery
      ? (index) =>
          `https://pixabay.com/api/?key=${apiKey}&orientation=horizontal&q=${debounceQuery}&page=${
            index + 1
          }&per_page=${PAGE_SIZE}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      persistSize: true,
    },
  )

  const images = data && typeof data !== 'number' ? [].concat(...data) : []
  const isLoadingInitialData = query && !data && !error
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.hits?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.hits.length < PAGE_SIZE)

  const hasData = !isLoadingInitialData && data?.[0]?.hits.length > 0

  return {
    ...swrProps,
    images,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    hasData,
    debounceQuery,
  }
}
