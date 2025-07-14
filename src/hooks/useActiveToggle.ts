import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'

type On<T> = { current: T, toggled: true }
type Off<T> = { current?: T, toggled?: false }
type Toggle<T> = On<T> | Off<T>

/**
 * Store a reference to an active state or its identifier and its visibility status.
 */
export default function useActiveToggle<T>({ current, toggled = false }: Toggle<T> = {}) {
  const [state, setIsToggled] = useState<Toggle<T>>({ current, toggled } as Toggle<T>)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: any) => {
    if (!containerRef.current?.contains(event.target)) {
      setIsToggled({ current: state.current, toggled: false } as Off<T>)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { containerRef, current: state.current, isToggled: state.toggled, setIsToggled } as {
		/** Pass to the ref attribute of the container element for click events. */
		containerRef: RefObject<HTMLDivElement>,
		current: T | undefined,
		isToggled?: boolean,
		setIsToggled: Dispatch<SetStateAction<Toggle<T>>>
	}
}
