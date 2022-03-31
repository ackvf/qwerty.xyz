import { useReducer } from 'react'

export function useShallowState<T = AnyObject>(initialState = {}) {
  return useReducer((prevState: T, action: any = {}) => ({ ...prevState, ...(typeof action === 'function' ? action(prevState) : action) }), initialState) as [T, (action?: Partial<T> | ((state: T) => Partial<T>)) => void]
}
