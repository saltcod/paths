import "../css/index.css";
import "tailwindcss/tailwind.css";
import { createContext, useState, useMemo } from "react";

export const ThemeContext = createContext();

function MyApp({ Component, pageProps }) {
	const [theme, setTheme] = useState("light");
	const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

	return (
		<div className="site-wrapper">
			<ThemeContext.Provider value={contextValue}>
				<Component {...pageProps} />
			</ThemeContext.Provider>
		</div>
	);
}

export default MyApp;
