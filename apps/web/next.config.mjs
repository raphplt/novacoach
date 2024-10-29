import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	distDir: "./dist",
	images: {
		domains: ["res.cloudinary.com"],
	},
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"@": path.resolve(__dirname),
		};
		return config;
	},
};

export default nextConfig;
