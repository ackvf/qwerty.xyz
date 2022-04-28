import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'

type On<T> = { visibleName: T, toggled: true }
type Off<T> = { visibleName?: T, toggled?: false }
type Toggle<T> = On<T> | Off<T>

export default function useComponentToggle<T>({ visibleName, toggled = false }: Toggle<T> = {}) {
  const [state, setIsComponentVisible] = useState<Toggle<T>>({ visibleName, toggled } as Toggle<T>)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsComponentVisible({ toggled: false } as Off<T>)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { containerRef, visibleName: state.visibleName as T, isComponentVisible: state.toggled, setIsComponentVisible }
}
