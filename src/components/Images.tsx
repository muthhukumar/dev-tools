import * as React from 'react'
import Image from 'next/image'

export const Images = ({ largeImageURL, imageHeight, imageWidth }) => {
  return (
    <Image
      src={largeImageURL}
      height={imageHeight}
      width={imageWidth}
      // blurDataURL={image.placeholderUrl}
      alt="Random image"
    />
  )
}
