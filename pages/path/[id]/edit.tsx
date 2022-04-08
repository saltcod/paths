import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";


import Form from "../../../components/Form";

export default function Edit( { path }: any ) {

	return (
		<>
			<Form path={path} />
		</>
	)
}

export const getServerSideProps = withAuthRequired( {
	redirectTo: '/login',

	async getServerSideProps( context ) {
		const { id } = context.query;

		let { data } = await supabaseClient
			.from( "paths" )
			.select( "*" )
			.eq( 'id', id )
			.single()

		return {
			props: {
				path: data,
			}
		}
	}

} );

