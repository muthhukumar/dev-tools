import * as React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export const GradientWrapper: React.FC<BoxProps> = (props) => {
  return (
    <Box
      backgroundImage="linear-gradient( 90.69deg ,#88ffea 13.42%,#ff4ecd 42.37%,#1a75ff 103.09%);"
      rounded="xl"
      padding={['3px', '3px', '4px', '4px']}
      {...props}
    />
  )
}
