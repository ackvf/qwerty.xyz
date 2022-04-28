import '../styles/globals.css'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import HomeLink from '../src/components/HomeLink'
import Head from 'next/head'
import Image from 'next/image'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Qwerty Xyz</title>
        <meta name="description" content="Qwerty's craft page." />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {(router.pathname !== '/') && <HomeLink />}
      <div className='background' />

      <Component {...pageProps} />

      <footer className='footer'>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className='logo'>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  )
}

export default MyApp
