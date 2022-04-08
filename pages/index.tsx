import Head from "next/head";
import RevolvingWord from "../components/RevolvingWord";
import Link from 'next/link'

export default function Home() {

	<Head>
		<title>Paths</title>
	</Head >;

	return (
		<>
			<section className="items-end grid-cols-2 gap-16 md:h-[65vh] md:grid">
				<h1 className="text-2xl font-bold leading-none md:text-8xl">Welcome</h1>
				<div className="grid mt-8 md:mt-0">
					<p className="text-xl md:text-7xl">
						Where did you get started with your love of&nbsp;<RevolvingWord />?
					</p>
					<p className="pr-24 mt-8 text-xl">All of our hobbies, interests, loves started somewhere. Paths aims to help organize and document your path to the place you are now. </p>
					<p className="mt-8">With Paths, you can help your friends and family see exactly how you've become the weirdo we've all come to love.</p>
				</div>
			</section>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1551 38"
				className="w-full my-16 md:my-48"
			>
				<path
					d="M4 19.978h0c30.608 8.542 61.213 17.086 91.987 12.807 30.773-5.279 61.715-24.378 93.47-26.566C221.21 2.03 253.78 16.754 284.41 23.899c30.63 7.144 59.319 6.412 89.019.983 29.7-5.728 60.411-16.751 91.986-13.775 31.575 2.977 64.017 19.952 94.954 21.647 30.937 1.695 60.343-11.89 90.533-15.743 30.13-3.853 60.956 2.025 91.987 7.871 31.03 5.847 62.266 11.662 93.47 6.888 31.204-4.774 64.377-20.138 93.47-20.663 31.093-.524 62.107 13.79 93.47 19.68 31.363 5.89 62.073 3.354 93.47-4.92 30.397-8.276 59.48-22.293 90.503-20.664 31.023 1.63 63.99 18.907 94.954 20.663 30.964 1.57 59.926-12.008 90.503-15.43 30.577-3.735 62.764 2.56 154.3 8.856"
					stroke="currentColor"
					strokeWidth="5"
					fill="none"
					fillRule="evenodd"
					strokeLinecap="round"
				/>
			</svg>
			<section className="mt-24">
				<div className="grid gap-12 md:gap-24 md:grid-cols-2">
					<div>
						<div className="grid gap-4 md:gap-12">
							<h2 className="text-6xl">How's it work?</h2>
							<p className="mt-12 text-2xl">Our interests grow over time. They often start with a small seed and sometimes end up taking on a life of their own. Some of our interests are small and on the sideline, others become lifelong obsessions.
							</p>
							<p className="text-xl">Paths is a tool to help document the path to where you are now. </p>
						</div>
					</div>
					<div>
						<h3 className="pb-8 text-2xl border-b-2">The gist</h3>
						<ul className="grid gap-16 mt-12">
							<li className="grid gap-4">
								<p className="text-5xl font-bold">1</p>
								<p className="text-3xl">Interests have paths </p>
								<p className="text-xl">All of our interests are really just paths that we're on.</p>
							</li>

							<li className="grid gap-4 pt-8 border-t">
								<p className="text-5xl font-bold">2</p>
								<p className="text-3xl">Describe your path through video</p>
								<p className="text-xl">Using words and videos, you can convey the story of your path.</p>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1551 38"
				className="w-full my-12 md:mt-36 md:mb-24"
			>
				<path
					d="M4 19.978h0c30.608 8.542 61.213 17.086 91.987 12.807 30.773-5.279 61.715-24.378 93.47-26.566C221.21 2.03 253.78 16.754 284.41 23.899c30.63 7.144 59.319 6.412 89.019.983 29.7-5.728 60.411-16.751 91.986-13.775 31.575 2.977 64.017 19.952 94.954 21.647 30.937 1.695 60.343-11.89 90.533-15.743 30.13-3.853 60.956 2.025 91.987 7.871 31.03 5.847 62.266 11.662 93.47 6.888 31.204-4.774 64.377-20.138 93.47-20.663 31.093-.524 62.107 13.79 93.47 19.68 31.363 5.89 62.073 3.354 93.47-4.92 30.397-8.276 59.48-22.293 90.503-20.664 31.023 1.63 63.99 18.907 94.954 20.663 30.964 1.57 59.926-12.008 90.503-15.43 30.577-3.735 62.764 2.56 154.3 8.856"
					stroke="currentColor"
					strokeWidth="5"
					fill="none"
					fillRule="evenodd"
					strokeLinecap="round"
				/>
			</svg>

			<section className="mt-12 md:mt-16">
				<div className="grid gap-4">
					<h2 className="mt-8 text-7xl">Start exploring</h2>
					<p className="text-2xl">Come explore some of the paths that others are on. </p> <p>When you're done, create one of your own.</p>

					<Link href="/explore">
						<a className="mt-8 text-xl font-bold hover:underline">
							Explore →
						</a>
					</Link>
				</div>
			</section>
		</>
	);
}
