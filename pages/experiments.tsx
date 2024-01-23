import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useReducer } from 'react'
import styles from 'styles/Home.module.css'

function DemoPage({ }: AppProps) {
  const [toggled, toggle] = useReducer((b) => !b, false)

  return (
    <div className='DemoPage'>
      <style jsx>{`
        .DemoPage {
          height: 100vh;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        h1 {
          display: inline-block;
          border-left: 1px solid rgb(58, 60, 60);
          margin: 0px 0px 0px 20px;
          padding: 10px 0px 10px 23px;
          font-size: 24px;
          font-weight: 500;
          vertical-align: top;
        }

        .quote {
          display: inline-block;
          text-align: left;
          line-height: 49px;
          height: 49px;
          vertical-align: middle;
        }

        .quote h2 {
          font-size: 20px;
          font-weight: normal;
          line-height: inherit;
          margin: 0px;
          padding: 0px;
        }
      `}</style>

      <div className='mb-6'>
        <div className='quote'>
          <h2>“Every line of code that is written with passion is a reflection of the coder, not just the program.”</h2>
        </div>
        <h1>Qwerty</h1>
      </div>

      <span className='cursor-pointer mb-4' onClick={toggle}>show {toggled ? 'less' : 'more'}</span>

      {toggled && <div className={`${styles.grid} ${toggled ? '' : 'hidden'}`}>

        <Link href="https://coupled.qwerty.art/demo">
          <div className='card cursor-pointer'>
            <h2>CSS border demo</h2>
            <p>Experimenting with gradients, borders and shadows.</p>
          </div>
        </Link>

        <Link href="https://coupled.qwerty.art">
          <div className='card cursor-pointer'>
            <h2>Cross-tab messaging</h2>
            <p>Sending information across tabs in real-time.</p>
          </div>
        </Link>

        <Link href="https://react-experiments-ackvf.vercel.app/">
          <div className='card cursor-pointer'>
            <h2>React experiments</h2>
            <p>Dissecting React.</p>
          </div>
        </Link>


      </div>}
    </div>
  )
}

export default DemoPage
