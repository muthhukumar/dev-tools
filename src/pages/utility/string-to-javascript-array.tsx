import * as React from 'react'
import { NextSeo } from 'next-seo'
import {
  Text,
  Button,
  Divider,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  useToast,
  VStack,
  RadioGroup,
  useRadioGroup,
  Checkbox,
  Heading,
  Stack,
} from '@chakra-ui/react'
import _ from 'lodash'

import { Page } from '../../components/Page'
import { Wrapper } from '../../components/Wrapper'
import { UtilityTitle } from '../../components/UtilityTitle'
import { copyToClipboard } from '../../utils'
import { SplitByRadioButton } from '../../components/RadioCard'

const ONE = 'Single space'
const TWO = 'New line'
const THREE = 'Custom'

const StringToJavascriptArray = () => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const outputTextareaRef = React.useRef<HTMLTextAreaElement>(null)
  const splitByInputRef = React.useRef<HTMLInputElement>(null)
  const [wrapQuote, setWrapQuote] = React.useState<boolean>(true)
  const [keepNumber, setKeepNumber] = React.useState<boolean>(false)
  const [removeEmptyCharacter, setRemoveEmptyCharacter] = React.useState<boolean>(false)
  const [splitByOption, setSplitByOption] = React.useState(ONE)

  const options = [ONE, TWO, THREE]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'Split by',
    defaultValue: splitByOption,
    onChange: setSplitByOption,
  })

  const group = getRootProps()

  const toast = useToast()

  const handleConvertToArray = () => {
    try {
      const splitByOptions = {
        [ONE]: ' ',
        [TWO]: '\n',
        [THREE]: splitByInputRef.current.value,
      }

      const splitBy = splitByOptions[splitByOption]

      const splitResult = textareaRef.current.value.split(splitBy)

      const result = splitResult.map((text) => {
        let formattedText = text

        if (wrapQuote) {
          formattedText = `'${formattedText}'`
        }

        if (!isNaN(+text) && keepNumber) {
          formattedText = text
        }

        if (text === '' && removeEmptyCharacter) {
          return null
        }

        return formattedText
      })

      const filteredResult = result.filter((value) => value !== null)

      outputTextareaRef.current.textContent = `[${filteredResult}]`

      outputTextareaRef.current.scrollIntoView()
    } catch {}
  }
  const copyOnFocus = () => {
    const content = outputTextareaRef.current.value
    if (content) {
      copyToClipboard(outputTextareaRef.current.value, () => {
        toast({
          title: 'Copied!',
          status: 'success',
          duration: 2000,
          position: 'top-right',
        })
      })
    }
  }
  return (
    <Page>
      <NextSeo title="Convert string to javascript array" />
      <Wrapper>
        <UtilityTitle mb="8">Convert string to javascript array</UtilityTitle>
        <Textarea as="textarea" rows={15} placeholder="Enter your text here" ref={textareaRef} />
        <Stack
          alignItems="flex-end"
          mt="4"
          justifyContent="space-between"
          direction={['column', 'column', 'row', 'row']}
        >
          <VStack w="100%" alignItems="flex-start" mb={[12, 4, 0, 0]}>
            <Heading mb="2" textAlign="left" w="100%">
              Split by
            </Heading>
            <RadioGroup onChange={setSplitByOption} value={splitByOption}>
              <SplitByRadioButton getRadioProps={getRadioProps} group={group} options={options} />
            </RadioGroup>
            <InputGroup size="lg">
              <InputLeftAddon>Split By</InputLeftAddon>
              <Input
                type="text"
                ref={splitByInputRef}
                disabled={splitByOption !== THREE}
                w={['100%', '100%', 'initial', 'initial']}
              />
            </InputGroup>
            <VStack alignItems="flex-start" w="100%" pt="4">
              <Heading mb="2">Options</Heading>
              <Checkbox
                size="lg"
                colorScheme="gray"
                isChecked={wrapQuote}
                onChange={() => setWrapQuote((state) => !state)}
              >
                Wrap quote around text
              </Checkbox>
              <Checkbox
                size="lg"
                colorScheme="gray"
                isChecked={keepNumber}
                onChange={() => setKeepNumber((state) => !state)}
              >
                Keep number as number
              </Checkbox>
              <Checkbox
                size="lg"
                colorScheme="gray"
                isChecked={removeEmptyCharacter}
                onChange={() => setRemoveEmptyCharacter((state) => !state)}
              >
                Remove empty character
              </Checkbox>
            </VStack>
          </VStack>
          <Button
            size="lg"
            onClick={handleConvertToArray}
            w={['100%', '100%', 'initial', 'initial']}
          >
            Convert
          </Button>
        </Stack>

        <Divider mt="8" />
        <Text fontSize="4xl" textAlign="center" my="4">
          Output
        </Text>
        <Textarea
          as="textarea"
          rows={15}
          ref={outputTextareaRef}
          isReadOnly
          fontWeight="medium"
          fontSize="lg"
          letterSpacing="wider"
          onClick={copyOnFocus}
        />
      </Wrapper>
    </Page>
  )
}

export default StringToJavascriptArray
