import Head from "next/head";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Link from "next/link";
import { IPath } from "../types";
import Image from "next/image";
import Gravatar from 'react-gravatar'

interface Props {
	allPaths: IPath[]
}
export default function Home( { allPaths }: Props ) {
	console.log( allPaths[0].pathdata[0].url.slice( -11 ) );
	<Head>
		<title>The Nostalgia Project</title>
	</Head >;

	return (
		<div className="grid grid-cols-3 gap-4">
			{allPaths.map( ( path ) => (
				<div key={path.id}>
					<Link href={`/path/${path.id}`}>
						<a>

							<div className="p-4 transition-colors bg-white border hover:bg-gray-50">
								<div className="relative w-full aspect-video">
									{path.pathdata[0].url &&
									<Image
										src={`https://img.youtube.com/vi/${path?.pathdata[0].url.slice( -11 )}/hqdefault.jpg`}
										alt="Companies"
											layout="fill"
											objectFit="cover"
										/>}
								</div></div>
							<div className="flex items-center">

								<h2 className="mt-4 hover:underline">{path.title}</h2>
								<div className="w-8 h-8 overflow-hidden border rounded-full">
									<Gravatar email="saltcod@gmail.com" />
								</div>

							</div>
						</a>
					</Link>
				</div>

			) )}
		</div>
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
