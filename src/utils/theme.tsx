import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    black: '#16161D',
    lightWhite: '#fafafa',
    alert: '#ff007f',
    violet: '#7a29c9',
    secondary: '#666666',
    red: '#ee0202',
  },
  fonts,
  breakpoints,
})

export default theme
