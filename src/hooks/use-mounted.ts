import { useCallback, useEffect, useRef } from 'react'

export const useMounted = () => {
  const isMountedRef = useRef(true)
  const isMounted = useCallback(() => isMountedRef.current, [])

  useEffect(() => {
    return () => void (isMountedRef.current = false)
  }, [])

  return isMounted
}
