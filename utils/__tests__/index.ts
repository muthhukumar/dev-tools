import { copyToClipboard, getFilteredData } from '../'

const filteredDataBuilder = (overrides: Array<{ [key: string]: any }> = []) => {
  return [
    {
      username: 'muthu',
    },
    {
      username: 'mathi',
    },
    {
      username: 'bharath',
    },
    ...overrides,
  ]
}

const stringData = 'Hello world'

describe('For the give data getFilteredData will filter the data by the given query that matches the given field', () => {
  test('It should filter the data based by matching the search term in the given field', () => {
    expect(getFilteredData(filteredDataBuilder(), 'muthu', 'username')).toEqual([
      {
        username: 'muthu',
      },
    ])
  })

  test('It should filter the data with the username field `name` matches with muthu', () => {
    expect(
      getFilteredData(filteredDataBuilder([{ username: 'muthukumar' }]), 'muthu', 'username'),
    ).toStrictEqual([{ username: 'muthu' }, { username: 'muthukumar' }])
  })

  test('It should return the data without filtering if the query term is empty string', () => {
    const data = filteredDataBuilder()
    expect(getFilteredData(data, '', 'username')).toEqual(data)
  })

  test('It should return empty array if the given field is not in the data', () => {
    const data = filteredDataBuilder()
    expect(getFilteredData(data, '20', 'age')).toEqual([])
  })

  test('It should return empty array data if the empty array is passed', () => {
    expect(getFilteredData([], 'muthu', 'username')).toEqual([])
  })

  test('It should return empty array if undefined is passed as the array', () => {
    expect(getFilteredData(undefined, 'muthu', 'username')).toEqual([])
  })

  test('It should return empty array if empty string is passed as the field name', () => {
    const data = filteredDataBuilder()
    expect(getFilteredData(data, 'muthu', '')).toEqual([])
  })
})

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: () => undefined,
  },
})

/** TODO: Finish up this test cases */
describe('copyToClipboard will copy the given data to the clipboard and it will call the callback with the given data', () => {
  const callback = jest.fn()

  beforeEach(() => {
    jest.spyOn(navigator.clipboard, 'writeText')
    copyToClipboard(stringData, callback)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    callback.mockReset()
  })

  test('It should copy the given data to the clipboard and call the callback', () => {
    expect(navigator.clipboard.writeText).toBeCalledWith(stringData)
    expect(navigator.clipboard.writeText).toBeCalledTimes(1)
  })

  test('It should copy the given data to the clipboard and call the callback', () => {
    expect(callback).toBeCalledWith(stringData)
    expect(callback).toBeCalledTimes(1)
  })
})
