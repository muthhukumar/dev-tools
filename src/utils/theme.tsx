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
    cyan: '#50e3c1',
    secondary: '#666666',
    // blue: '#0070f3',
  },
  fonts,
  breakpoints,
})

export default theme
