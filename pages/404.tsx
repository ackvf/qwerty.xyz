import type { AppProps } from 'next/app'

function ErrorPage({ }: AppProps) {
  return (
    <div className='ErrorPage'>
      <style jsx>{`
        .ErrorPage {
          height: 100vh;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        h1 {
          display: inline-block;
          border-right: 1px solid rgb(58, 60, 60);
          margin: 0px 20px 0px 0px;
          padding: 10px 23px 10px 0px;
          font-size: 24px;
          font-weight: 500;
          vertical-align: top;
        }

        h1 + div {
          display: inline-block;
          text-align: left;
          line-height: 49px;
          height: 49px;
          vertical-align: middle;
        }

        h1 + div h2 {
          font-size: 14px;
          font-weight: normal;
          line-height: inherit;
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <div>
        <h1>404</h1>
        <div>
          <h2>This page could not be found.</h2>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
