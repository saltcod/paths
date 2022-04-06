import Head from "next/head";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Link from "next/link";
import { IPath } from "../types";
import Image from "next/image";
interface Props {
	allPaths: IPath[]
}
export default function Home( { allPaths }: Props ) {
	console.log( allPaths[0].pathdata[0].url.slice( -11 ) );
	< Head >
		<title>The Nostalgia Project</title>
	</Head >;

	return (
		<>
			{allPaths.map( ( path ) => (
				<div key={path.id}>
					<Link href={`/path/${path.id}`}>
						<a className="inline-block">
							<div className="aspect-[4/3]">
								{path.pathdata[0].url ?
									<Image
										src={`https://img.youtube.com/vi/${path?.pathdata[0].url.slice( -11 )}/hqdefault.jpg`}
										alt="Companies"
										width={480}
										height={360}
									/> : <div>box</div>}
							</div>
							<h2>{path.title}</h2>
						</a>
					</Link>
				</div>

			) )}
		</>
	);
}

Home;

export async function getServerSideProps() {
	let { data } = await supabaseClient.from( "paths" ).select( "*" ).limit( 50 );

	return {
		props: {
			allPaths: data,
		},
	};
}
