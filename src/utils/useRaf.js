import React from 'react'

export const useRaf = (onFrame) => {
  const requestRef = React.useRef()
  const startTimeRef = React.useRef()
  const callback = (time) => {
    if (!startTimeRef.current) startTimeRef.current = time
    const progress = time - startTimeRef.current
    onFrame(progress)
    requestRef.current = requestAnimationFrame(callback)
  }

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(callback)
    return () => cancelAnimationFrame(requestRef.current)
    //eslint-disable-next-line
  }, [])
}
