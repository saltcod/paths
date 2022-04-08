import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { IconPlus } from "@supabase/ui";
import Link from 'next/link'
import { useRouter } from "next/router";

export default function Header() {
	const { user, error } = useUser();
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

					{user ? ( <Link href="/path/new">
						<a className="flex items-center gap-1 text-xs font-bold hover:underline">
							<IconPlus size={16} /> Add a path
						</a>
					</Link> ) : ( <Link href="/login">
						<a className="flex items-center gap-1 text-xs font-bold hover:underline">
								Sign-in
						</a>
					</Link> )}

					{
						router.pathname === '/' ? ( <Link href="/explore">
							<a className="text-xs font-bold hover:underline">
								Start Exploring →
							</a>
						</Link> ) : ( null )
					}

				</nav>
			</header >
		</div>
	)
}
