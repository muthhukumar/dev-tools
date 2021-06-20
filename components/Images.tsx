import * as React from 'react'
import Image from 'next/image'
import { HStack, Flex, IconButton, useBreakpointValue, useToast } from '@chakra-ui/react'
import { HiDownload } from 'react-icons/hi'
import { MdContentCopy } from 'react-icons/md'
import { copyToClipboard } from '../utils'

type Props = {
  largeImageURL: string
  imageHeight: number
  imageWidth: number
  onDownload: (largeImageURL: string) => void
}

export const Images: React.FC<Props> = ({ largeImageURL, imageHeight, imageWidth, onDownload }) => {
  const buttonSize = useBreakpointValue(['sm', 'sm', 'md', 'md']) ?? 'md'

  const toast = useToast()

  return (
    <Flex position="relative">
      <Image src={largeImageURL} height={imageHeight} width={imageWidth} alt="Random image" />
      <HStack position="absolute" bottom={0} right={0} pr="4" pb="4">
        <IconButton
          aria-label="download"
          icon={<HiDownload size={25} />}
          onClick={onDownload.bind(null, largeImageURL)}
          size={buttonSize}
          color="whiteAlpha.500"
          variant="ghost"
          _hover={{ color: 'whiteAlpha.900' }}
        />
        <IconButton
          aria-label="copy url"
          icon={<MdContentCopy size={25} />}
          size={buttonSize}
          onClick={() => {
            copyToClipboard(largeImageURL)
            toast({
              title: 'Copied!',
              status: 'success',
              duration: 2000,
              position: 'top-right',
            })
          }}
          color="whiteAlpha.500"
          variant="ghost"
          _hover={{ color: 'whiteAlpha.900' }}
        />
      </HStack>
    </Flex>
  )
}
