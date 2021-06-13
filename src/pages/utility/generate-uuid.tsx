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
} from '@chakra-ui/react'
import * as uuid from 'uuid'
import { MdContentCopy } from 'react-icons/md'

import { Page } from '../../components/Page'
import { UtilityTitle } from '../../components/UtilityTitle'

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
  const toast = useToast()

  const pathname = useRouter().pathname

  const title = pathname.split('/')[2] ?? ''

  const onUUIDVersionChange = (value) => {
    setValue(value)
  }

  const onGenerateUUID = () => {
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

  return (
    <Page>
      <Container minW="container.lg" mt="10" p="0">
        <UtilityTitle>{title}</UtilityTitle>
        <Container borderWidth="1px" minW="100%" mt="4" p="12" centerContent>
          <Text>{uuid}</Text>
        </Container>
        <Flex alignItems="center" justifyContent="space-between" mt="4">
          <RadioGroup onChange={onUUIDVersionChange} value={value}>
            <Stack direction="row">
              <Radio value="1">v1</Radio>
              {/* <Radio value="3">v3</Radio> */}
              <Radio value="4">v4</Radio>
              {/* <Radio value="5">v5</Radio> */}
            </Stack>
          </RadioGroup>
          <ButtonGroup>
            <IconButton
              variant="outline"
              aria-label="copy uuid"
              icon={<MdContentCopy size={22} />}
              onClick={onCopy}
            />
            <Button onClick={onGenerateUUID}>Generate</Button>
          </ButtonGroup>
        </Flex>
      </Container>
    </Page>
  )
}

export default GenerateUUID
