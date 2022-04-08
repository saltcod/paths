import Link from "next/link";
import Image from "next/image";
import { IPath } from "../types";
import { IconEye, IconHeart } from "@supabase/ui";

interface Props {
	path: IPath
}
export default function PathCard( { path }: any ) {

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
			<div className="flex items-center justify-between mt-4">
				<div className="flex items-center" >
					<div className="w-8 h-8 mr-2 overflow-hidden border border-2 rounded-full hover:border-cyan-200">
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
							<h2 className="text-sm hover:underline">{path.title}</h2>
						</a>
					</Link>
				</div>
				<div className='flex items-center gap-2'>
					<span className='flex items-center gap-2 text-xs uppercase'><IconEye />{path.views}</span>
					<button
						className="flex items-center gap-2 p-2 text-xs uppercase rounded-md">
						<IconHeart />{path.likes}
					</button>

				</div>


			</div>

		</div>
	)
}
