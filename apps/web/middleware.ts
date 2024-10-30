import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = ["/dashboard", "/profile", "/messagerie", "/admin"];
const publicRoutes = ["/auth/login", "/auth/register", "/"];

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);
	const cookie = req.cookies.get("session")?.value;
	let session;
	try {
		session = await decrypt(cookie);
	} catch (error) {
		// console.error("Erreur de décryptage du cookie:", error);
		session = null;
	}

	if (isProtectedRoute && !session?.userId) {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	if (
		isPublicRoute &&
		session?.userId &&
		!req.nextUrl.pathname.startsWith("/profile")
	) {
		return NextResponse.redirect(new URL("/profile", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|..png$).)"],
};