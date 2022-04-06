import { GetServerSideProps } from 'next'
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Link from "next/link";
import { IPath } from '../../types'

interface PathProp {
	path: IPath
}

export default function SinglePath( { path }: PathProp ) {
	const { title, description, pathdata, views } = path;

	console.log( path )

	return (
		<div>
			<h1>{title}</h1>
			<p>{description}</p>
			<p>Views:{views}</p>


			<Link href={`/path/${path.id}/edit`}>
				<a className="inline-block">Edit</a>
			</Link>

		</div>
	)
}


export const getServerSideProps: GetServerSideProps = async ( context ) => {
	const { id } = context.query;

	let { data } = await supabaseClient
		.from( "paths" )
		.select( "*" )
		.eq( 'id', id )
		.single()

	return {
		props: {
			path: data,
		}
	};


}
