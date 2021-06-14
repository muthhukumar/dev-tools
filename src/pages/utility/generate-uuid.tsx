import * as React from 'react'
import {
  Flex,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Button,
  useToast,
  useColorModeValue,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  FormControl,
  FormLabel,
  Switch,
  VStack,
  HStack,
} from '@chakra-ui/react'
import * as uuid from 'uuid'
import { MdContentCopy } from 'react-icons/md'
import { RiDownloadLine } from 'react-icons/ri'
import { NextSeo } from 'next-seo'

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

const composeUUID = (uuids: Array<string>) => {
  return uuids.join('\n')
}

const GenerateUUID = () => {
  const [value, setValue] = React.useState<string>('4')
  const [uuid, setUuid] = React.useState<string>('Press generate to create new UUID')
  const [bulkGenerate, setBulkGenerate] = React.useState<boolean>(false)
  const [bulkUUID, setBulkUUID] = React.useState<Array<string>>([])
  const [bulkUUIDCount, setBulkUUIDCount] = React.useState(1)
  const toast = useToast()
  const boxShadow = useColorModeValue('0 5px 10px #0000001f', '0 0 0 1px #333')

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
      const uuids = bulkGenerate ? composeUUID(bulkUUID) : uuid

      navigator.clipboard.writeText(uuids)
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
        <Text fontSize="lg" textAlign="center" fontWeight="semibold">
          {uuid}
        </Text>
      )
    }

    if (bulkUUID.length > 0) {
      return (
        <VStack spacing="4">
          {bulkUUID.map((id) => (
            <Text fontSize="lg" textAlign="center" key={id} fontWeight="semibold">
              {id}
            </Text>
          ))}
        </VStack>
      )
    }

    return (
      <Text fontSize="lg" textAlign="center" fontWeight="semibold">
        Press Generate to create bulk uuid
      </Text>
    )
  }

  const downloadToFile = () => {
    const element = document.createElement('a')
    const file = new Blob([composeUUID(bulkUUID)], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'generated-uuid.txt'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  return (
    <Page>
      <NextSeo
        title="Generate UUID"
        description="Generate UUID (Universal unique identifiers with ease. Generate single or bulk set of UUIDs and if wanted download them with a single click."
      />
      <Wrapper maxW="container.lg" mt="10" mb="8">
        <Flex
          alignItems="flex-start"
          justifyContent="space-between"
          flexDir={['column', 'column', 'row', 'row']}
        >
          <Flex
            mr="6"
            alignItems="flex-start"
            justifyContent="flex-start"
            mb="auto"
            h="100%"
            rounded="sm"
            w="100%"
            flex="1"
          >
            <Text fontSize="2xl" fontWeight="semibold">
              <UtilityTitle>Generate UUID</UtilityTitle>
            </Text>
          </Flex>
          <Flex
            alignItems="flex-start"
            justifyContent="space-between"
            mt="4"
            flexDir="column"
            w={['100%', '100%', 'initial', 'initial']}
          >
            <VStack
              alignItems="flex-start"
              flexDir="column"
              spacing="4"
              align="stretch"
              w="100%"
              borderWidth="1px"
              p={[2, 4, 6, 10]}
              rounded="md"
              borderColor="cyan.900"
            >
              <RadioGroup onChange={onUUIDVersionChange} value={value} colorScheme="cyan">
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
                  colorScheme="cyan"
                  id="email-alerts"
                  isChecked={bulkGenerate}
                  onChange={(e) => setBulkGenerate((state) => !state)}
                />
              </FormControl>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                visibility={bulkGenerate ? 'visible' : 'hidden'}
                w="100%"
                transition="visibility 250ms"
              >
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
              <Button
                onClick={onGenerateUUID}
                mt="auto"
                w="100%"
                variant="outline"
                colorScheme="cyan"
                isFullWidth
              >
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
          flexDir={['column', 'column', 'row', 'row']}
        >
          <Text fontSize={['lg', 'lg', 'lg', 'xl']} mb={[4, 2, 0, 0]}>
            Generated UUID
          </Text>
          <HStack spacing="4">
            {bulkGenerate && (
              <Button
                leftIcon={<RiDownloadLine />}
                variant="outline"
                aria-label="download generate uuid to a file"
                onClick={downloadToFile}
                size="md"
              >
                Download to a file
              </Button>
            )}
            <Button
              size="md"
              leftIcon={<MdContentCopy />}
              variant="outline"
              aria-label="copy uuid"
              onClick={onCopy}
            >
              Copy to Clipboard
            </Button>
          </HStack>
        </Flex>
        {renderBulkUUID()}
      </Wrapper>
    </Page>
  )
}

export default GenerateUUID
