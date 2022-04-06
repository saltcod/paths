import "../css/index.css";
import "tailwindcss/tailwind.css";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
	return (
		<UserProvider supabaseClient={supabaseClient}>
			<div className="container mx-auto">
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</div>
		</UserProvider>
	);
}

export default MyApp;
