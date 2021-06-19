import { useColorModeValue } from '@chakra-ui/react'

export function useColor(): {
  moon: 'white' | 'black'
  moonInvert: 'white' | 'black'
} {
  const moon = useColorModeValue('white', 'black')
  const moonInvert = useColorModeValue('black', 'white')

  return {
    moon,
    moonInvert,
  }
}
