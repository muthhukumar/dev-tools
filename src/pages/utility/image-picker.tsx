import * as React from 'react'
import { Box, Button, Container, Flex, Grid, Input } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { NextSeo } from 'next-seo'
import { useSWRInfinite } from 'swr'
import _ from 'lodash'

import { Page as PageFC } from '../../components/Page'
import { Wrapper } from '../../components/Wrapper'
import { GradientWrapper } from '../../components/GradientWrapper'
import { Images } from '../../components/Images'
// import { useDebounce } from '../../utils/hooks/useDebounce'

const PAGE_SIZE = 20

const fetcher = (url) => fetch(url).then((res) => res.json())

const apiKey = process.env.NEXT_PUBLIC_PIXABAY

type ImageProperties = {
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

const RandomImageGenerator = () => {
  const [query, setQuery] = React.useState<string>('nature')
  // const debounceQuery = useDebounce(query, 5000)

  // console.log(debounceQuery)

  // const { data, error, size, setSize, isValidating } = useSWRInfinite<PixabayResponse>(
  const { data, error, size, setSize } = useSWRInfinite<PixabayResponse>(
    // debounceQuery
    (index) =>
      `https://pixabay.com/api/?key=${apiKey}&orientation=horizontal&q=${query}&page=${
        index + 1
      }&per_page=${PAGE_SIZE}`,
    // : null,
    fetcher,
  )

  const images = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  // const isEmpty = data?.[0]?.length === 0
  // const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  // const isRefreshing = isValidating && data && data.length === size

  return (
    <PageFC>
      <NextSeo title="Image Selector" />
      <Wrapper maxW="100%">
        <Container maxW="container.lg">
          <GradientWrapper height="80px" mt="16">
            <Flex
              borderColor="white.50"
              borderWidth="1px"
              w="100%"
              h="100%"
              px="4"
              background={'black'}
              rounded="xl"
              alignItems="center"
            >
              <Input
                variant="unstyled"
                fontSize="2xl"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <FiSearch size={30} />
            </Flex>
          </GradientWrapper>
        </Container>
        <Grid
          templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
          gap="2"
          // w="100%"
          mt="8"
          p="10"
        >
          {images?.map((hits) => hits?.hits?.map((image) => <Images {...image} key={image.id} />))}
        </Grid>
        <Box w="100%" maxW="container.lg" mx="auto" my="12">
          {/* {images?.hits?.length >= PAGE_SIZE && ( */}
          <Button
            w="100%"
            variant="outline"
            // disabled={isLoadingMore || isReachingEnd}
            disabled={isLoadingMore}
            onClick={() => setSize((oldSize) => oldSize + 1)}
            isLoading={isLoadingMore}
          >
            {/* {isReachingEnd ? "You've reached the end" : 'Load more'} */}
            Load more
          </Button>
          {/* )} */}
        </Box>
      </Wrapper>
    </PageFC>
  )
}

export default RandomImageGenerator
