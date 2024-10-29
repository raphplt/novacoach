import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

const protectedRoutes = ["/dashboard", "/profile"];
const publicRoutes = ["/auth/login", "/auth/register", "/"];

export default async function middleware(req: NextRequest) {
	// Récupérer le chemin de l'URL
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	// Récupérer le cookie de session
	const cookie = cookies().get("session")?.value;
	const session = await decrypt(cookie);

	if (isProtectedRoute && !session?.userId) {
		return NextResponse.redirect(new URL("auth/login", req.nextUrl));
	}

	if (
		isPublicRoute &&
		session?.userId &&
		!req.nextUrl.pathname.startsWith("/profile")
	) {
		return NextResponse.redirect(new URL("/profile", req.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
