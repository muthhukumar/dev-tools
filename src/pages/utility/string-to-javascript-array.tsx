import * as React from 'react'
import { NextSeo } from 'next-seo'
import {
  Text,
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  useToast,
  VStack,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react'

import { Page } from '../../components/Page'
import { Wrapper } from '../../components/Wrapper'
import { UtilityTitle } from '../../components/UtilityTitle'
import { copyToClipboard } from '../../utils'
import _ from 'lodash'

const StringToJavascriptArray = () => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const outputTextareaRef = React.useRef<HTMLTextAreaElement>(null)
  const splitByInputRef = React.useRef<HTMLInputElement>(null)
  const [wrapQuote, setWrapQuote] = React.useState<boolean>(false)
  const [keepNumber, setKeepNumber] = React.useState(false)
  const [removeEmptyCharacter, setRemoveEmptyCharacter] = React.useState(false)

  const toast = useToast()

  const handleConvertToArray = () => {
    try {
      const splitBy = splitByInputRef.current.value

      const splitResult = textareaRef.current.value.split(splitBy)

      const result = splitResult.map((entry) => {
        if (wrapQuote) {
          console.log(entry, !isNaN(+entry) && keepNumber)
          if (entry !== ''&& !isNaN(+entry) && keepNumber) {
            return entry
          }
          return `'${entry}'`
        }
        return entry
      })

      const filteredResult = removeEmptyCharacter
        ? result.filter((value) => {
            return value !== "''"
          })
        : result

      outputTextareaRef.current.textContent = `[${filteredResult}]`
    } catch {}
  }
  const copyOnFocus = () => {
    copyToClipboard(outputTextareaRef.current.value, () => {
      toast({
        title: 'Copied!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
      })
    })
  }
  return (
    <Page>
      <NextSeo title="Convert string to javascript array" />
      <Wrapper>
        <UtilityTitle mb="8">Convert string to javascript array</UtilityTitle>
        <Textarea as="textarea" rows={15} placeholder="Enter your text here" ref={textareaRef} />
        <HStack alignItems="flex-end" mt="4" justifyContent="space-between">
          <VStack>
            <InputGroup size="lg">
              <InputLeftAddon>Split By</InputLeftAddon>
              <Input type="text" ref={splitByInputRef} />
            </InputGroup>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="wrap quote around text" mb="0">
                Wrap quote around text
              </FormLabel>
              <Switch
                id="wrap quote around text"
                size="lg"
                isChecked={wrapQuote}
                onChange={() => setWrapQuote((state) => !state)}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="keep number as number" mb="0">
                Keep number as number
              </FormLabel>
              <Switch
                id="keep number as number"
                size="lg"
                isChecked={keepNumber}
                onChange={() => setKeepNumber((state) => !state)}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="remove empty character" mb="0">
                Remove empty character
              </FormLabel>
              <Switch
                id="remove empty character"
                size="lg"
                isChecked={removeEmptyCharacter}
                onChange={() => setRemoveEmptyCharacter((state) => !state)}
              />
            </FormControl>
          </VStack>

          <Button size="lg" onClick={handleConvertToArray}>
            Convert
          </Button>
        </HStack>

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
