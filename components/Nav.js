import { motion } from "framer-motion";

const navList = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 1,
			delay: 1.5,
		},
	},
};

const navListItem = {
	hidden: { opacity: 0, x: 5 },
	show: { opacity: 1, x: 0 },
};

export const Nav = () => {
	return (
		<nav className="site-menu">
			<a className="home" href="/">
				<svg
					className="icon-home"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 32 32"
				>
					<path d="m32 19-6-6V4h-4v5l-6-6L0 19v1h4v10h10v-6h4v6h10V20h4z" />
				</svg>
			</a>
			<motion.ul
				className="nav-menu"
				variants={navList}
				initial="hidden"
				animate="show"
			>
				<motion.li variants={navListItem}>
					<a href="/#about" className="work-highlight-number">
						About
					</a>
				</motion.li>
				<motion.li variants={navListItem}>
					<a href="/#work" className="work-highlight-number">
						Work
					</a>
				</motion.li>
				<motion.li variants={navListItem}>
					<a href="/#uses" className="work-highlight-number">
						Uses
					</a>
				</motion.li>
				<motion.li variants={navListItem}>
					<a href="/#currently" className="work-highlight-number">
						Currently
					</a>
				</motion.li>
			</motion.ul>
		</nav>
	);
};
