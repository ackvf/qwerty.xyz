import type { NextPage } from 'next'
import styles from 'styles/Home.module.css'

const year = (new Date()).getFullYear()

const coolAsci = ['(•_•)', '( •_•)>⌐■-■', '(⌐■_■)']
const nouns = ['developer', 'analyst', 'consultant', 'problem solver']

const WhoAmI: NextPage = () => {

  let txts = ['TypeScript', 'JavaScript', 'Solidity', 'Node.js', 'React.js', 'Next.js', 'API', 'metadata', 'ERC721', 'ERC1155']
  let txtix = Math.random() * txts.length | 0
  let speed = 100

  let txtix_prev = txtix
  let writeOrErase = true
  let i = 0

  function typeWriter(ref: HTMLElement) {
    if (!ref) return

    let txt = txts[txtix]

    if (writeOrErase) {
      if (i < txt.length) {
        ref.innerHTML += txt.charAt(i)
        i++
        setTimeout(typeWriter, speed, ref)
      } else {
        writeOrErase = false
        speed = 50
        setTimeout(typeWriter, 2000, ref)
      }
    } else {
      if (i >= 0) {
        ref.innerHTML = txt.substring(0, i)
        i--
        setTimeout(typeWriter, speed, ref)
      } else {
        writeOrErase = true
        while (txtix === txtix_prev) {
          txtix = Math.random() * txts.length | 0
        }
        txtix_prev = txtix
        speed = 100
        setTimeout(typeWriter, 100, ref)
      }
    }
  }


  let j = 0
  function cool(ref: HTMLElement) {
    if (!ref) return
    ref.innerHTML = coolAsci[j % 3]
    j++
    setTimeout(cool, 2000, ref)
  }

  let k = 1
  function swapper(ref: HTMLElement) {
    if (!ref) return
    const [a, b] = ref.children

    a.classList.toggle('hidden')
    b.classList.toggle('hidden')

    setTimeout(() => {
      if (a.classList.contains('hidden')) a.children[0].innerHTML = nouns[k++ % nouns.length]
      if (b.classList.contains('hidden')) b.children[0].innerHTML = nouns[k++ % nouns.length]
    }, 1000)

    setTimeout(swapper, 2000, ref)
  }

  return (
    <div className={styles.container}>
      <style jsx>{`
        .swapper {
          padding-right: 150px;
          position: relative;
        }

        .swapper > * {
          position: absolute;
        }

        .swapper > * + * {
          left: 0;
        }

        .swapper * {
          transition: opacity 1s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .hidden {
          opacity: 0;
        }
      `}</style>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Who Am <a>I?</a>
        </h1>

        <p className={styles.description}>
          I am a FullStack web/blockchain <span className='swapper' ref={swapper}><span className='hidden'><code>developer</code>.</span><span><code>developer</code>.</span></span>
          <br />
          Btw, you can call me <i>Qwerty</i>.
          <br />
          <br />
          <span ref={cool} />
        </p>

        <p className={styles.description}>
          Will write
          <code ref={typeWriter} />
          for NFT
        </p>

        <div className={styles.grid}>
          <a className='card'>
            <h2>Node.js ⤵</h2>
            <p>Google Firebase Cloud<br />NestJS, express.js, GraphQL</p>
          </a>

          <a className='card'>
            <h2>Web ⤵</h2>
            <p>Next.js, React.js, Svelte<br />web3.js, ethers.js, wagmi</p>
          </a>

          <a className='card'>
            <h2>Solidity ⤵</h2>
            <p>ERC721, ERC1155<br />custom contracts</p>
          </a>
        </div>

        <div className={styles.grid}>
          <a className='card'>
            <h2>JavaScript ⤵</h2>
            <p>Since 2005</p>
            <p>({year - 2005} years)</p>
          </a>

          <a className='card'>
            <h2>React.js ⤵</h2>
            <p>Since <abbr title="Early adopter, React was in beta back then, v0.12b">2015</abbr></p>
            <p>({year - 2015} years)</p>
          </a>

          <a className='card'>
            <h2>TypeScript ⤵</h2>
            <p>Since 2018</p>
            <p>({year - 2018} years)</p>
          </a>

          <a className='card'>
            <h2>Web3 ⤵</h2>
            <p>Since 2021</p>
            <p>({year - 2021} years)</p>
          </a>
        </div>

      </main>
    </div>
  )
}

export default WhoAmI
