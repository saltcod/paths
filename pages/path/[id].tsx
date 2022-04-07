import { GetServerSideProps } from 'next'
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Link from "next/link";
import { IPath } from '../../types'
import YoutubeEmbed from '../../components/YoutubeEmbed';
import Image from "next/image";
import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";

interface PathProp {
	path: IPath
}

export default function SinglePath( { path }: PathProp ) {
	const { user } = useUser();
	const { title, description, pathdata, views, gravatar_hash } = path;

	return (
		<div>
			<div className='flex items-center justify-between'>

				<div className='flex items-center max-w-3xl'>

					<h1 className='text-xl font-bold'>{title}</h1>
					{user && (
						<Link href={`/path/${path.id}/edit`}>
							<a className="inline-block ml-4 text-sm text-gray-300 hover:text-gray-500 hover:underline">Edit</a>
						</Link>
					)}
				</div>
				<div className="w-16 h-16 overflow-hidden border-4 rounded-full rounded-br-none">
					<Link href={`/users/${path.author}`}>
						<a>
							<Image
								src={`https://gravatar.com/avatar/${gravatar_hash}`}
								alt="Gravatar"
								width={80}
								height={80}
							/>
						</a>
					</Link>
				</div>
			</div>
			<p className='max-w-2xl mt-4'>{description}</p>
			{pathdata.map( ( path: any, i: number ) => (
				<div key={`${path.url}-${i}`} className="grid grid-cols-2 gap-8 mt-24">
					<div><div className='sticky top-4'>{path.description}</div></div>
					<div>{path.url ? <YoutubeEmbed url={path.url} /> : null}</div>
				</div>
			) )}

			<p>Views:{views}</p>


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
