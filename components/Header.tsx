
import Link from 'next/link'
import { useRouter } from "next/router";

export default function Header() {
	const router = useRouter();

	return (
		<div className='bg-white '>
			<header className="container flex items-center justify-between gap-12 px-4 pt-8 pb-8 mx-auto ">
				<div className="flex items-center w-12 h-12 p-4 bg-gray-200 logo-container">
					<Link href="/">
						<a className="font-bold logo">
							Paths
						</a>
					</Link>
				</div>

				<nav className='flex gap-8'>
					{
						router.pathname !== '/' ? ( <Link href="/explore">
							<a className={`text-xs font-bold hover:underline ${router.pathname === '/explore' ? 'underline' : ''}`}>
								All Paths
							</a>
						</Link> ) : ( null )
					}
					{
						router.pathname === '/' ? ( <Link href="/explore">
							<a className="text-xs font-bold hover:underline">
								Start Exploring →
							</a>
						</Link> ) : ( <Link href="/path/new">
							<a className="text-xs font-bold hover:underline">
								+ Add a path
							</a>
						</Link> )
					}
				</nav>
			</header >
		</div>
	)
}
