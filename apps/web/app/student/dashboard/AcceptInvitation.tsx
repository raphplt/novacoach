import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "contexts/AuthProvider";

const urlBase = process.env.NEXT_PUBLIC_API_URL;

export default function AcceptInvitation() {
	const [token, setToken] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		const { token } = router.query;
		if (token && typeof token === "string") {
			setToken(token);
		}
	}, [router.query]);

	const handleAcceptInvitation = async () => {
		if (!token) {
			setMessage("Token or student ID is missing.");
			return;
		}

		const studentId = user?.id;

		try {
			const response = await axios.post(
				`${urlBase}` + "/invitations/accept",
				{
					token,
					studentId,
				},
			);
			setMessage("Invitation accepted successfully!");
		} catch (error: any) {
			setMessage(
				`Error: ${error.response?.data?.error || error.message}`,
			);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="text-2xl font-bold">Accept Invitation</h1>
			{message && <p>{message}</p>}
			<div className="flex flex-col gap-4 mt-4">
				<button
					onClick={handleAcceptInvitation}
					className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
				>
					Accept Invitation
				</button>
			</div>
		</div>
	);
}
