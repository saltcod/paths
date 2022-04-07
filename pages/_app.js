import "../css/index.css";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
	return (
		<main className="">
			<UserProvider supabaseClient={supabaseClient}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</UserProvider>
		</main>
	);
}
