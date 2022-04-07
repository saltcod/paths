import { GetServerSideProps } from 'next'
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Link from "next/link";
import Image from "next/image";
import { IPath } from '../../types'
import YoutubeEmbed from '../../components/YoutubeEmbed';
import PathCard from '../../components/PathCard';

interface PathProp {
	paths: IPath[]
}

export default function SinglePath( { paths }: PathProp ) {

	const gravatar_hash = paths[0].gravatar_hash;

	return (
		<>
			<div className="w-24 h-24 overflow-hidden border border-4 rounded-full rounded-br-none">
				<Image
					src={`https://gravatar.com/avatar/${gravatar_hash}`}
					alt="Gravatar"
					width={120}
					height={120}
				/>
			</div>
			<div className='grid grid-cols-3 mt-24 gap-x-8 gap-y-16'>
				{paths.map( path => <PathCard key={path.id} path={path} /> )}
			</div>
		</>
	)
}


export const getServerSideProps: GetServerSideProps = async ( context ) => {
	const { id } = context.query;

	let { data } = await supabaseClient
		.from( "paths" )
		.select( "*" )
		.eq( 'author', id )

	return {
		props: {
			paths: data,
		}
	};


}
