/* The types defined in this file are available globally. */

type Modify<T, R> = Omit<T, keyof R> & R

type ModifyDeep<A extends AnyObject, B extends DeepPartialAny<A>> = {
  [K in keyof A]: B[K] extends never
  ? A[K]
  : B[K] extends AnyObject
  ? ModifyDeep<A[K], B[K]>
  : B[K]
} & (A extends AnyObject ? Omit<B, keyof A> : A)

/** Makes each property optional and turns each leaf property into any, allowing for type overrides by narrowing any. */
type DeepPartialAny<T> = {
  [P in keyof T]?: T[P] extends AnyObject ? DeepPartialAny<T[P]> : any
}

type AnyObject = Record<string, any>


interface Ethereum {
  _events: any
  _eventsCount: any
  _handleAccountsChanged: (e?: any, t?: any) => any
  _handleChainChanged: () => any
  _handleConnect: (e?: any, t?: any) => any
  _handleDisconnect: (e?: any, t?: any) => any
  _handleStreamDisconnect: (e?: any, t?: any) => any
  _handleUnlockStateChanged: () => any
  _jsonRpcConnection: any
  _log: any
  _maxListeners: any
  _metamask: any
  _rpcEngine: any
  _rpcRequest: any
  _sendSync: (e?: any) => any
  _sentWarnings: any
  _state: any
  _warnOfDeprecation: (e?: any) => any
  chainId: any
  enable: () => any
  isMetaMask: any
  networkVersion: any
  request: (e?: any) => any
  selectedAddress: any
  send: (e?: any, t?: any) => any
  sendAsync: (e?: any, t?: any) => any
  // prototype p
  _getExperimentalApi: () => any
  addListener: (e?: any, t?: any) => any
  on: (e?: any, t?: any) => any
  once: (e?: any, t?: any) => any
  prependListener: (e?: any, t?: any) => any
  prependOnceListener: (e?: any, t?: any) => any
  // prototype p.o
  _initializeState: () => any
  isConnected: () => any
  // prototype p.o.s
  emit: (e?: any, t?: any) => any
  // prototype p.o.s.Object
  eventNames: () => any
  getMaxListeners: () => any
  listenerCount: (e?: any) => any
  listeners: (e?: any) => any
  rawListeners: (e?: any) => any
  removeAllListeners: (e?: any) => any
  removeListener: (e?: any, t?: any) => any
  setMaxListeners: (e?: any) => any
  _events: any
  _maxListeners: any
}
