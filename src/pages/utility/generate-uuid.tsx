import * as React from 'react'
import { useRouter } from 'next/router'
import {
  Flex,
  Text,
  Container,
  Radio,
  RadioGroup,
  Stack,
  Button,
  ButtonGroup,
  IconButton,
  useToast,
  useColorModeValue,
  Spacer,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  FormControl,
  FormLabel,
  Switch,
  VStack,
} from '@chakra-ui/react'
import * as uuid from 'uuid'
import { MdContentCopy } from 'react-icons/md'

import { Page } from '../../components/Page'
import { UtilityTitle } from '../../components/UtilityTitle'
import { Wrapper } from '../../components/Wrapper'

const generateUUID = (version = '4') => {
  const uuidGenerator = {
    '1': () => uuid.v1(),
    '4': () => uuid.v4(),
  }
  return uuidGenerator[version]()
}

const GenerateUUID = () => {
  const [value, setValue] = React.useState<string>('4')
  const [uuid, setUuid] = React.useState<string>('Press generate to create new UUID')
  const [bulkGenerate, setBulkGenerate] = React.useState<boolean>(false)
  const [bulkUUID, setBulkUUID] = React.useState<Array<string>>([])
  const [bulkUUIDCount, setBulkUUIDCount] = React.useState(1)
  const toast = useToast()
  const boxShadow = useColorModeValue('0 5px 10px #0000001f', '0 0 0 1px #333')

  const pathname = useRouter().pathname

  const title = pathname.split('/')[2] ?? ''

  const onUUIDVersionChange = (value) => {
    setValue(value)
  }

  const onGenerateUUID = () => {
    if (bulkGenerate) {
      return setBulkUUID(Array.from({ length: bulkUUIDCount }, () => generateUUID(String(value))))
    }
    setUuid(generateUUID(String(value)))
  }

  const onCopy = () => {
    try {
      navigator.clipboard.writeText(uuid)
      toast({
        title: 'Copied!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
      })
    } catch {}
  }

  const renderBulkUUID = () => {
    if (!bulkGenerate) {
      return (
        <Text fontSize="md" textAlign="center">
          {uuid}
        </Text>
      )
    }

    if (bulkUUID.length > 0) {
      return (
        <VStack spacing="4">
          {bulkUUID.map((id) => (
            <Text fontSize="md" textAlign="center" key={id}>
              {id}
            </Text>
          ))}
        </VStack>
      )
    }

    return (
      <Text fontSize="md" textAlign="center">
        Press Generate to create bulk uuid
      </Text>
    )
  }

  return (
    <Page>
      <Wrapper maxW="container.lg" mt="10" p={[12, 8, 6, 0]}>
        <Flex alignItems="flex-start" justifyContent="space-between">
          <Flex mr="6" alignItems="flex-start" justifyContent="center" rounded="sm">
            <Text fontSize="2xl" fontWeight="semibold">
              {/* {uuid} */}
              <UtilityTitle>Generate UUID</UtilityTitle>
            </Text>
          </Flex>
          {/* <Flex w="100%">
            <Flex flexDir="column">
              <Text color="grey">Version</Text>
              <Text>v1</Text>
            </Flex>
          </Flex> */}
          <Flex alignItems="flex-start" justifyContent="space-between" mt="4" flexDir="column">
            <VStack alignItems="flex-start" flexDir="column" spacing="4">
              <RadioGroup onChange={onUUIDVersionChange} value={value}>
                <Stack display="flex" direction="row" alignItems="center">
                  <Text fontSize="lg" fontWeight="semibold">
                    Version:
                  </Text>
                  <Radio value="1">v1</Radio>
                  <Radio value="4">v4</Radio>
                </Stack>
              </RadioGroup>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  Enable Bulk generate
                </FormLabel>
                <Switch
                  id="email-alerts"
                  isChecked={bulkGenerate}
                  onChange={(e) => setBulkGenerate((state) => !state)}
                />
              </FormControl>
              {bulkGenerate && (
                <Flex alignItems="center" justifyContent="space-between" w="100%">
                  <Text marginRight="auto">Bulk Generate</Text>
                  <NumberInput
                    size="sm"
                    defaultValue={0}
                    min={1}
                    max={500}
                    maxW={16}
                    value={bulkUUIDCount}
                    onChange={(_, count) => setBulkUUIDCount(count)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              )}
              <Button onClick={onGenerateUUID} mt="auto" w="100%">
                Generate
              </Button>
            </VStack>
          </Flex>
        </Flex>
        <Flex
          rounded="sm"
          w="100%"
          p="4"
          mt="12"
          mb="6"
          alignItems="center"
          justifyContent="space-between"
          transition="box-shadow 0.2s ease 0s"
          boxShadow={boxShadow}
        >
          <Text>Generated UUID</Text>
          <Button
            leftIcon={<MdContentCopy />}
            variant="outline"
            aria-label="copy uuid"
            onClick={onCopy}
          >
            Copy to Clipboard
          </Button>
        </Flex>
        {renderBulkUUID()}
      </Wrapper>
    </Page>
  )
}

export default GenerateUUID
