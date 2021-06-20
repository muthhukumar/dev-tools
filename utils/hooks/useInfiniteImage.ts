import { useSWRInfinite } from 'swr'
import { useDebounce } from './useDebounce'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const apiKey = process.env.NEXT_PUBLIC_PIXABAY

export const PAGE_SIZE = 20

const composeImageData = (data: Array<PixabayResponse> | number | undefined) => {
  if (typeof data === 'number' || !data) {
    return []
  }

  return data
}

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useInfiniteImage = ({
  query,
  debounceDuration = 1000,
}: {
  query: string
  debounceDuration?: number
}) => {
  const debounceQuery = useDebounce<string>(query, debounceDuration)

  const { data, error, size, ...swrProps } = useSWRInfinite<PixabayResponse>(
    debounceQuery
      ? (index: number) =>
          `https://pixabay.com/api/?key=${apiKey}&orientation=horizontal&q=${debounceQuery}&page=${
            index + 1
          }&per_page=${PAGE_SIZE}`
      : () => null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )

  const images = composeImageData(data)

  const isLoadingInitialData = query && !data && !error
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && images && typeof images[size - 1] === 'undefined')
  const isEmpty = images?.[0]?.hits?.length === 0
  const isReachingEnd = isEmpty || (images && images[images.length - 1]?.hits.length < PAGE_SIZE)

  const hasData = !isLoadingInitialData && images?.[0]?.hits.length > 0

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
