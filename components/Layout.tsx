import Head from "next/head";
import { Footer } from "./Footer";
import { FC } from 'react'
import Link from 'next/link'
import Header from "./Header";

const Layout: FC = ( { children } ) => {
	return (
		<>
			<Head>
				<title>Paths</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<div className="container flex gap-12 px-4 mx-auto mt-12">
				<div className="w-full">{children}</div>
			</div>
			<Footer />
		</>
	);
}

export default Layout;
