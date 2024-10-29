// hooks/useSession.ts
import { useEffect, useState } from "react";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { JWTPayload } from "jose";

export function useSession() {
	const [session, setSession] = useState<JWTPayload | null>(null);

	useEffect(() => {
		async function fetchSession() {
			const cookie = cookies().get("session")?.value;
			if (cookie) {
				const sessionData = await decrypt(cookie);
				if (sessionData) setSession(sessionData);
			}
		}

		fetchSession();
	}, []);

	return session;
}
