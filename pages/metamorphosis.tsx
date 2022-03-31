import dynamic from 'next/dynamic'
import type { NextPage } from 'next'
import useMetamorphosisContract from '../src/hooks/useMetamorphosisContract'
import styles from '../styles/Home.module.css'
import Loading from '../src/components/Loading'
import useComponentToggle from '../src/hooks/useComponentToggle'
import Bar from '../src/components/Bar'


const Metamorphosis: NextPage = () => {

  const { state } = useMetamorphosisContract()

  type Names = keyof typeof state.metadata

  const { ref, visibleName, isComponentVisible, setIsComponentVisible } = useComponentToggle({ toggled: false })

  if (state.creators === undefined) return (

    <main className={styles.main}>

      <p className={styles.description}>
        <h2>CHAPTER TWO - METAMORPHOSIS</h2>
        <a className='blue' href='https://burn.art/drops/metamorphosis'>https://burn.art/drops/metamorphosis</a>
      </p>


      <p className={styles.description}>
        This app fetches contract data from the blockchain. You need to sign into Metamask.
        <br />
        <i>PS: It can be any wallet.</i>
      </p>

    </main>
  )

  return (
    <div className='container'>
      <style jsx>{`
        .container {

        }

        .card {
          padding: 0.4rem;
          max-width: unset;
          text-align: center;
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
          <div ref={ref} className='card bigVideo'>
            <p className={styles.description}>
              Click video to start playback.
            </p>
            <Loading />
            <video loop onClick={toggleVideo} width='50%' src={state?.metadata[visibleName as Names]?.[1].animation_url} />
            <video loop onClick={toggleVideo} width='50%' src={(state?.metadata[visibleName as Names]?.[2] as any).animation_url} />
            <a className='blue' target='_blank' rel='noreferrer' href={state?.metadata[visibleName as Names]?.[1].animation_url} >{state?.metadata[visibleName as Names]?.[1].animation_url}</a>
            <a className='blue' target='_blank' rel='noreferrer' href={(state?.metadata[visibleName as Names]?.[2] as any).animation_url} >{(state?.metadata[visibleName as Names]?.[2] as any).animation_url}</a>
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


              const { 1: m1, 2: m2 } = state.metadata[name as Names]

              return (
                <div key={name} className='card' style={{ width: '320px' }} >
                  <span style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsComponentVisible({ visibleName: name, toggled: true })}>{name}</span>
                  <div>
                    <a className='zoom' target='_blank' rel='noreferrer' href={m1.image}><img height={150} src={m1.image.replace('https://arweave.net/', '/nft/') + '.jpg'} alt={m1.description} /></a>
                    {m2.image
                      ? <a className='zoom' target='_blank' rel='noreferrer' href={m2.image}><img height={150} src={m2.image?.replace('https://arweave.net/', '/nft/') + '.jpg'} alt={m2.description} /></a>
                      : <span style={{ display: 'inline-block', width: 150 }}> Not yet minted</span>
                    }
                  </div>
                  <Bar
                    title={`Burned ${state.CREATOR_MAX_TOKENS - total} out of ${state.CREATOR_MAX_TOKENS} tokens.`}
                    value={(total / state.CREATOR_MAX_TOKENS)}
                    label={total}
                  />
                </div>
              )
            })

          }

        </div>
      </main>
    </div>
  )
}

export default dynamic(async () => await Metamorphosis, {
  ssr: false,
})

function toggleVideo({ currentTarget: e }: any) {
  if (e.paused) e.play()
  else { e.pause() }
}
