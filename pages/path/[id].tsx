import { GetServerSideProps } from 'next'
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Link from "next/link";
import { IPath } from '../../types'
import YoutubeEmbed from '../../components/YoutubeEmbed';

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
			{pathdata.map( ( path, i ) => (
				<div key={`${path.url}-${i}`} className="grid grid-cols-2 gap-8 mt-24">
					<div><div className='sticky top-4'>{path.description}</div></div>
					<div>{path.url ? <YoutubeEmbed url={path.url} /> : null}</div>
				</div>
			) )}

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
