import { useContext } from "react";
import { ThemeContext } from "../pages/_app";

export const Footer = () => {
	const theme = useContext(ThemeContext);
	return (
		<footer className="mt-12">
			<div className="container py-4 mx-auto border border-l-0 border-r-0">
				Banq. Current theme is: {theme.theme}
				<button
					className="p-1 ml-4 border"
					onClick={() =>
						theme.theme === "light"
							? theme.setTheme("dark")
							: theme.setTheme("light")
					}
				>
					Toggle Theme
				</button>
			</div>
		</footer>
	);
};
