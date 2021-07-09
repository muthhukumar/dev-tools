import { composeUUID } from '../generate-uuid'

test('It should return the values mapped to new line', () => {
  expect(composeUUID(['uuid1', 'uuid2'])).toMatchInlineSnapshot(`
"uuid1
uuid2"
`)
})

test('If empty array is passed it should return empty string', () => {
  expect(composeUUID([])).toEqual('')
})

test('It should return empty string if undefined is passed', () => {
  expect(composeUUID(undefined)).toEqual('')
})

test('It should return empty string if null is passed', () => {
  expect(composeUUID(null)).toEqual('')
})
