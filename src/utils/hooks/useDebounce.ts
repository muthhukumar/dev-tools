import { useRef, useState, useEffect } from 'react'

export function useDebounce<ValueType>(value: ValueType, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<null | typeof value>(null)

  const previousValueRef = useRef<ValueType | undefined>()

  useEffect(() => {
    if (value !== previousValueRef.current) {
      setDebouncedValue(null)
    }
  }, [value])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      previousValueRef.current = value
    }, delay)

    return () => {
      clearTimeout(handler)
      previousValueRef.current = null
    }
  }, [value, delay])

  return debouncedValue
}
