import Head from "next/head";
import { JsxElement } from "typescript";
import { Footer } from "./Footer";

const filters = ['Debit', 'E-Transfer', "Payment Transfer", 'Retail Purchase', "Bill Pay"];

export default function Layout({ children }: JsxElement) {
	return (
		<>
			<Head>
				<title>Banq | Banking for devs</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container flex gap-12 mx-auto mt-12 font-serif">
				<aside>
					<p className="text-lg font-bold">banq</p>

					<ul className="grid gap-2 mt-12">
						{filters.map(filter => <li><button className="p-1 text-xs uppercase bg-gray-200">{filter}</button></li>)}
					</ul>
				</aside>
				<div>{children}</div>
			</main>
			<Footer />
		</>
	);
}
