import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints, mode } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  components: {
    // Flex: {
    //   baseStyle: ({ colorMode }) => ({
    //     background: colorMode === 'dark' ? 'white' : 'black',
    //   }),
    // },
  },
  styles: {
    global: (props) => ({
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        background: mode(
          'linear-gradient(90deg,white 21px,transparent 1%) 50%,linear-gradient(white 21px,transparent 1%) 50%,#444',
          'linear-gradient(90deg,#000 21px,transparent 1%) 50%,linear-gradient(#000 21px,transparent 1%) 50%,#444',
        )(props),
        backgroundSize: '22px 22px',
        // bg: mode('white', 'black')(props),
        // background: 'rgba( 0, 0, 0, 0.25 )',
        // '-webkit-backdrop-filter': 'blur( 10.5px )',
        // backdropFilter: 'saturate(180%) blur(5px)',
        // backgroundSize: '22px 22px',
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
  },
  fonts: {
    heading: 'Roboto mono',
    body: 'Open Sans',
  },
  breakpoints,
})

export default theme
