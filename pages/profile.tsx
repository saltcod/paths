// pages/profile.js
import { withAuthRequired, User } from '@supabase/supabase-auth-helpers/nextjs';
import Link from 'next/link';

export default function Login( { user }: { user: User } ) {
	console.log( user )
	return (
		<>
			<p>
				[<Link href="/">Home</Link>] | [
				<Link href="/protected-page">supabaseServerClient</Link>]
			</p>
			{/* <div>Hello {user.email}</div> */}
			{/* <pre>{JSON.stringify( user, null, 2 )}</pre> */}
		</>
	);
}

export const getServerSideProps = withAuthRequired();
