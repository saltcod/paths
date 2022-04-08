import { GetServerSideProps } from 'next'
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Link from "next/link";
import { IPath } from '../../types'
import YoutubeEmbed from '../../components/YoutubeEmbed';
import Image from "next/image";
import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { IconEye, IconHeart } from '@supabase/ui';
import { useEffect, useState } from 'react';
import { useReward } from 'react-rewards';



interface PathProp {
	path: IPath
}

async function getLikes( id: number ) {
	try {
		let { data, error } = await supabaseClient
			.from( "paths" )
			.select( "likes" )
			.eq( 'id', id )
			.single()

		return data.likes;

	} catch ( error ) {
		console.warn( error )
	}
}

async function incrementPageViewCount( id: number, viewCount: number ) {
	const { data } = await supabaseClient
		.from( 'paths' )
		.upsert( { id: id, views: viewCount + 1 } )
}

async function incrementPageViews( id: number ) {
	try {
		let { data, error } = await supabaseClient
			.from( "paths" )
			.select( "views" )
			.eq( 'id', id )
			.single()


		if ( data ) {
			incrementPageViewCount( id, data.views )
		}

	} catch ( error ) {
		console.warn( error )
	}
}

export default function SinglePath( { path }: PathProp ) {
	const { id, title, description, pathdata, views, gravatar_hash, likes } = path;

	const { reward, isAnimating } = useReward( 'rewardId', 'confetti' );

	useEffect( () => {
		incrementPageViews( id );
	}, [] )


	const [likeCount, setLikeCount] = useState( likes );

	// only allow one Like press per instance
	const [liked, setLiked] = useState( false );

	const { user } = useUser();


	// Increment likes by grabbing the current value + 1
	async function incrementLikes( id: number ) {
		let likes = await getLikes( id );
		setLiked( true );
		reward();


		try {
			const { data } = await supabaseClient
				.from( 'paths' )
				.upsert( { id: id, likes: likes + 1 } )

		} catch ( error ) {
			console.warn( error )
		}
	}

	// Subscribe to changes to likes, update when it changes
	const updateLikes = supabaseClient
		.from( 'paths' )
		.on( '*', payload => {
			setLikeCount( payload.new.likes )
		} )
		.subscribe()


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
				<div className="w-16 h-16 overflow-hidden transition-colors border-4 rounded-full hover:border-cyan-200">
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
			<p className='max-w-2xl mt-4 text-xl'>{description}</p>
			{/* @ts-ignore */}
			{pathdata.map( ( path: any, i: number ) => (
				<div key={`${path.url}-${i}`} className="grid grid-cols-2 gap-8 pb-24 mt-24 border-b">
					<div><div className='sticky top-4'>{path.description}</div></div>
					<div>{path.url ? <YoutubeEmbed url={path.url} /> : null}</div>
				</div>
			) )}

			<div className='flex items-center gap-2 mt-12'>
				<span className='flex items-center gap-2 text-xs uppercase'><IconEye />{views}</span>
				<button
					onClick={() => incrementLikes( path.id )}
					type="button"
					id="rewardId"
					disabled={liked}
					className={`hover:bg-gray-200 p-2 rounded-md flex items-center gap-2 text-xs uppercase ${liked ? 'cursor-not-allowed' : ''}`}><IconHeart />{likeCount}</button>
			</div>


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
