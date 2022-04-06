import Head from "next/head";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Login() {
	const [email, setEmail] = useState( "" );
	const [emailSent, setEmailSent] = useState( false );
	const [loading, setLoading] = useState( false );

	async function handleLogin() {
		setLoading( true );

		const userExists = await checkIfUserExists();

		try {
			// check if user already exists
			if ( userExists ) {
				const { error } = await supabase.auth.signIn( { email } );
				if ( error ) {
					console.log( error );
				}
			} else {
				const { error } = await supabase.auth.signUp( {
					email,
					password: "123456",
				} );
				if ( error ) {
					console.log( error );
				}
			}
		} catch ( error: any ) {
			alert( error.error_description || error.message );
		} finally {
			setEmailSent( true );
			setLoading( false );
		}
	}

	async function checkIfUserExists() {
		const response = await fetch(
			`/api/private-profiles/check-single?email=${email}`
		);

		if ( response.status === 200 ) {
			return true;
		}
	}

	return (
		<div className="container max-w-2xl pb-24 mt-8">
			<Head>
				<title>Login / Signup | The Nostalgia Project</title>
			</Head>
			<h1 className="mt-16 text-2xl font-bold">
				Create Account or Login
			</h1>

			<div className="grid gap-24 md:grid-cols-2">
				<div className="mt-24 md:pr-8 ">
					<div>
						<p className="mt-8">Signup / Login with your email:</p>
						<div className="mt-4">
							<input
								className="p-2 border w-72"
								type="email"
								placeholder="Your email"
								value={email}
								onChange={( e ) => setEmail( e.target.value )}
							/>
						</div>

						<div className="mt-8">
							<button
								onClick={( e ) => {
									e.preventDefault();
									handleLogin();
								}}
								className="flex items-center button-blue-fill"
							>

								{emailSent
									? "Email Sent!"
									: "Send me a Magic Link"}
							</button>
						</div>
					</div>
				</div>

			</div>

		</div>
	);
}
