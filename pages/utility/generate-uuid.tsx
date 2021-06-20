import * as React from 'react'
import {
  Stack,
  Flex,
  Grid,
  Text,
  Radio,
  RadioGroup,
  Button,
  useToast,
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
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MdContentCopy } from 'react-icons/md'
import { RiDownloadLine } from 'react-icons/ri'
import { NextSeo } from 'next-seo'

import { Page } from '../../components/Page'
import { UtilityTitle } from '../../components/UtilityTitle'
import { Wrapper } from '../../components/Wrapper'
import { composeUUID, generateUUID } from '../../utils/generate-uuid'
import { copyToClipboard } from '../../utils'

const GenerateUUID: React.FC = () => {
  const [value, setValue] = React.useState<'1' | '4' | 'NIL_UUID'>('4')
  const [uuid, setUuid] = React.useState<string>('Press generate to create new UUID')
  const [generateBulkUUID, setGenerateBulkUUID] = React.useState<boolean>(false)
  const [bulkUUIDs, setBulkUUIDs] = React.useState<Array<string>>([])
  const [bulkUUIDsCount, setBulkUUIDsCount] = React.useState(1)

  const toast = useToast()
  const buttonSize = useBreakpointValue(['md', 'md', 'lg', 'lg']) ?? 'lg'

  const onUUIDVersionChange = (value: '1' | '4' | 'NIL_UUID') => {
    setValue(value)
  }

  const onGenerateUUID = () => {
    if (generateBulkUUID) {
      return setBulkUUIDs(Array.from({ length: bulkUUIDsCount }, () => generateUUID(value)))
    }
    setUuid(generateUUID(value))
  }

  const onCopy = () => {
    try {
      const uuids = generateBulkUUID ? composeUUID(bulkUUIDs) : uuid

      copyToClipboard(uuids)

      toast({
        title: 'Copied!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
      })
    } catch {
      return
    }
  }

  const renderBulkUUID = () => {
    if (!generateBulkUUID) {
      return (
        <Text fontSize="lg" textAlign="center" fontWeight="semibold">
          {uuid}
        </Text>
      )
    }

    if (bulkUUIDs.length > 0) {
      return (
        <Grid
          templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']}
          gap="4"
          mt={[4, 4, 0, 0]}
          w="100%"
          maxH="100vh"
          overflowY="scroll"
          justifyContent="center"
        >
          {bulkUUIDs.map((id) => {
            return (
              <Text
                fontSize={['xl', 'xl', 'lg', 'lg']}
                textAlign={['center', 'center', 'center', 'left']}
                key={generateUUID()}
                fontWeight="semibold"
              >
                {id}
              </Text>
            )
          })}
        </Grid>
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
    const file = new Blob([composeUUID(bulkUUIDs)], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'generated-uuid.txt'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  const onBulkCountChange = (_: any, count: number) => {
    if (!isNaN(count)) {
      setBulkUUIDsCount(count)
    }
  }

  return (
    <Page>
      <NextSeo
        title="Generate UUIDs"
        description="Generate UUID (Universal unique identifiers with ease. Generate single or bulk set of UUIDs and if wanted download them with a single click."
      />
      <Wrapper mb="8">
        <Flex alignItems="flex-start" justifyContent="space-between" flexDir="column">
          <UtilityTitle>Generate UUID</UtilityTitle>
          <VStack align="stretch" my="6" spacing={4}>
            <Heading as="h2" size="xl" isTruncated textAlign="left">
              What is a UUID?
            </Heading>
            <Text>
              A UUID (Universally unique identifier) is a 128 bit number which is used to uniquely
              identify something. The UUIDs can be generated without a use of a centralized
              authority. The main idea being that the UUIDs created always be unique. There will be
              no duplication of the same ID. Duplication of the same ID are extremely unlikely to
              happen. At least in a single application space.
            </Text>
            <Text>
              There are mainly three different UUIDs. They are version1, version4 and Nil or empty
              UUID
            </Text>
          </VStack>

          <Flex mt="4" w="100%">
            <Flex
              alignItems="flex-start"
              justifyContent="space-between"
              w="100%"
              flexDir={['column', 'column', 'row', 'row']}
            >
              <Tabs isFitted variant="enclosed" w="100%">
                <TabList mb="1em">
                  <Tab>
                    <Heading variant="gradient" fontSize={['lg', 'lg', '3xl', '3xl']}>
                      Generated UUID
                    </Heading>
                  </Tab>
                  <Tab>
                    <Heading fontSize={['lg', 'lg', '3xl', '3xl']}>Settings</Heading>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel px={0}>
                    <Flex
                      flexDir={['column-reverse', 'column-reverse', 'row', 'row']}
                      alignItems={['center', 'center', 'flex-start', 'flex-start']}
                      justifyContent="space-between"
                    >
                      {renderBulkUUID()}
                      <Stack
                        spacing="2"
                        dir="column"
                        w={['100%', '100%', 'initial', 'initial']}
                        mb={[4, 6, 0, 0]}
                      >
                        <Button
                          onClick={onGenerateUUID}
                          mt="auto"
                          w="100%"
                          variant="moonInvert"
                          size={buttonSize}
                          colorScheme="cyan"
                        >
                          Generate
                        </Button>

                        <Button
                          size={buttonSize}
                          leftIcon={<MdContentCopy />}
                          variant="moonInvert"
                          aria-label="copy uuid"
                          w="100%"
                          onClick={onCopy}
                        >
                          Copy to Clipboard
                        </Button>
                        {generateBulkUUID && (
                          <Button
                            leftIcon={<RiDownloadLine />}
                            variant="moonInvert"
                            size={buttonSize}
                            w="100%"
                            aria-label="download generate uuid to a file"
                            onClick={downloadToFile}
                          >
                            Download to a file
                          </Button>
                        )}
                      </Stack>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Stack spacing="6">
                      <RadioGroup onChange={onUUIDVersionChange} value={value} colorScheme="cyan">
                        <HStack display="flex" direction="row" alignItems="center" spacing="4">
                          <Text fontSize="lg" fontWeight="semibold">
                            Version:
                          </Text>
                          <Radio value="1" size="lg">
                            v1
                          </Radio>
                          <Radio value="4" size="lg">
                            v4
                          </Radio>
                          <Radio value="NIL_UUID" size="lg">
                            Nil
                          </Radio>
                        </HStack>
                      </RadioGroup>
                      <FormControl display="flex" alignItems="center">
                        <FormLabel
                          htmlFor="email-alerts"
                          mb="0"
                          fontSize="lg"
                          fontWeight="semibold"
                        >
                          Enable Bulk generate
                        </FormLabel>
                        <Switch
                          size="lg"
                          colorScheme="cyan"
                          id="email-alerts"
                          isChecked={generateBulkUUID}
                          onChange={() => setGenerateBulkUUID((state) => !state)}
                        />
                      </FormControl>
                      <Flex
                        alignItems="center"
                        justifyContent="flex-start"
                        visibility={generateBulkUUID ? 'visible' : 'hidden'}
                        w="100%"
                        transition="visibility 250ms"
                      >
                        <Text fontSize="lg" mr="4">
                          Bulk Generate
                        </Text>
                        <NumberInput
                          size="lg"
                          defaultValue={0}
                          min={1}
                          max={500}
                          minW={20}
                          maxW={['20%', '20%', '10%', '10%']}
                          value={bulkUUIDsCount}
                          onChange={onBulkCountChange}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                    </Stack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </Flex>
        </Flex>
      </Wrapper>
    </Page>
  )
}

export default GenerateUUID
