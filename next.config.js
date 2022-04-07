module.exports = {
	images: {
		domains: ["assets.vercel.com", "img.youtube.com", "gravatar.com"],
		formats: ["image/avif", "image/webp"],
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.csv$/,
			loader: "csv-loader",
			options: {
				dynamicTyping: true,
				header: true,
				skipEmptyLines: true,
			},
		});

		return config;
	},
};
