import { useState, useEffect } from 'react'

const paths = ['cycling', 'reading', 'music', 'driving', 'walking', 'painting', 'swimming', 'knitting', 'rowing', 'coding', 'skating', 'singing', 'Scrabble', 'puzzles']

export default function RevolvingWord() {
	const [word, setWord] = useState( 'running' )

	useEffect( () => {
		const interval = setInterval( () => {
			const item = paths[Math.floor( Math.random() * paths.length )];
			setWord( item );
		}, 3000 );

		return () => clearInterval( interval );
	}, [] )

	return (
		<span className='underline'>{word}</span>
	)
}
