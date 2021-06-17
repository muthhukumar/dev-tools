import { useRef, useState, useEffect } from 'react'

export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(null)

  const previousValueRef = useRef()

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
