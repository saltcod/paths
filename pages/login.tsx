import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useEffect, useState } from "react";

const LoginPage = () => {
	const { user, error } = useUser();
	const [paths, setPaths] = useState( {} );

	useEffect( () => {
		async function loadPaths() {
			const { data } = await supabaseClient.from( "paths" ).select( "*" );
			setPaths( data );
		}

		// Only run query once user is logged in.
		if ( user ) {
			loadPaths();
		}
	}, [user] );

	if ( !user )
		return (
			<>
				{error && <p>{error.message}</p>}
				<Auth supabaseClient={supabaseClient} />
			</>
		);

	return (
		<>
			<button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
			<p>user:</p>
			<pre>{JSON.stringify( user, null, 2 )}</pre>
			<p>client-side data fetching with RLS</p>
			<pre>{JSON.stringify( paths, null, 2 )}</pre>
		</>
	);
};

export default LoginPage;
