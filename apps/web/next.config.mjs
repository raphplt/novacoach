import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["res.cloudinary.com"],
	},
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"@app": path.resolve(__dirname, "app"),
			"@/components": path.resolve(__dirname, "components"),
			"@/hooks": path.resolve(__dirname, "hooks"),
			"@/lib": path.resolve(__dirname, "lib"),
			"@/utils": path.resolve(__dirname, "utils"),
			"@public": path.resolve(__dirname, "public"),
			"@/contexts": path.resolve(__dirname, "contexts"),
		};
		return config;
	},
};

export default nextConfig;
