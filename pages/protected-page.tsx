// pages/protected-page.js
import { withAuthRequired, getUser } from '@supabase/supabase-auth-helpers/nextjs';

export default function ProtectedPage( { user, customProp } ) {
	return <div>Protected content</div>;
}

export const getServerSideProps = withAuthRequired( {
	redirectTo: '/login',
	async getServerSideProps( ctx ) {
		// Access the user object
		const { user, accessToken } = await getUser( ctx );
		return { props: { email: user!.email } };
	}
} );
