import "../css/index.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
	return (
		<div className="site-wrapper">
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
