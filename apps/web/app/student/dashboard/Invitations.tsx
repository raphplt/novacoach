"use client";
import PanelBox from "@components/Common/Box/PanelBox";
import axios from "axios";
import { useAuth } from "contexts/AuthProvider";
import Link from "next/link";
import { useEffect, useState } from "react";

const urlBase = process.env.NEXT_PUBLIC_API_URL;

export default function Invitations() {
	const [invitations, setInvitations] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		const fetchInvitations = async () => {
			if (!user || !user.id) return;
			const response = await axios.get(
				`${urlBase}/invitations/user/${user?.id}`,
			);
			setInvitations(response.data.invitations);
		};
		fetchInvitations();
	}, [user]);

	return (
		<PanelBox>
			<Link
				className="flex flex-row items-center justify-center gap-2"
				href={"/student/dashboard/list-invitations"}
			>
				<h1>Invitations</h1>
				<div
					className="rounded-full bg-red-500 text-white px-2 py-1 text-sm"
					style={{ width: "fit-content" }}
				>
					{invitations ? invitations.length : 0}
				</div>
			</Link>
		</PanelBox>
	);
}
