
import YoutubeEmbed from './YoutubeEmbed';
import { IconLoadingSpinner } from '../lib/icons';
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useState } from 'react';
import { IconTrash2, IconPlus } from '@supabase/ui'
import { useUser } from "@supabase/supabase-auth-helpers/react";

import { useRouter } from "next/router";
import md5 from 'md5';
import { IPath, IPathData } from '../types';

const samplePaths = [
	{
		url: 'https://www.youtube.com/watch?v=UpNRO448d9U',
		description: 'An example description. Add your own video and description to get started!'
	},
]


interface Props {
	path: IPath
}

export default function Form( { path }: Props ) {
	console.log( path )
	async function handleSubmit( e: any ) {
		e.preventDefault();
		setLoading( true );

		const updates = {
			...( path ? { b: path.id } : '' ),
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
			router.push( `/path/${data![0].id}` );
		} catch ( error ) {
			console.warn( error )
		}
	}

	function deleteItem( url: string ) {

		// remove the associated item from state
		setPaths( paths.filter( ( path: any ) => path.url !== url ) )
	}

	function handleChange( e: any ) {
		console.log( 'hai' )
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
			console.log( formState )
			setPaths( formState );
		} )
	}

	function addNewPath() {
		// @ts-ignore
		setPaths( [...paths, {}] )
	}

	async function deletePath() {
		try {
			const { data, error } = await supabaseClient
				.from( 'paths' )
				.delete()
				.match( { id: path.id } )
			if ( error ) {
				console.warn( error )
			}
			if ( data ) {
				router.push( `/explore` );
			}
		} catch ( error ) {
			console.warn( error );
		}
	}

	const { user } = useUser();
	const router = useRouter();
	const [loading, setLoading] = useState( false )
	const [paths, setPaths] = useState<IPathData[] | any>( path ? path.pathdata : samplePaths )
	const [pathTitle, setPathTitle] = useState( path?.title || '' )
	const [pathDescription, setPathDescription] = useState( path?.description || '' )

	return (
		<form onSubmit={handleSubmit} className="font-sans">
			<label className="grid max-w-xl gap-2">
				<p className="font-bold uppercase">Title:</p>
				<input
					required
					className='w-full p-4 border'
					type="text"
					name="title"
					value={pathTitle}
					onChange={( e ) => setPathTitle( e.target.value )} />
			</label>

			<label className="grid gap-2 mt-12">
				<p className="font-bold uppercase">Description:</p>
				<textarea
					required
					className='max-w-xl p-4 border'
					cols={62}
					rows={5}
					value={pathDescription}
					onChange={( e ) => setPathDescription( e.target.value )} />
			</label>


			{paths?.map( ( path: any, i: number ) => (
				<div key={`path-${i}`} >
					<div className="flex gap-8 pt-8 mt-8 mb-24 rounded-md bg-gray-50 path-item">
						<div className="relative grid gap-8">
							<label className="grid gap-1 mt-12">
								<p className="font-bold uppercase">URL:</p>
								<input
									className='w-full p-4 border'
									type="text"
									name={`path-url-${i}`}
									value={path.url ? path.url : ''}
									onChange={handleChange} />
							</label>

							<label key={`path-${i}`} className="block mt-2">
								<p className="font-bold uppercase">Description:</p>

								<textarea
									className='p-4 mt-2 border'
									cols={60}
									rows={4}
									name={`path-description-${i}`}
									value={path.description ? path.description : ''}
									onChange={handleChange} />
							</label>


							<button
								type="button"
								onClick={( e ) => deleteItem( path.url )}
								className='absolute p-2 text-xs italic rounded-md top-11 hover:bg-gray-100 -left-10 hover:underline'><IconTrash2 />
							</button>

						</div>
						{path.url ? <YoutubeEmbed url={path.url} /> : null}

					</div>
					<hr />
				</div>
			) )}

			<div className='mt-12'>

				<button type="button" className='flex items-center gap-2 p-2 border hover:underline' onClick={() => addNewPath()}>
					<IconPlus /> Add new video
				</button>

				<div className='flex items-center gap-4 mt-24'>

					<p>
						<button className='flex items-center px-12 py-4 transition-colors rounded-md bg-cyan-300 hover:bg-cyan-400' type="submit">{loading && <IconLoadingSpinner />} {loading ? 'Submitting' : 'Submit'}</button>
					</p>
					{router.pathname.includes( 'edit' ) && <button type="button" onClick={() => deletePath()} className='text-red-400 transition-colors hover:text-red-500 hover:underline'>Delete</button>}
				</div>
				<div className='hidden w-4 h-4 mr-2 -ml-1 animate-spin'></div>
			</div>
		</form>
	)
}
