import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useState, useEffect } from 'react';
import { IPath, IPathData } from '../../../types'
import { useRouter } from "next/router";
import YoutubeEmbed from '../../../components/YoutubeEmbed';
import { IconLoadingSpinner } from '../../../lib/icons';
import { FormEvent, SyntheticEvent } from 'react'
import md5 from 'md5';
import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";

import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'

interface PathProp {
	path: IPath
}

const samplePaths = [
	{
		url: 'https://www.youtube.com/watch?v=W81rSIuy0oQ',
		description: 'A video about the Ioniq5'
	},
	{
		url: 'https://www.youtube.com/watch?v=6DMOOAVktBU',
		description: 'A video about the ID4'
	}
]

export default function SinglePath( { path }: PathProp ) {


	const { user, error } = useUser();
	console.log( user )
	const router = useRouter();
	const [loading, setLoading] = useState( false )
	const [paths, setPaths] = useState<IPathData[]>( samplePaths )
	const [pathTitle, setPathTitle] = useState( '' )
	const [pathDescription, setPathDescription] = useState( '' )

	useEffect( () => {
		if ( path ) {
			setPaths( path.pathdata );
			setPathTitle( path.title );
			setPathDescription( path.description );
		}
	}, [] )


	async function handleSubmit( e: FormEvent ) {
		e.preventDefault();
		setLoading( true );

		const updates = {
			id: path.id,
			title: pathTitle,
			description: pathDescription,
			pathdata: paths,
			gravatar_hash: user && md5( user.email! )
		};

		try {
			const { error } = await supabaseClient
				.from( 'paths' )
				.insert( [updates], { upsert: true } )

			if ( error ) {
				console.warn( error );
			}
		} catch ( error ) {
			console.warn( error )
		} finally {
			setLoading( false );
			router.push( `/path/${path.id}` );
		}
	}

	function deleteItem( e: any ) {
		const url = e.target.dataset.embedid;
		// remove the associated item from state
		setPaths( paths.filter( path => path.url !== url ) )

	}

	function handleChange( e: any ) {
		let formState: any = [];
		const form = e.target.closest( 'form' )

		// Grab all the path items in the form
		// a path item = { url: ..., description: ... }
		const pathItems = Array.from( form.querySelectorAll( '.path-item' ) );

		// Loop through and extract the url (<input>) and the description (<textarea>)
		pathItems.map( ( item: any ) => {
			const url = item.querySelector( 'input' ).value
			const description = item.querySelector( 'textarea' ).value
			const obj = { url, description }
			formState = [...formState, obj]
			setPaths( formState );
		} )
	}

	function addNewPath() {
		setPaths( [...paths, { url: '', description: '' }] )
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="font-sans">
				<label className="block">
					<p className="font-bold uppercase">Title:</p>
					<input
						className='w-full p-4 mt-2 bg-gray-50'
						type="text"
						name="title"
						value={pathTitle}
						onChange={( e ) => setPathTitle( e.target.value )} />
				</label>

				<label className="block mt-12">
					<p className="font-bold uppercase">Description:</p>
					<textarea
						className='p-4 mt-2 bg-gray-50'
						cols={60}
						rows={3}
						value={pathDescription}
						onChange={( e ) => setPathDescription( e.target.value )} />
				</label>


				{paths.map( ( path, i ) => (
					<div key={`path-${i}`} className="flex gap-8 p-4 pt-12 mt-48 rounded-md bg-gray-50 path-item">
						<div className="relative grid gap-8">
							<label className="block">
								<p className="font-bold uppercase">URL:</p>
								<input
									className='w-full border'
									type="text"
									name={`path-url-${i}`}
									value={path.url ? path.url : ''}
									onChange={handleChange} />
							</label>

							<label key={`path-${i}`} className="block">
								<p className="font-bold uppercase">Description:</p>

								<textarea
									className='p-4 border'
									cols={60}
									rows={3}
									name={`path-description-${i}`}
									value={path.description ? path.description : ''}
									onChange={handleChange} />
							</label>
							<button
								type="button"
								onClick={( e ) => deleteItem( e )}
								data-embedid={path.url}
								className='absolute p-2 text-xs italic left bottom-4 hover:underline'>Delete</button>
						</div>
						{/* {path.url ? <YoutubeEmbed url={path.url} /> : null} */}
						<div>Preview</div>

					</div>
				) )}

				<div className='mt-12'>

					<button type="button" className='p-2 border' onClick={() => addNewPath()}>
						+ Add new video
					</button>

					<p className='mt-12'>
						<button className='flex items-center px-12 py-4 mt-24 transition-colors bg-gray-200 rounded-md hover:bg-gray-300' type="submit">{loading && <IconLoadingSpinner />} {loading ? 'Submitting' : 'Submit'}</button>
					</p>
					<div className='hidden w-4 h-4 mr-2 -ml-1 animate-spin'></div>
				</div>
			</form>
		</>
	)
}




export const getServerSideProps = withAuthRequired( {
	redirectTo: '/login',

	async getServerSideProps( context ) {
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
		}
	}

} );

