import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { GetServerSideProps } from 'next'
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useState, useEffect } from 'react';
import { IPath } from '../../types'
import YoutubeEmbed from '../../components/YoutubeEmbed';
import { IconLoadingSpinner } from '../../lib/icons';
import { useRouter } from "next/router";
import md5 from 'md5';

interface PathProp {
	path: IPath
}

const samplePaths = [
	{
		url: 'https://www.youtube.com/watch?v=W81rSIuy0oQ',
		description: 'A video about the Ioniq5'
	},
]

export default function SinglePath() {
	const { user } = useUser();
	const router = useRouter();
	const [loading, setLoading] = useState( false )
	const [paths, setPaths] = useState( samplePaths )
	const [pathTitle, setPathTitle] = useState( '' )
	const [pathDescription, setPathDescription] = useState( '' )

	async function handleSubmit( e ) {
		e.preventDefault();
		setLoading( true );

		const updates = {
			author: user!.id,
			title: pathTitle,
			description: pathDescription,
			pathdata: paths,
			gravatar_hash: user && md5( user.email! )
		};

		try {
			const { data, error } = await supabaseClient
				.from( 'paths' )
				.insert( [updates], { upsert: true } )

			if ( error ) {
				console.warn( error );
			}
			setLoading( false );
			console.log( data )
			router.push( `/path/${data![0].id}` );
		} catch ( error ) {
			console.warn( error )
		}
	}

	function deleteItem( e ) {
		const url = e.target.dataset.embedid;

		// remove the associated item from state
		setPaths( paths.filter( path => path.url !== url ) )
		console.log( url )
	}

	function handleChange( e ) {
		let formState = [];
		const form = e.target.closest( 'form' )

		// Grab all the path items in the form
		// a path item = { url: ..., description: ... }
		const pathItems = Array.from( form.querySelectorAll( '.path-item' ) );

		// Loop through and extract the url (<input>) and the description (<textarea>)
		pathItems.map( item => {
			const url = item.querySelector( 'input' ).value
			const description = item.querySelector( 'textarea' ).value
			const obj = { url, description }
			formState = [...formState, obj]
			setPaths( formState );
		} )
	}

	function addNewPath() {
		setPaths( [...paths, {}] )
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="font-sans">
				<label className="block">
					<p className="font-bold uppercase">Title:</p>
					<input
						className='w-full border'
						type="text"
						name="title"
						value={pathTitle}
						onChange={( e ) => setPathTitle( e.target.value )} />
				</label>

				<label className="block">
					<p className="font-bold uppercase">Description:</p>
					<textarea
						className='p-4 border'
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

