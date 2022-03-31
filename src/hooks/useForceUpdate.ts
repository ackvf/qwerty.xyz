import { useReducer } from 'react'

export default function useForceUpdate(): () => void {
  return useReducer(() => ({}), {})[1] as () => void
}
