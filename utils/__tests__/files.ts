import { getUtilitySlugs } from '../files'

jest.mock('fs', () => {
  return {
    readdirSync: jest.fn().mockImplementation(() => []),
  }
})

test('It should return valid mapped utility slugs from the given directory', () => {
  expect(getUtilitySlugs()).toEqual([])
})
