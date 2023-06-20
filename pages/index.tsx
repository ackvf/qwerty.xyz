import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {

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

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my <a href="https://qwerty.xyz">craft!</a>
        </h1>

        <p className={styles.description}>
          Will write
          <code ref={typeWriter} />
          for NFT
        </p>

        <div className={styles.grid}>
          <a href="whoami" className='card'>
            <h2>whoami &rarr;</h2>
            <p>Find in-depth information about me.</p>
          </a>

          <a
            href="metamorphosis"
            className='card'
          >
            <h2>Ash drop II &rarr;</h2>
            <p>Blockchain infographics about Ash Chapter Two</p>
            <p>METAMORPHOSIS</p>
          </a>

        </div>
      </main>
    </div>
  )
}

export default Home
