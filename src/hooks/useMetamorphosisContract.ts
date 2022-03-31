import { useState, useRef, useEffect } from 'react'
import { Contract, ethers } from 'ethers'

import abi from '../contract/metamorphosis.abi.json'
import metadata from '../contract/metamorphosis.metadata.json'

function toString(x: any) { return x.toString() }

interface ContractState {
  CREATOR_MAX_TOKENS: number,
  creators: [/* address */string, /* signed */boolean, /* editions */number, /* total */number, /* name */string][]
  metadata: typeof metadata
}

interface Metadata {
  animation_url: string
  attributes: { trait_type: string, value: string }[]
  created_by: string
  description: string
  image: string
  name: string
}

async function collectMetadata(contract: Contract, setState: any) {
  const creatorMax = 250
  const allMetadata: {
    [name: string]: {
      [name: string | number]: Metadata
    }
  } = {}

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

    allMetadata[metadata.created_by] ??= {}
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

export default function useMetamorphosisContract() {
  const contract = useRef<Contract>()
  const [state, setState] = useState<ContractState>({} as ContractState)

  // function to get current count and update UI
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
      metadata,
    })
  }

  useEffect(() => {
    // this is only run once on component mounting
    const setup = async () => {
      await (window as any).ethereum.enable()

      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      const network = await provider.getNetwork()
      const contractAddress = '0x4D232CD85294Acd53Ec03F4A57F57888c9Ea1946'

      contract.current = new ethers.Contract(
        contractAddress,
        abi,
        provider.getSigner(),
      )

      loadValuesFromContract()
      // collectMetadata(contract.current, setState)
    }
    setup()
  }, [])

  return { state }
}
