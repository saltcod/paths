import Link from "next/link";
import Image from "next/image";
import { IPath } from "../types";

interface Props {
	path: IPath
}
export default function PathCard( { path }: Props ) {
	// transform: scale(1) rotate(-8deg) translateZ(0px);
	return (
		<div>
			<Link href={`/path/${path.id}`}>
				<a>
					<div className="p-4 transition-colors bg-white border hover:bg-gray-50">
						<div className="relative w-full transition-all aspect-video rotate-1 hover:rotate-0">
							{path.pathdata[0].url &&
								<Image
									src={`https://img.youtube.com/vi/${path?.pathdata[0].url.slice( -11 )}/hqdefault.jpg`}
									alt="Companies"
									layout="fill"
									objectFit="cover"
								/>}
						</div>
					</div>
				</a>
			</Link>
			<div className="flex items-center mt-4">
				<div className="w-8 h-8 mr-2 overflow-hidden border border-2 rounded-full rounded-br-none">
					<Link href={`/users/${path.author}`}>
						<a>
							<Image
								src={`https://gravatar.com/avatar/${path?.gravatar_hash}`}
								alt="Gravatar"
								width={40}
								height={40}
							/>
						</a>
					</Link>
				</div>
				<Link href={`/path/${path.id}`}>
					<a>
						<h2 className="hover:underline">{path.title}</h2>
					</a>
				</Link>



			</div>

		</div>
	)
}
