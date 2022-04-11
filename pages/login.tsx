import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const LoginPage = () => {
	const { user, error } = useUser();
	const [paths, setPaths] = useState( {} );
	const router = useRouter();

	useEffect( () => {
		if ( user ) {
			router.push( `/explore` );
		}
	}, [user] );

	if ( !user )
		return (
			<div className="container max-w-2xl mx-auto">
				<h1 className="text-2xl">Welcome to Paths.</h1>
				<p>Let's document some memories</p>
				{error && <p>{error.message}</p>}
				<Auth supabaseClient={supabaseClient} />
			</div>
		);


	return (
		<div className="container max-w-3xl mx-auto">
			<button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
			<p>user:</p>
			<pre>{JSON.stringify( user, null, 2 )}</pre>
			<p>client-side data fetching with RLS</p>
			<pre>{JSON.stringify( paths, null, 2 )}</pre>
		</div>
	);
};

export default LoginPage;
