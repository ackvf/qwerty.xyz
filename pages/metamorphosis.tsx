import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Bar from '../src/components/Bar'
import Loading from '../src/components/Loading'
import useComponentToggle from '../src/hooks/useComponentToggle'
import useMetamorphosisContract from '../src/hooks/useMetamorphosisContract'
import styles from '../styles/Home.module.css'


const Metamorphosis: NextPage = () => {
  const { state, setup } = useMetamorphosisContract()

  type Names = keyof typeof state.metadata

  const { containerRef, visibleName, isComponentVisible, setIsComponentVisible } = useComponentToggle<Names>()

  return (
    <div className='container'>
      <span className={`card connect ${state.offline || 'hidden'}`} onClick={setup}>connect</span>
      <style jsx>{`
        .container {

        }

        .hidden {
          display: none;
        }

        .card {
          width: 320px;
          padding: 0.4rem;
          max-width: unset;
          text-align: center;
        }

        .cardTitle {
          font-size: 1.5rem;
          cursor: pointer;
          display: inline-block;
          width: 100%;
        }

        .card.connect {
          width: unset;
          margin: 0;
          position: fixed;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }

        .bigVideoWrap {
          position: fixed;
          display: flex;
          align-items: center;
          width: 100%;
          top: 0;
          bottom: 0;
        }

        .bigVideo {
          position: relative;
          padding: 20px;
          background-color: rgb(22, 23, 22);
          max-width: unset;
          width: 100%;

        }

        video {
          cursor: pointer;
          position: relative;
          z-index: 2;
        }

        .bigVideo :global(.Loading) {
          z-index: 1;
        }


        .bigVideo a {
          display: inline-block;
          width: 50%;
        }

        .zoom {
          width: 50%;
          display: inline-block;
          cursor: zoom-in;
        }

        p {
          margin-top: -10px;
          margin-bottom: 10px;
        }
      `}</style>

      {isComponentVisible &&
        <div className='bigVideoWrap'>
          <div ref={containerRef} className='card bigVideo'>
            <p className={styles.description}>
              Click video to start playback.
            </p>
            <Loading />
            <video loop onClick={toggleVideo} width='50%' src={state?.metadata[visibleName]?.[1].animation_url} />
            <video loop onClick={toggleVideo} width='50%' src={(state?.metadata[visibleName]?.[2] as any).animation_url} />
            <a className='blue' target='_blank' rel='noreferrer' href={state?.metadata[visibleName]?.[1].animation_url} >{state?.metadata[visibleName]?.[1].animation_url}</a>
            <a className='blue' target='_blank' rel='noreferrer' href={(state?.metadata[visibleName]?.[2] as any).animation_url} >{(state?.metadata[visibleName]?.[2] as any).animation_url}</a>
          </div>
        </div>
      }

      <main className={styles.main}>

        <p className={styles.description}>
          <h2>CHAPTER TWO - METAMORPHOSIS</h2>
          <a className='blue' href='https://burn.art/drops/metamorphosis'>https://burn.art/drops/metamorphosis</a>
          <br />
          Click creator name to view animations, click image to enlarge it.
        </p>

        <div className={styles.grid}>

          {
            state?.creators?.map(([address, , , total, name], index) => {

              const offlineTitle = state.offline ? ' You need to sign in to Metamask to fetch data from the blockchain. Scroll down for more info.' : ''
              const { 1: m1, 2: m2 } = state.metadata[name as Names]

              return (
                <div key={name} className='card'>
                  <span className='cardTitle' onClick={() => setIsComponentVisible({ visibleName: name as Names, toggled: true })}>{name}</span>
                  <div>
                    <a className='zoom' target='_blank' rel='noreferrer' href={m1.image}><img height={150} src={m1.image.replace('https://arweave.net/', '/nft/') + '.jpg'} alt={m1.description} /></a>
                    <a className='zoom' target='_blank' rel='noreferrer' href={m2.image}><img height={150} src={m2.image?.replace('https://arweave.net/', '/nft/') + '.jpg'} alt={m2.description} /></a>
                  </div>
                  <Bar
                    title={`Burned ${state.CREATOR_MAX_TOKENS - total} out of ${state.CREATOR_MAX_TOKENS} tokens.${offlineTitle}`}
                    value={(total / state.CREATOR_MAX_TOKENS)}
                    label={total}
                  />
                </div>
              )

            })
          }

        </div>

        {state.offline && (
          <p className={styles.description} style={{ marginTop: 40 }}>
            This app fetches current <i>burn</i> stats from the blockchain which normally requires a paid API service. Instead, it uses a free provider from your browser: Metamask. However, Metamask will not work unless you connect some wallet.
            <br />
            <br />
            <b>You can still enjoy the gallery without connecting.</b>
            <br />
            <br />
            <i>No transaction is ever made. You don't need to approve anything anyway.</i>
            <br />
            <i>PS: It can be any wallet.</i>
          </p>
        )}

      </main>
    </div>
  )
}

export default dynamic(async () => Metamorphosis, {
  ssr: false,
})

function toggleVideo({ currentTarget: e }: any) {
  if (e.paused) e.play()
  else { e.pause() }
}
