import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TextEncoder } from "util";
import { jwtVerify } from "jose";

const protectedRoutes = ["/dashboard", "/profile"];
const publicRoutes = ["/auth/login", "/auth/register", "/"];

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

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