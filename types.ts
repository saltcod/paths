export interface IPath {
	id: number
	author: string
	title: string
	description: string
	views: number
	pathdata: {}
	gravatar_hash: string
}

export interface IPathData {
	url: string
	description: string
}
