import { Box, BoxProps } from '@chakra-ui/react'

export const GradientWrapper = (props: BoxProps) => {
  return (
    <Box
      backgroundImage="linear-gradient( 90.69deg ,#88ffea 13.42%,#ff4ecd 42.37%,#1a75ff 103.09%);"
      rounded="xl"
      padding="4px"
      {...props}
    />
  )
}
