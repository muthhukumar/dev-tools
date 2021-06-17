import * as React from 'react'
import { Text, Box, Button, Container, Flex, Grid, Input, Spinner } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { NextSeo } from 'next-seo'
import _ from 'lodash'

import { Page as PageFC } from '../../components/Page'
import { Wrapper } from '../../components/Wrapper'
import { GradientWrapper } from '../../components/GradientWrapper'
import { Images } from '../../components/Images'
import { useInfiniteImage, PAGE_SIZE } from '../../utils/hooks/useInfiniteImage'
import { useColor } from '../../utils/hooks/useColor'

const RandomImageGenerator = () => {
  const [query, setQuery] = React.useState<string>('')
  const { moon } = useColor()

  const {
    images,
    debounceQuery,
    isLoadingInitialData,
    hasData,
    isLoadingMore,
    isReachingEnd,
    setSize,
  } = useInfiniteImage({ query })

  const handleDownloadImage = (imageFullUrl: string) => {
    try {
      const imageSplit = imageFullUrl.split('/') || []

      const imageName = imageSplit[imageSplit.length - 1]

      fetch(imageFullUrl, {
        method: 'GET',
      })
        .then((response) => {
          response.arrayBuffer().then(function (buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', imageName) //or any other extension
            document.body.appendChild(link)
            link.click()
          })
        })
        .catch((err) => {
          console.log(err)
        })
    } catch {}
  }

  return (
    <PageFC>
      <NextSeo title="Image Selector" />
      <Wrapper maxW="100%" pt={0} h="100%">
        <Container maxW="container.lg" h="100%">
          <Box>
            <GradientWrapper height={['60px', '65px', '75px', '80px']}>
              <Flex
                borderColor="white.50"
                borderWidth="1px"
                w="100%"
                h="100%"
                px="4"
                background={'black'}
                rounded="xl"
                bg={moon}
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
          </Box>
        </Container>
        {images.length === 0 && !query && (
          <Text my="12" textAlign="center" fontSize="lg">
            Start typing to search images.
          </Text>
        )}
        {isLoadingInitialData ? (
          <Flex w="100%" alignItems="center" justifyContent="center" my="12">
            <Spinner />
          </Flex>
        ) : hasData ? (
          <Grid
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
            ]}
            gap="2"
            mt="8"
            p={[2, 4, 6, 10]}
          >
            {images?.map((hits) =>
              hits?.hits?.map((image) => (
                <Images {...image} key={image.id} onDownload={handleDownloadImage} />
              )),
            )}
          </Grid>
        ) : (
          debounceQuery && (
            <Text my="12" textAlign="center" fontSize="lg">
              No results found.
            </Text>
          )
        )}
        <Box w="100%" maxW="container.lg" mx="auto" my="12">
          {images?.[0]?.hits?.length >= PAGE_SIZE && (
            <Button
              w="100%"
              variant="outline"
              disabled={isLoadingMore || isReachingEnd}
              onClick={() => setSize((oldSize) => oldSize + 1)}
              isLoading={isLoadingMore}
            >
              {isReachingEnd ? "You've reached the end" : 'Load more'}
            </Button>
          )}
        </Box>
      </Wrapper>
    </PageFC>
  )
}

export default RandomImageGenerator
