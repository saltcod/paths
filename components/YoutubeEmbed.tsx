

interface Props {
	url: string
}
export default function YoutubeEmbed( { url }: Props ) {
	const embedId = url.slice( -11 );


	return (
		<div>
			<iframe
				width="853"
				height="480"
				src={`https://www.youtube.com/embed/${3}`}
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				title="Embedded youtube"
			/>
		</div>
	)
}
