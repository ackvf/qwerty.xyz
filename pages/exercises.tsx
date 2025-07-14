import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Bar from '../src/components/Bar'
import Loading from '../src/components/Loading'
import useActiveToggle from '../src/hooks/useActiveToggle'
import styles from '../styles/Home.module.css'



interface Project {
	website_url: string
	repo_url: string
	repo_friendly_name: string
	image_url: string
	name: string
	description: string
}

const projects: Project[] = [
	{
		website_url: 'https://129bit.qwerty.art/',
		repo_url: 'https://github.com/ackvf/web3-homework/tree/129bit',
		repo_friendly_name: '/129bit',
		image_url: '/exercises/129bit.jpg',
		name: '129bit',
		description: 'Implement a websocket server, connect to it and perform some data analysis.',
	},
	{
		website_url: 'https://insomnia.qwerty.art/',
		repo_url: 'https://github.com/ackvf/web3-homework/tree/insomnia',
		repo_friendly_name: '/insomnia',
		image_url: '/exercises/insomnia.jpg',
		name: 'Insomnia',
		description: 'Implement dashboards for sending ETH, ERC20 tokens and NFTs.',
	},
	{
		website_url: 'https://watr.qwerty.art/',
		repo_url: 'https://github.com/ackvf/web3-homework/tree/watr',
		repo_friendly_name: '/watr',
		image_url: '/exercises/watr.jpg',
		name: 'Watr',
		description: 'Connect with wagmi and send a transaction.',
	},
	{
		website_url: 'https://exodus.qwerty.art/',
		repo_url: 'https://github.com/ackvf/web3-homework/tree/exodux/btc-flow-poc',
		repo_friendly_name: '/exodux/btc-flow-poc',
		image_url: '/exercises/exodus.jpg',
		name: 'Exodus',
		description: 'Connect your bank account with plaid and purchase BTC.',
	},
]

const Homeworks: NextPage = () => {
	const { containerRef, current, isToggled, setIsToggled } = useActiveToggle<Project>()

	return (
		<div className='container'>
			<style jsx>{`
        .container {

        }

        .hidden {
          display: none;
        }

        .pointer {
          cursor: pointer;
        }

        .card {
          width: 320px;
          padding: 0 0.4rem 0.4rem;
          max-width: unset;
          text-align: center;
        }

				.cardlike {
					text-align: center;
				}

        .cardTitle {
          font-size: 1.5rem;
          cursor: pointer;
          display: inline-block;
          width: 100%;
        }

        video {
          cursor: pointer;
          position: relative;
          z-index: 2;
        }

        .bigPreviewWrap {
          position: fixed;
          display: flex;
          align-items: center;
          width: 100%;
          top: 0;
          bottom: 0;
        }

        .bigPreview {
          position: relative;
          padding: 20px;
          background-color: rgb(22, 23, 22);
          max-width: unset;
          width: 100%;
					min-height: 600px;
					height: 50vh;
					display: flex;
					flex-direction: column;
        }

        .bigPreview :global(.Loading) {
          z-index: 1;
        }

				.bigPreview iframe {
					position: relative;
					z-index: 2;
					width: 100%;
					height: 100%;
				}

        .bigPreview a {
          display: inline-block;
          width: 50%;
        }

				.bigPreview p {
					margin: 10px;
				}

        p {
          margin-top: -10px;
          margin-bottom: 10px;
        }

				.bar-label {
					white-space: nowrap;
					text-overflow: ellipsis;
					display: inline-block;
					width: 100%;
					text-align: center;
				}

        .zoom {
          width: 50%;
          display: inline-block;
          cursor: zoom-in;
        }
      `}</style>

			{isToggled && current &&
				<div className='bigPreviewWrap'>
					<div ref={containerRef} className='cardlike bigPreview'>
						<p>
							{current.name}
						</p>
						<Loading />
						<iframe width='100%' src={current?.website_url} className='frame' />
						<span className='bar-label'>*Some features may not work in an iFrame preview: go to {<Label {...current} />}</span>
						<p>
							{current.description}
						</p>
					</div>
				</div>
			}

			<main className={styles.main}>

				<p className={styles.description}>
					<h2>Home exercises</h2>
					<a className='blue' href='https://github.com/ackvf/web3-homework' target='_blank' rel="noreferrer">https://github.com/ackvf/web3-homework ⤴</a>
					<br />
					Job interview home exercises.
				</p>

				<div className={styles.grid}>

					{
						projects?.map((project, index) => {
							const { name, description, image_url, website_url, repo_url, repo_friendly_name } = project

							return (
								<div key={name} className='card' title={description} >
									<span className='cardTitle' onClick={() => setIsToggled({ current: project, toggled: true })}>{name}</span>
									<div className='pointer' onClick={() => setIsToggled({ current: project, toggled: true })}>
										<img width='100%' src={image_url} alt={description} />
									</div>
									<Bar label={<Label {...project}/>}/>
								</div>
							)

						})
					}

				</div>

				<p className={styles.description} style={{ marginTop: 40 }}>
					This is a gallery of solutions to several home assignments. Each resides in its own repo/branch and has its own deployment.
					<br />
					<br />
					<b>Click each card's title for larger preview or link to get to the page / repository.</b>
				</p>

			</main>
		</div>
	)
}

export default dynamic(async () => Homeworks, {
	ssr: false,
})

const Label = ({ website_url, repo_url, repo_friendly_name }: Project) => <span className="bar-label">
	<a href={website_url} className="blue" target='_blank' rel="noreferrer">web ⤴</a>{' | '}
	github~<a href={repo_url} className="blue" target='_blank' rel="noreferrer">{repo_friendly_name} ⤴</a>
</span>
