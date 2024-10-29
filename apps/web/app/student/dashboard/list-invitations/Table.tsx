"use client";

import axios from "axios";
import { useAuth } from "contexts/AuthProvider";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import DataTable, {
	ColumnHeaderProps,
} from "@components/Common/Table/DataTableCustom";

const urlBase = process.env.NEXT_PUBLIC_API_URL;

export default function Table() {
	const [invitations, setInvitations] = useState([]);
	const { user } = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchInvitations = async () => {
			if (!user || !user.id) return;
			const response = await axios.get(
				`${urlBase}/invitations/user/${user?.id}`,
			);
			setInvitations(response.data.invitations);
			setIsLoading(false);
		};
		fetchInvitations();
	}, [user]);

	const columnsHeaders: ColumnHeaderProps[] = [
		{ key: "id", label: "ID" },
		{ key: "token", label: "Token" },
		{ key: "expiresAt", label: "Expires At" },
		{ key: "usedAt", label: "Used At" },
		{ key: "coachId", label: "Coach ID" },
		{ key: "structureId", label: "Structure ID" },
		{ key: "userId", label: "User ID" },
		{ key: "userEmail", label: "User Email" },
		{ key: "actions", label: "Actions" },
	];

	const rows = invitations.map((invitation: any) => ({
		id: invitation.id,
		token: invitation.token,
		expiresAt: invitation.expiresAt,
		usedAt: invitation.usedAt,
		coachId: invitation.coachId,
		structureId: invitation.structureId,
		userId: invitation.userId,
		userEmail: invitation.userEmail,
	}));

	const acceptInvitation = async (token: string) => {
		if (!user || !user.id) return;
		try {
			await axios.post(`${urlBase}/invitations/accept`, {
				token,
				studentId: user.id,
			});
			// on met à jour l'état des invitations après acceptation
			setInvitations((prevInvitations) =>
				prevInvitations.filter(
					(invitation: any) => invitation.token !== token,
				),
			);
		} catch (error) {
			console.error("Failed to accept invitation:", error);
		}
	};

	const renderCell = (data: any, columnKey: string) => {
		if (columnKey === "actions") {
			return (
				<div>
					{!data.usedAt ? (
						<Button onClick={() => acceptInvitation(data.token)}>
							Accepter
						</Button>
					) : (
						<div>Invitation acceptée</div>
					)}
				</div>
			);
		}
		return data[columnKey];
	};
	return (
		<div className="pt-4 w-11/12 mx-auto">
			<DataTable
				name="Invitations"
				columnsHeaders={columnsHeaders}
				rows={rows}
				isLoading={isLoading}
				renderCell={renderCell}
			/>
		</div>
	);
}
