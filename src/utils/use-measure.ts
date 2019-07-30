import React from 'react'
import ResizeObserver from 'resize-observer-polyfill'

type Bounds = {
  width: number
  height: number
  left: number
  top: number
}

export function useMeasure<T extends HTMLElement>(): [{ ref: React.RefObject<T> }, Bounds] {
  const ref = React.useRef<T | null>(null)
  const [bounds, set] = React.useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = React.useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)))

  React.useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  return [{ ref }, bounds]
}
