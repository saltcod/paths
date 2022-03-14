
import {Character, GetCharacterResults} from '../rickmortytypes'
import { NextPage } from 'next';

interface rickmortyProps {
	characters: Character[]
}

export default function rickmorty({characters}: rickmortyProps) {
  return (
	<div>
		{characters.map(character => <li key={character.id}>{character.name}</li>)}
	</div>
  )
}


export async function getServerSideProps() {
	const res = await fetch('https://rickandmortyapi.com/api/character');
	const {results}: GetCharacterResults = await res.json()
	console.log(results);

	return {
		props: {
			characters: results
		},
	};
}
