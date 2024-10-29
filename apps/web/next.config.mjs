/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: "export", // Si vous voulez générer une application statique
	distDir: "./dist", // Change le répertoire de build en './dist/'
	images: {
		domains: ["res.cloudinary.com"],
	},
	experimental: {
		turbotrace: false,
	},
};

export default nextConfig;
