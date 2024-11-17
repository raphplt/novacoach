"use client";
import PanelBox from "@components/Common/Box/PanelBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useAuth } from "contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const urlBase = process.env.NEXT_PUBLIC_API_URL;

export default function Invitations() {
	const [invitations, setInvitations] = useState([]);
	const { user } = useAuth();
	const router = useRouter();

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

	if (user?.coach) return null;

	return (
		<PanelBox
			onPress={() => {
				router.push("/student/dashboard/list-invitations");
			}}
		>
			<Icon
				icon="mdi:email"
				width={24}
			/>
			<h1>Invitations</h1>
			<div
				className="rounded-full bg-red-500 text-white px-2 py-1 text-sm"
				style={{ width: "fit-content" }}
			>
				{invitations ? invitations.length : 0}
			</div>
		</PanelBox>
	);
}
