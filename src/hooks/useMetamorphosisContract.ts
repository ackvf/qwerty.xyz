import { Contract, ethers } from 'ethers'
import { useCallback, useEffect, useRef } from 'react'

import abi from '../contract/metamorphosis.abi.json'
import creatorsJson from '../contract/metamorphosis.creators.json'
import metadataJson from '../contract/metamorphosis.metadata.json'
import { useShallowState } from './useShallowState'

import type { Web3Provider } from '@ethersproject/providers'

const toString = (x: any) => x.toString()
const hex = (chainId: number) => `0x${chainId.toString(16)}`

const contractAddress = '0x4D232CD85294Acd53Ec03F4A57F57888c9Ea1946'
const CREATOR_MAX_TOKENS = 250

declare global {
  interface Window {
    ethereum: Ethereum,
  }
}

interface ContractState {
  offline?: boolean, // set to true if not signed into Metamask to fetch data from blockchain
  CREATOR_MAX_TOKENS: number,
  creators: [address: string, signed: boolean, editions: number, total: number, name: string][]
  metadata: AllMetadata
  errors?: string[]
}

type Names = keyof typeof metadataJson

interface Metadata {
  animation_url: string
  attributes: [/** Creator */{ trait_type: string, value: Names }, /** Form */{ trait_type: string, value: 1 | 2 }]
  created_by: Names
  description: string
  image: string
  name: string
}

interface FormsMetadata {
  1: Metadata
  2: Metadata
}

type AllMetadata = {
  [name in Names]: FormsMetadata
}

async function collectMetadata(contract: Contract, setState: any) {
  const creatorMax = CREATOR_MAX_TOKENS
  const allMetadata: AllMetadata = metadataJson as AllMetadata
  const creators: Names = Object.keys(allMetadata) as unknown as Names

  let offset = 0
  let index = 1

  let currentCreatorByIndex: Names
  let currentMetadataByCreator: FormsMetadata

  (window as any).m = allMetadata

  let ix: number
  while ((ix = offset + index) <= 7500) {
    currentCreatorByIndex = creators[(ix - 1) / creatorMax | 0] as Names
    currentMetadataByCreator = allMetadata[currentCreatorByIndex] || {}

    console.debug('CHECK', { ix, offset, index }, currentCreatorByIndex, { keys: Object.keys(currentMetadataByCreator).length })

    if (index > creatorMax || Object.keys(currentMetadataByCreator).length === 2) {
      index = 1
      offset += creatorMax
      continue
    }

    console.debug('ASK', ix)
    const response = await contract.tokenURI(ix).catch(() => '')

    if (response === '') {
      index++
      continue
    }

    let metadata: Metadata = JSON.parse(response.substring(27))
    console.debug('__response:', ix, metadata.created_by, metadata.attributes[1])

    currentMetadataByCreator[metadata.attributes[1].value] = metadata

    index++
  }
}

function promptNetworkChange() {
  window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: hex(1) }], // chainId must be in hexadecimal form
  })
}

export default function useMetamorphosisContract() {
  const contract = useRef<Contract>()
  const [state, setState] = useShallowState<ContractState>({
    offline: true,
    CREATOR_MAX_TOKENS: CREATOR_MAX_TOKENS,
    creators: creatorsJson as ContractState['creators'],
    metadata: metadataJson as AllMetadata,
  })

  // function to get current contract data and update UI
  const loadValuesFromContract = useCallback(async () => {
    const [
      // CREATOR_MAX_TOKENS,
      creators,
    ] = await Promise.all([
      // contract.current?.CREATOR_MAX_TOKENS().then(toString),
      contract.current?.creators(),
    ])
    setState({
      offline: false,
      CREATOR_MAX_TOKENS,
      creators,
      metadata: metadataJson as AllMetadata,
      errors: [],
    })
  }, [])

  const providerRef = useRef<Web3Provider>()

  function cleanup() {
    providerRef.current?.removeAllListeners()
    window?.ethereum.removeAllListeners()
  }

  /** @returns `cleanup()` function for use in `useEffect(connect, [])`. */
  const setup = useCallback(async () => {
    if (!window.ethereum) return

    // window.ethereum.on('connect', setState); // Sometimes when I log in, it won't refresh. Need to figure that out later I guess as I can't reproduce it now.
    await window.ethereum.enable()

    let provider = providerRef.current = new ethers.providers.Web3Provider(window.ethereum)

    window.ethereum.on('chainChanged', (newChain: string) => {
      location.reload()
    })

    await provider.getNetwork().then(chain => {
      if (chain.chainId !== 1) promptNetworkChange()
    })

    contract.current = new ethers.Contract(
      contractAddress,
      abi,
      provider.getSigner(),
    )

    loadValuesFromContract()
    // collectMetadata(contract.current, setState)

    return cleanup
  }, [])

  /* Cleanup on unmount. */
  useEffect(() => cleanup, [])

  return { state, setup, cleanup }
}
