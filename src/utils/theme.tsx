import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints, mode } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {},
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', 'black')(props),
        backgroundSize: '22px 22px',
      },
      html: {
        scrollBehavior: 'smooth',
      },
    }),
  },
  colors: {
    lightWhite: '#fafafa',
    alert: '#ff007f',
    violet: '#7a29c9',
    secondary: '#666666',
    red: '#ee0202',
    highlightPink: '#ff0080',
    violetLight: '#8a63d2',
    successLight: '#3291ff',
    cyan: '#50e3c2',
  },
  fonts: {
    heading: 'Roboto mono',
    body: 'Open Sans',
  },
  breakpoints,
})

export default theme
