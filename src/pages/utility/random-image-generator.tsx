import * as React from 'react'
import Image from 'next/image'
import { Container, Flex, Grid, Input } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

import { Page } from '../../components/Page'
import { Wrapper } from '../../components/Wrapper'
import { GradientWrapper } from '../../components/GradientWrapper'
import _ from 'lodash'
import { NextSeo } from 'next-seo'
import { response } from '../../utils/response'

const RandomImageGenerator = () => {
  const [query, setQuery] = React.useState<string>('nature')
  // const [images, setImages] = React.useState<
  const [images] =
    React.useState<
      Array<{
        id: number
        imageUrl: string
        placeholderUrl: string
        imageHeight: number
        imageWidth: number
      }>
    >(response)

  React.useEffect(() => {
    const fetchImages = _.debounce(() => {
      // const apiKey = process.env.NEXT_PUBLIC_PIXABAY
      // fetch(`https://pixabay.com/api/?key=${apiKey}&orientation=horizontal&q=${query}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setImages(
      //       data.hits.map((image) => ({
      //         id: image.id,
      //         imageUrl: image.largeImageURL,
      //         placeholderUrl: image.previewURL,
      //         imageHeight: image.imageHeight,
      //         imageWidth: image.imageWidth,
      //       })),
      //     )
      //     console.log(
      //       data.hits.map((image) => ({
      //         id: image.id,
      //         imageUrl: image.largeImageURL,
      //         placeholderUrl: image.previewURL,
      //         imageHeight: image.imageHeight,
      //         imageWidth: image.imageWidth,
      //       })),
      //     )
      //   })
    }, 2000)

    if (query) {
      fetchImages()
    }
  }, [query])

  return (
    <Page>
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
          {images.map((image) => (
            <Image
              key={image.id}
              src={image.imageUrl}
              height={image.imageHeight}
              width={image.imageWidth}
              // blurDataURL={image.placeholderUrl}
              alt="Random image"
            />
          ))}
        </Grid>
      </Wrapper>
    </Page>
  )
}

export default RandomImageGenerator
