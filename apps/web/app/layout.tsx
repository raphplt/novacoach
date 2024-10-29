import type { Metadata } from "next";
import "./globals.css";
import QueryClientProvider from "providers/QueryClientProvider";
import Header from "@/components/Layout/Header/Header";
import { verifySession } from "@/lib/dal";
import { AuthProvider } from "contexts/AuthProvider";
import Footer from "@/components/Layout/Footer/Footer";
import { Raleway } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

export const metadata: Metadata = {
	title: "Novacoach",
	description: "Your ultimate coaching platform",
};

const raleway: NextFont = Raleway({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await verifySession();
	const isAuth = session.isAuth;

	return (
		<QueryClientProvider>
			<AuthProvider>
				<html lang="fr">
					<body className={raleway.className}>
						<Header isAuth={isAuth} />
						{children}
						<Footer />
					</body>
				</html>
			</AuthProvider>
		</QueryClientProvider>
	);
}