import { useState, useEffect } from 'react'

const paths = ['cycling', 'reading', 'music', 'driving', 'walking', 'painting', 'swimming', 'knitting', 'rowing', 'coding', 'skating', 'singing', 'Scrabble', 'puzzles', 'fishing']

export default function RevolvingWord() {
	const [word, setWord] = useState( 'running' )

	useEffect( () => {
		const interval = setInterval( () => {
			const item = paths[Math.floor( Math.random() * paths.length )];
			setWord( item );
		}, 1500 );

		return () => clearInterval( interval );
	}, [] )

	return (
		<span className='underline'>{word}</span>
	)
}
