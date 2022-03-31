import { useEffect, useRef, useState } from 'react'

export default function useComponentToggle({ visibleName = '', toggled = false }: { visibleName?: string, toggled?: boolean }) {
  const [state, setIsComponentVisible] = useState<{ visibleName?: string, toggled?: boolean }>({ visibleName, toggled })
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible({ toggled: false })
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref, visibleName: state.visibleName, isComponentVisible: state.toggled, setIsComponentVisible }
}
