import * as React from 'react'
import { Box, HStack, RadioProps, StackProps, useRadio } from '@chakra-ui/react'
import { useColor } from '../utils/hooks/useColor'

const RadioCard: React.FC = (props: RadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  const { moonInvert, moon } = useColor()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: moonInvert,
          color: moon,
          borderColor: 'grey',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export const SplitByRadioButton: React.FC<{
  group: StackProps
  options: Array<string | number>
  getRadioProps: any
}> = ({ group, options, getRadioProps }) => {
  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
