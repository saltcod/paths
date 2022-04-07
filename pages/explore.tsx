import Head from "next/head";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";

import PathCard from "../components/PathCard";

import { IPath } from "../types";

interface Props {
	allPaths: IPath[]
}
export default function Explore( { allPaths }: Props ) {
	console.log( allPaths[0] );
	<Head>
		<title>The Nostalgia Project</title>
	</Head >;

	return (
		<div className="grid grid-cols-3 gap-x-8 gap-y-12">
			{allPaths.map( ( path ) => (
				<PathCard key={path.id} path={path} />
			) )}
		</div>
	);
}

export async function getServerSideProps() {
	let { data } = await supabaseClient.from( "paths" ).select( "*" ).limit( 50 );

	return {
		props: {
			allPaths: data,
		},
	};
}
