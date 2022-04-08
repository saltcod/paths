export const Footer = () => {
	return (
		<footer className="pb-8 mt-12 text-xs">
			<div className="container px-4 py-4 mx-auto border-t">
				Paths, from{" "}
				<a className="hover:underline" href="https://twitter.com/saltcod">
					Terry Sutton
				</a>
				. Made with{" "}
				<a className="hover:underline" href="https://nextjs.org/">
					Next.js
				</a>{" "}
				and{" "}
				<a className="hover:underline" href="https://supabase.io/">
					Supabase
				</a>
				.
			</div>
		</footer>
	);
};
