export default function Bar({ title, value, label }: { title: string, value: number, label: string | number }) {
  return (
    <div className='bar-border'>
      <style jsx>{`
        .bar-border {
          border: 1px solid rgb(67, 71, 70);
        }

        .bar {
          height: 16px;
          font-size: 16px;
          line-height: 16px;
          color: rgba(246, 239, 228, 0.5);
          background-color: rgb(85, 88, 88);
          text-align: center;
          cursor: help;
        }
      `}</style>
      <div title={title} className='bar' style={{ width: value * 100 + '%' }}>
        {label}
      </div>
    </div>
  )
}
