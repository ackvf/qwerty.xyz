import { useRef, useEffect } from 'react'
import { Contract, ethers } from 'ethers'

import abi from '../contract/metamorphosis.abi.json'
import metadataJson from '../contract/metamorphosis.metadata.json'
import { useShallowState } from './useShallowState'

import type { Web3Provider } from '@ethersproject/providers'

const toString = (x: any) => x.toString()
const hex = (chainId: number) => `0x${chainId.toString(16)}`

const contractAddress = '0x4D232CD85294Acd53Ec03F4A57F57888c9Ea1946'

declare global {
  interface Window {
    ethereum: Ethereum,
  }
}

interface ContractState {
  CREATOR_MAX_TOKENS: number,
  creators: [/* address */string, /* signed */boolean, /* editions */number, /* total */number, /* name */string][]
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
  const creatorMax = 250
  const allMetadata: AllMetadata = {} as AllMetadata

  let offset = 0
  let ix = 1

  while ((offset + ix) <= 7500) {
    console.debug('ask', offset + ix)
    const response = await contract.tokenURI(offset + ix).catch(() => '')

    if (response === '') {
      ix++
      continue
    }

    let metadata: Metadata = JSON.parse(response.substring(27))

    console.debug('\n========== response', offset + ix, metadata.created_by, metadata.attributes[1], '\n')

    allMetadata[metadata.created_by] ??= {} as FormsMetadata
    const byCreator = allMetadata[metadata.created_by]
    byCreator[metadata.attributes[1].value] = metadata

    if (!byCreator[1] || !byCreator[2]) {
      ix++
    } else {
      ix = 1
      offset += creatorMax
    }
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
  const [state, setState] = useShallowState<ContractState>({})

  // function to get current contract data and update UI
  const loadValuesFromContract = async () => {
    const [
      CREATOR_MAX_TOKENS,
      creators,
    ] = await Promise.all([
      contract.current?.CREATOR_MAX_TOKENS().then(toString),
      contract.current?.creators(),
    ])
    setState({
      CREATOR_MAX_TOKENS,
      creators,
      metadata: metadataJson as AllMetadata,
      errors: [],
    })
  }

  useEffect(() => {
    let provider: Web3Provider

    const setup = async () => {
      await window.ethereum.enable()

      provider = new ethers.providers.Web3Provider(window.ethereum)

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
    }

    setup()

    return function cleanup() {
      provider?.removeAllListeners()
      window.ethereum.removeAllListeners()
    }
  })

  return { state }
}
