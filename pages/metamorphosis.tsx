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

  console.debug('\n========== displayBig\n', visibleName, state?.metadata[visibleName as Names]?.[1].animation_url, state?.metadata[visibleName as Names]?.[2].animation_url)

  return (
    <div className={styles.container}>
      <style jsx>{`
        .card {
          padding: 0.4rem;
          max-width: unset;
          text-align: center;
        }


        .bigVideo {
          position: fixed;
          padding: 20px;
          box-sizing: content-box;
          width: 90vh;
          background-color: rgb(22, 23, 22);
          max-width: unset;
        }

        video {
          cursor: pointer;
        }

        a {
          width: 50%;
          display: inline-block;
          cursor: 'zoom-in';
        }

        p {
          margin-top: -10px;
          margin-bottom: 10px;
        }
      `}</style>
      <main className={styles.main}>

        <p className={styles.description}>
          <h2>CHAPTER TWO - METAMORPHOSIS</h2>
          <a className='blue' href='https://burn.art/drops/metamorphosis'>https://burn.art/drops/metamorphosis</a>
          <br />
          Click creator name to view animations, click image to enlarge it.
        </p>

        {isComponentVisible &&
          <div ref={ref} className='card bigVideo'>
            <p className={styles.description}>
              Click video to start playback.
            </p>
            <Loading />
            <video loop onClick={toggleVideo} width='50%' src={state?.metadata[visibleName as Names]?.[1].animation_url} />
            <video loop onClick={toggleVideo} width='50%' src={state?.metadata[visibleName as Names]?.[2].animation_url} />
            <a className='blue' href={state?.metadata[visibleName as Names]?.[1].animation_url} >{state?.metadata[visibleName as Names]?.[1].animation_url}</a>
            <a className='blue' href={state?.metadata[visibleName as Names]?.[2].animation_url} >{state?.metadata[visibleName as Names]?.[2].animation_url}</a>
          </div>
        }

        <div className={styles.grid}>

          {

            state?.creators.map(([address, , , total, name], index) => {


              const { 1: m1, 2: m2 } = state.metadata[name as Names]

              return (
                <div key={name} className='card' style={{ width: '320px' }} >
                  <span style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsComponentVisible({ visibleName: name, toggled: true })}>{name}</span>
                  <div>
                    <a target='_blank' rel='noreferrer' href={m1.image}><img height={150} src={m1.image.replace('https://arweave.net/', '/nft/') + '.jpg'} alt={m1.description} /></a>
                    <a target='_blank' rel='noreferrer' href={m2.image}><img height={150} src={m2?.image?.replace('https://arweave.net/', '/nft/') + '.jpg'} alt={(m2 as any).description} /></a>
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

export default Metamorphosis


function toggleVideo({ currentTarget: e }) {
  if (e.paused) e.play()
  else { e.pause() }
}
