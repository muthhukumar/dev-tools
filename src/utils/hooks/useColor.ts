import { useColorModeValue } from '@chakra-ui/react'

export function useColor() {
  const moon = useColorModeValue('white', 'black')
  const moonInvert = useColorModeValue('black', 'white')

  return {
    moon,
    moonInvert,
  }
}
