import Link from 'next/link'

export default function HomeLink() {
  return (
    <div className='HomeLink'>
      <style jsx>{`
        .HomeLink {
          font-size: 200%;
          padding: 10px 0 0 20px;
          margin: 0;
          position: fixed;
          top: 0;
        }

        .HomeLink :global(a) {
          color: rgb(246, 229, 200);
        }
      `}</style>
      <Link href='/'>↩</Link>
    </div>
  )
}
