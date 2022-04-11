

interface Props {
	url: string
}
export default function YoutubeEmbed( { url }: Props ) {
	const embedId = url.slice( -11 );


	return (
		<div className="relative w-full overflow-hidden aspect-[4/3]">
			<iframe
				className="absolute top-0 left-0 w-full"
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
