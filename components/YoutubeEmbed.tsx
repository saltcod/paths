

interface Props {
	url: string
}
export default function YoutubeEmbed( { url }: Props ) {
	const embedId = url.slice( -11 );


	return (
		<div>
			<iframe
				width="624"
				height="350"
				src={`https://www.youtube-nocookie.com/embed/${embedId}`}
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				title="Embedded youtube"
			/>
		</div>
	)
}
