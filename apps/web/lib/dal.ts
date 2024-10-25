"use server";
import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { cache } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const verifySession = cache(async () => {
	const cookie = cookies().get("session")?.value;
	const session = await decrypt(cookie);

	if (!session?.userId) {
		return { isAuth: false };
	} else {
		return { isAuth: true, userId: session.userId };
	}
});

export const getUser = cache(async () => {
	const session = await verifySession();
	if (!session.isAuth) {
		console.log("User is not authenticated");
		return null;
	}

	try {
		const response = await fetch(
			`${baseUrl}/users/profile/${session.userId}`,
		);
		const user = await response.json();
		return user;
	} catch (error) {
		console.log("Failed to fetch user data");
		return null;
	}
});

export const getStructureById = cache(async () => {
	const session = await verifySession();
	if (!session.isAuth) {
		console.log("User is not authenticated");
		return null;
	}

	try {
		const response = await fetch(
			`${baseUrl}/users/profile/${session.userId}`,
		);
		const user = await response.json();

		const response2 = await fetch(
			`${baseUrl}/coaches/user/${user.id}`,
		);

		const coach = await response2.json();

		console.log("coach", coach);

		const response3 = await fetch(
			`${baseUrl}/structures/${coach.structureId}`,
		);
		const structure = await response3.json();
		return structure;
	} catch (error) {
		console.log("error");
		return null;
	}
});
export const getAllStructures = cache(async () => {
	const session = await verifySession();
	if (!session.isAuth) {
		return null;
	}

	try {
		const response = await fetch(
			`${baseUrl}/structures`,
		);
		const user = await response.json();
		return user;
	} catch (error) {
		console.log("Failed to fetch structures data");
		return null;
	}
});

