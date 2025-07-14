export default function Bar({ title = '', value, label }: { title?: string, value?: number, label: React.ReactNode | [React.ReactNode, React.ReactNode] }) {
	const hasProgressBar = value !== undefined

	return (
		<div className={hasProgressBar ? 'bar-border' : ''}>
			<style jsx>{`
        .bar-border {
          border: 1px solid rgb(67, 71, 70);
        }

        .bar {
          height: 16px;
          background-color: rgb(85, 88, 88);
        }

        .text {
          height: 16px;
          font-size: 16px;
          line-height: 16px;
          color: rgba(246, 239, 228, 0.5);
          text-align: center;
					cursor: default;
        }

				.title {
          cursor: help;
				}
      `}</style>
			{hasProgressBar
				?
				<div title={title} className='bar text title' style={{ width: value * 100 + '%' }}>
					{label}
				</div>
				:
				<div title={title} className={`text ${title ? 'title' : ''}`}>
					{label}
				</div>
			}
		</div>
	)
}
