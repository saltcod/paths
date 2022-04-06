import Head from "next/head";
import { Footer } from "./Footer";
import { FC } from 'react'
import Link from 'next/link'

const Layout: FC = ( { children } ) => {
	return (
		<>
			<Head>
				<title>The Nostalgia Project</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header>
				<Link href="/">
					<a className="font-bold">
						The Nostalgia Project
					</a>
				</Link>
			</header>

			<main className="container flex gap-12 mx-auto mt-12 font-serif">
				<div className="w-full">{children}</div>
			</main>
			<Footer />
		</>
	);
}

export default Layout;
